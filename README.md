<img align="right" height="150" src="https://ws1.sinaimg.cn/large/0065Zy9egy1g189q52z05j30dw0dwwgo.jpg" />

# use-routes

700 Bytes router hook for react and fre

[![](https://img.shields.io/npm/v/use-routes.svg?style=flat)](https://npmjs.com/package/use-routes)
[![](https://img.shields.io/npm/dm/use-routes.svg?style=flat)](https://npmjs.com/package/use-routes)
[![](https://img.shields.io/bundlephobia/minzip/use-routes.svg?style=flat)](https://bundlephobia.com/result?p=use-routes)

### Use

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { useRoutes, push } from './router'

const routes = {
  '/': () => (
    <>
      <p>home</p>
      <button onClick={() => push('/home/jack')}>Go jack</button>
    </>
  ),
  '/home/:id': ({ id }) => (
    <>
      <p>{id}</p>
      <button onClick={() => push('/')}>Go home</button>
    </>
  )
}

const App = () => useRoutes(routes)

ReactDOM.render(<App />, document.getElementById('root'))
```
以上，首先定义一个路由的对象，key 为正则路径，value 为组件

然后 `useRoutes` 返回一个组件，这个组件会根据 `pathname` 进行匹配渲染

只 `history` 模式，但支持浏览器刷新