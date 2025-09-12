import { TreeNode } from "./types/treeNode";

  function getColumnHeaders(dataStore: TreeNode[]): string[] {
    const columns: string[] = [];
    for (let i = 0; i < dataStore.length; i++) {
      const item = dataStore[i];

      /*
      TODO. BUG2: item.Addr != '' is not sufficient as undfined slips through.
      If i fix it I will catch nothing because Addr is never added to any node. See BUG1 in data.ts
      */
      //if (item.Head_ID === 1 && item.Addr) {   //Must be top level node with a truthy Addr (not null, undefined, empty string, etc.)
      // TODO: repalce the line below with the line above to fix this
      if (item.Head_ID == 1 && item.Addr != '') {
        columns.push(item.Description);
      }
    }
    return columns;
  };

  function getNodesWithGlobalIds(dataStore: TreeNode[]): TreeNode[] {
    return dataStore.filter(item => item.Global_ID != null && item.Global_ID !== ''); //!= null checks both null and undefined in one operation
  }

export function analyzeGlobalNodes(dataStore: TreeNode[]) {
  const columnHeaders = getColumnHeaders(dataStore);
  const nodesWithGlobalIds = getNodesWithGlobalIds(dataStore);
  // console.log("getColumnHeaders returned : ", columnHeaders);
  // console.log("getNodesWithGlobalIds returned : ", nodesWithGlobalIds);

  /*TODO: SYNCED uptil here*/
  // continue here ...



  return nodesWithGlobalIds;
};
