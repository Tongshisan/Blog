# create-react-app 多页项目改造



## 项目所有页面统一打包

1. 所有页面放在 `src/pages` 目录下
2. 每个文件夹代表一个单独的项目, 可以看作是一个单页



`path.js`

```js
...
function scan() {
  const dirs = fs.readdirSync(resolveApp('src/pages'));
	const map = {};
	dirs.forEach((file) => {
		const state = fs.statSync(resolveApp(`src/pages/${file}`));
		if (state.isDirectory()) {
			map[file] = `${resolveApp(`src/pages/${file}`)}/index.tsx`;
		}
	});
	return map;
}
const dirs = scan();

module.exports = {
  ...
  dirs
}
...
```



`webpack.config.js`

```js
function setup() {
  const entry = {};
	const plugins = [];

	Object.keys(paths.dirs).forEach((key) => {
		entry[key] = [paths.dirs[key]];

		const newPlugin = new HtmlWebpackPlugin({
			chunks: [key],
			inject: true,
			template: paths.appHtml,
			filename: `${key}.html`,
		});
		plugins.push(newPlugin);
	});

	return {
		entry,
		plugins,
	};
}

const Setup = setup();

module.exports = {
  entry: Setup.entry,
  plugins: [
    ...Setup.plugins
  ]
}
```





## 单独项目单独打包

1. 运行和打包项目时需要在命令行后加项目名

`webpack.config.js`

```js
...
module.exports = {
  entry: path.resolve(paths.pages, `${process.argv.slice(-1)[0]}/index.tsx`),
}
```

`path.js`

```js
const root = path.resolve(__dirname, '..');
const pages = path.resolve(root, 'src/pages');

module.exports = {
  ...
  pages
}
```



例如有如下项目目录:

```
src
	pages
		index
			index.tsx
		home
			index.tsx
```



```sh
# 运行项目命令
npm run start index
npm run start home

# 打包
npm run build index
npm run build home
```

