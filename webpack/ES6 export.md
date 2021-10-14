# ES6 export



## export * from ..

1. test.js

   ```js
   export const a = 1;
   export const b = 2;
   
   ```

   index.js

   ```js
   export * from './test'
   export {a, b} from './test'
   ```

   

2. test.js

   ```js
   const a = 1;
   export default a;
   ```

   index.js

   ```js
   export {default as a} from './test'
   ```

   

