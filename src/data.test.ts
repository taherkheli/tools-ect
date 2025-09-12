import { dataStore } from  './data';
import { describe, it, expect, afterEach } from 'vitest';
import { writeFileSync, readFileSync, existsSync, unlinkSync } from 'fs';
import { resolve } from 'path';
import { TreeNode } from './types/treeNode';
import { analyzeGlobalNodes } from './globalNodesAnalyzer';

describe('TreeNode Array Test', () => {
  const logPath = resolve(__dirname, 'log.log');

  afterEach(() => {
    if (existsSync(logPath)) {
      //unlinkSync(logPath);   // Uncomment to clean up log file after each test
    }
  });

  const nodes : TreeNode[] = dataStore();

  /*WORKS!!!!*/
  // it('should read TreeNode array from TypeScript file', () => {
  //   expect(Array.isArray(nodes)).toBe(true);
  //   expect(nodes.length).toBeGreaterThan(0);

  //   // Convert to JSON string for writing to file
  //   const jsonData = JSON.stringify(nodes, null, 2);
  //   writeFileSync(logPath, jsonData);
  //   expect(existsSync(logPath)).toBe(true);

  //   // Read and verify content
  //   const writtenContent = readFileSync(logPath, 'utf-8');
  //   const parsedData: TreeNode[] = JSON.parse(writtenContent);
  //   expect(Array.isArray(parsedData)).toBe(true);
  //   expect(parsedData.length).toBe(nodes.length);

  //   // TODO: Verify structure of of a few nodes in parsed data
  // });




    it('top level nodes should be identified', () => {

      analyzeGlobalNodes(nodes);





    // // Convert to JSON string for writing to file
    // const jsonData = JSON.stringify(nodes, null, 2);
    // writeFileSync(logPath, jsonData);
    // expect(existsSync(logPath)).toBe(true);
  });






  /* fix it at the end when all works*/

    // console.log("Running the code, this might take a while...");
    // const result = analyzeGlobalData(dataStore);


    // if(JSON.stringify(result) === JSON.stringify(expectedResult) )
    // {
    //    console.log("Result is as expected");
    // }
    // else
    // {
    //     console.error("Result is NOT as expected");
    // }

    // if(duration < 10000) // Success is under 10 seconds
    // {
    //    console.log(`Success: Execution time ${duration} ms`);
    // }
    // else
    // {
    //     console.error(`Failure: Execution time ${duration} ms exceeds 10 seconds`);
    // }






});