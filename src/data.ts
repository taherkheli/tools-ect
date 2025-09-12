import { TreeNode } from "./types/treeNode";

// Top Level Nodes (direct child of root)
const topLevels = ["ABC1", "ABC2", "ABC3", "ABC4", "ABC5", "ABC6", "ABC7", "ABC8", "ABC9", "ABC10"];

// Simple seeded PRNG (Mulberry32), stolen from https://github.com/cprosche/mulberry32
let seed = 923456; // Static seed for reproducibility

// floating-point numbers in the range [0, 1) (includes 0, excludes 1)
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
const globalParameterIds: any = [];
for(let i = 0; i < 100; i++) {
  globalParameterIds[i] = randomString(8);
}

function createChildren(topID: string, Key_ID: number): TreeNode {
  // Pick a random parent from previous nodes
  const parent = seededRandomInt(2, Key_ID - 1);

  const node: TreeNode = {
    Key_ID: Key_ID,
    Head_ID: parent,
    ID: randomString(8),
    Display_Value: randomString(12),
    Description: randomString(20)
  };

  if (parent === 1) {
    node.Addr = randomString(5); // if top level node, assign an Addr
  }

  if ((Key_ID % 3) === 0) {
    const globalParameterId = globalParameterIds[seededRandomInt(0, globalParameterIds.length - 1)];
    node.Global_ID = `global_${globalParameterId}`;
    node.Description = `${topID}-${globalParameterId}`;
    node.ID = `${topID}-${node.ID}-${globalParameterId}`; // Create some duplicate IDs for testing
  }

  return node;
}

export const dataStore = ((): TreeNode[] => {
  const tree: TreeNode[] = [{ Key_ID: 1, Head_ID: -1, ID: "Root", Display_Value: "Root", Description: "Root" }]; // root node

  // Add Top Level Nodes
  for (let i = 0; i < topLevels.length; i++) {
    const topLevel = topLevels[i];
    const obj: TreeNode = {
      Key_ID: tree.length + 1,
      Head_ID: 1,
      ID: topLevel,
      Display_Value: topLevel,
      Description: topLevel
    };
    tree.push(obj);

    // Add Children
    for (let i = 1; i <= 15000; i++)
      tree.push(createChildren(topLevel, obj.Key_ID + i));
  }

  return tree;
})();
