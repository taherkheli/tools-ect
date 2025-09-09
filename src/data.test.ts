import { test, expect } from 'vitest';
import { func } from  './data';

test('gets first 10 elements in a pseudo-random sequence with a static seed', () => {

  for(let i = 0; i < 10; i++) {
    console.log(func(15, 57));
  }
});