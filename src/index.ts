import { dataStore } from './data';
import { expectedResult } from './expectedResult';

function assignGlobalValues(createDyanamicCol: any, globalData: any, descriptionMap: any) {
   if (createDyanamicCol) {
      // Iterate over columns and GlobalData
      createDyanamicCol.forEach((column: any) => {
         globalData.forEach((globalDataItem: any) => {
            const relatedItems =
               descriptionMap.get(globalDataItem.Global_ID) || [];

            relatedItems.forEach((relatedItem: any) => {
                if (relatedItem.ID.includes(column)) {
                  globalDataItem[column] = relatedItem.Display_Value;
                }
            });
         });
      });
      return createDyanamicCol;
   }
};

function getDynamicColumn(dataStore: any) {
   const columns: any = [];
   let GlobalData: any = [];
   dataStore.forEach((item: any) => {
      //To get the name of Nodes present in the dataStore for dynamic columns & all nodes has Head Id = 1 and only nodes has Addr property
      if (item.Head_ID == 1 && item.Addr != '') {
         const nodeDescription = item.Description;
         columns.push(nodeDescription);
      }

      if (
         item.Global_ID !== '' &&
         item.Global_ID !== undefined
      ) {
         GlobalData.push(item);
      }
   });
   return [columns, GlobalData];
};

function analyzeGlobalData(dataStore: any) {
   let [createDynamicCol, globalData] = getDynamicColumn(dataStore);
   const descriptionMap = new Map();
   // Populate the description map
   globalData.forEach((item: any) => {
      if (!descriptionMap.has(item.Global_ID)) {
         descriptionMap.set(item.Global_ID, []);
      }
      descriptionMap.get(item.Global_ID).push(item);
   });

   createDynamicCol = assignGlobalValues(
      createDynamicCol,
      globalData,
      descriptionMap,
   );

   return globalData;
};

// Run the code and check the output and execution time
console.log("Running the code, this might take a while...");
const start = Date.now();
const result = analyzeGlobalData(dataStore);
const end = Date.now();
const duration = end - start;

if(JSON.stringify(result) === JSON.stringify(expectedResult) )
{
   console.log("Result is as expected");
}
else
{
    console.error("Result is NOT as expected");
}

if(duration < 10000) // Success is under 10 seconds
{
   console.log(`Success: Execution time ${duration} ms`);
}
else
{
    console.error(`Failure: Execution time ${duration} ms exceeds 10 seconds`);
}