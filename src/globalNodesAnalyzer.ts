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

  // given a Global_ID, look up all nodes with that globalId i.e. group nodes by their Global_ID
  const globalIdNodesMap = new Map<string, TreeNode[]>();

  for (const node of nodesWithGlobalIds) {
      const globalId = node.Global_ID!;
      if (!globalIdNodesMap.has(globalId)) {
        globalIdNodesMap.set(globalId, []);
      }
      globalIdNodesMap.get(globalId)!.push(node);
  }

  /*TODO: SYNCED uptil here*/
  // console.log(nodesMap);
  // console.log(nodesMap.size);


   var x = assignGlobalValues(
      columnHeaders,
      nodesWithGlobalIds,
      globalIdNodesMap,
   );

  return nodesWithGlobalIds;
};







function assignGlobalValues(columnHeaders: any, nodesWithGlobalIds: any, globalIdNodesMap: any) {
   if (columnHeaders) {
      // Iterate over columns and GlobalData
      columnHeaders.forEach((column: any) => {
         nodesWithGlobalIds.forEach((globalDataItem: any) => {
            const relatedItems =
               globalIdNodesMap.get(globalDataItem.Global_ID) || [];

            relatedItems.forEach((relatedItem: any) => {
                if (relatedItem.ID.includes(column)) {
                  globalDataItem[column] = relatedItem.Display_Value;
                }
            });
         });
      });
      return columnHeaders;
   }
};