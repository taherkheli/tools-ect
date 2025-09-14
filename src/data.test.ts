import { dataStore } from  './data';
import { describe, it, expect } from 'vitest';
import { TreeNode } from './types/treeNode';
import { globalNodesAnalyzer as analyzeGlobalNodes } from './globalNodesAnalyzer';
import { expectedResult } from './expectedResult';

describe('Tree', () => {
  const nodes : TreeNode[] = dataStore();

  it('global ID\'s can be processed efficiently', () => {
    const start = Date.now();
    const actualResult = analyzeGlobalNodes(nodes);
    const end = Date.now();
    const duration = end - start;
    console.log("'processGlobalNodes' took: ", duration, "ms");
    expect(actualResult).toStrictEqual(expectedResult);
  });
});