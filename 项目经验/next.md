# cra to next



## 动态路由



因为在原项目中有很对非页面的 `ts` 文件, 所以需要把这些都排出在外, 这里使用了 `next.config.js` 的配置项`pageExtensions`

```js
/** @type {import('next').NextConfig} */
const path = require('path');
const withVideos = require('next-videos')

const nextConfig = {
  output: 'export',
  distDir: 'build',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: { unoptimized: true },
  webpack: (config, {isServer, webpack}) => {
    config.module.rules.push(
      {
        test: /\.(mp4|webm|ogg|swf|ogv|mov)$/,
        use: [
          // options.defaultLoaders.babel,
          {
            loader: 'file-loader',
          }
        ]
      },
    )
    return config;
  },
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js']
}

module.exports = withVideos(nextConfig);

```

然后把 `pages` 目录下的 `_app.tsx`, `_document.tsx` 以及需要生成页面的 `.tsx` 文件都加一个 `.page`, 例如`_app.page.tsx`...











_app.page.tsx

```tsx
import React, { createContext } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import { Provider } from 'mobx-react';
import rootStore from '@/store';
import './index.css';
import './tailwind.css';
import './global.css';


interface AppOwnProps {
  origin: string;
}

export const MobxContext = createContext({});

function MyApp({ Component, pageProps, origin }: AppProps & AppOwnProps) {
  return (
    <>
      <Head>
        <title>爱交易</title>
      </Head>
      <Script id="set-rem" strategy="lazyOnload">
        {`console.log('set-rem');
          let html = document.getElementsByTagName("html")[0];
          let oWidth = document.body.clientWidth || document.documentElement.clientWidth;
          if (oWidth < 451) {
            html.style.fontSize = (oWidth / 750) * 100 + "px"
          }
        `}
      </Script>
      <Provider rootStore={rootStore}>
        <Component {...pageProps} origin={origin} />
      </Provider>
    </>
  )
}


export default MyApp

MyApp.getInitialProps = async (context: AppContext) => {
  // return { ...context.ctx, example: 'data' }
  const ctx = await App.getInitialProps(context)
  const protocol = context.ctx.req?.headers['x-forwarded-proto'] ?? 'http';
  const host = context.ctx.req?.headers.host ?? 'www.aijiaoyi.xyz';
  const origin = `${protocol}://${host}`;
  console.log('origin', origin);
  return { ...ctx, origin }
}

```





_document.page.tsx

```tsx

import Document, { Html, Head, Main, NextScript } from 'next/document';
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body data-theme="light">
          <img src="/icon.png" alt="" style={{ display: 'none' }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

```





## 环境变量

将环境变量暴露给浏览器需添加 `NEXT_PUBLIC_` 前缀

```env
NEXT_PUBLIC_TEST='1111'
```

