<!--
 * @Author: your name
 * @Date: 2021-06-01 14:38:17
 * @LastEditTime: 2021-06-01 14:44:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /lizhi/Blog/webpack/import 图片报错.md
-->
# import 图片 报错

问题:

```js
import logo from './imgs/logo.png';
```

图片能引进来且能正常使用, 但那行代码会飘红



解决:

我们需要新建一个 ts 声明文件, 例如 `img.d.ts`, 项目编译过程中会自动读取 `.d.ts` 这类文件, 当然 `.d.ts` 文件也不能随便放置在项目中, 这类文件和 `ts` 文件一样需要被 `typescript` 编译, 所以只能放在 `tsconfig.json` 中 `include` 属性所配置的文件夹下

例如:

tsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@apis": ["src/apis/index.tsx"],
      "@imgs/*": ["src/imgs/*"],
      "@c": ["src/components"],
      "@home/*": ["src/pages/home/*"]
    },
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "experimentalDecorators": true
  },
  "include": [
    "src"
  ]
}
```

我们的 `img.d.ts` 就要放在 `src` 目录下, 只需要在 `src` 目录下创建 `img.d.ts`

img.d.ts

```ts
declare module '*.png';
declare module '*.svg';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
```