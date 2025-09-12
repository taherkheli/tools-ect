import { TreeNode } from "./types/treeNode";

// Top Level Nodes (direct child of root)
const topLevels = ["ABC1", "ABC2", "ABC3", "ABC4", "ABC5", "ABC6", "ABC7", "ABC8", "ABC9", "ABC10"];

// Simple seeded PRNG (Mulberry32), stolen from https://github.com/cprosche/mulberry32
let seed = 123456; // Static seed for reproducibility

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

export function dataStore(): TreeNode[] {
  const tree: TreeNode[] = [];
  const nodeMap = new Map<number, TreeNode>(); // For fast lookups

  function addNode(node: TreeNode): void {
    tree.push(node);
    nodeMap.set(node.Key_ID, node);
  }

  function findNodeByKeyId(keyId: number): TreeNode | undefined {
    return nodeMap.get(keyId); // O(1) lookup
  }

  function createChildren(topID: string, Key_ID: number): TreeNode {
    // Pick a random KeyId from previous nodes and set it as parent
    const randomKeyId = seededRandomInt(2, Key_ID - 1);  // avoid picking root (1) or self (Key_ID)

    const node: TreeNode = {
      Key_ID: Key_ID,
      Head_ID: randomKeyId,
      ID: randomString(8),
      Display_Value: randomString(12),
      Description: randomString(20)
    };

    /*''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    TODO. BUG1: Uncommenting will fix the bug that Addr is not added to any node ever.
    Fixing this will probably cause globalids to be different from expectedResult in data.test.ts. So need to fix that too.
    ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    // // fetch the node(randomKeyId) to determine if it's parent is a top level node i.e. Head_ID = 1. If so, assign an Addr to this node
    // const parentNode = findNodeByKeyId(randomKeyId);
    // if (parentNode && parentNode.Head_ID === 1) {
    //   parentNode.Addr = randomString(5);
    // }

    if ((Key_ID % 3) === 0) {
      const globalParameterId = globalParameterIds[seededRandomInt(0, globalParameterIds.length - 1)];
      node.Global_ID = `global_${globalParameterId}`;
      node.Description = `${topID}-${globalParameterId}`;
      node.ID = `${topID}-${node.ID}-${globalParameterId}`; // Create some duplicate IDs for testing
    }

    return node;
  }

  // Add root node
  const rootNode: TreeNode = {
    Key_ID: 1,
    Head_ID: -1,
    ID: "Root",
    Display_Value: "Root",
    Description: "Root Node"
  };
  addNode(rootNode);

  // Add top level nodes
  for (let i = 0; i < topLevels.length; i++) {
    const topLevel = topLevels[i];
    const newNode: TreeNode = {
      Key_ID: tree.length + 1,
      Head_ID: 1,
      ID: topLevel,
      Display_Value: topLevel,
      Description: topLevel
    };
    addNode(newNode);

    // Add Children
    for (let j = 1; j <= 15000; j++) {
      const childNode = createChildren(topLevel, tree.length + 1);
      addNode(childNode);
    }
  }

  return tree;
}
