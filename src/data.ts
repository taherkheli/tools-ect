const topLevels = ["ABC1", "ABC2", "ABC3", "ABC4", "ABC5", "ABC6", "ABC7", "ABC8", "ABC9", "ABC10"];
// Simple seeded PRNG (Mulberry32), stolen from https://github.com/cprosche/mulberry32
let seed = 123456; // Static seed for reproducibility
function mulberry32(a: number) {
    return function() {
        let t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}
const rand = mulberry32(seed);

function seededRandomInt(min: number, max: number) {
    return Math.floor(rand() * (max - min + 1)) + min;
}

function randomString(length: number, isSeeded = true) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        if(isSeeded)
            result += chars.charAt(seededRandomInt(0, chars.length - 1));
        else 
            result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// create 100 different global parameter ids
const globalIds: any = [];
for(let i = 0; i < 100; i++) {
    globalIds[i] = randomString(8);
}   

function createChildren(topID: string, Key_ID: number)
{ 
    const obj: any = {};
    // Pick a random parent from previous nodes
    const parent = seededRandomInt(2, Key_ID - 1);
    obj.Key_ID = Key_ID;
    obj.Head_ID = parent;
    if(parent === 1) {
        obj.Addr = randomString(5); // Assign Arcnet_Adr only to nodes with Head_ID = 1
    }

    obj.ID = randomString(8);
    obj.Display_Value = randomString(12);
    obj.Description = randomString(20);
    if ((Key_ID % 3) == 0) {
        const description =  globalIds[seededRandomInt(0, globalIds.length - 1)];
        obj.Global_ID = `global_${description}`;
        obj.Description = `${topID}-${description}`;
        obj.ID = `${topID}-${obj.ID}-${description}`; // Create some duplicate IDs for testing
    }
    return obj;
}

export const dataStore = (() => {
    const arr = [{Key_ID: 1, Head_ID: -1}]; // Start adding root node
 
    // Add Top Level Nodes
    topLevels.forEach(topLevel => {
        const obj: any = {};
        obj.ID = topLevel;
        obj.Display_Value = topLevel;
        obj.Description = topLevel;
        obj.Head_ID = 1;
        obj.Key_ID = arr.length + 1;
        arr.push(obj);

        // Add Children
        for (let i = 1; i <= 15000; i++) {
            arr.push(createChildren(topLevel, obj.Key_ID+i));
        }
    });
    return arr;
})();
