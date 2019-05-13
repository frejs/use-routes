<img align="right" height="150" src="https://ws1.sinaimg.cn/large/0065Zy9egy1g189q52z05j30dw0dwwgo.jpg" />

# use-routes

> 800 Bytes router hook for Fre and React

[![](https://img.shields.io/npm/v/use-routes.svg?style=flat)](https://npmjs.com/package/use-routes)
[![](https://img.shields.io/npm/dm/use-routes.svg?style=flat)](https://npmjs.com/package/use-routes)
[![](https://img.shields.io/bundlephobia/minzip/use-routes.svg?style=flat)](https://bundlephobia.com/result?p=use-routes)

### Use

```javascript
import { h, render } from 'fre'
import { useRoutes, push } from 'use-routes'

const routes = {
  '/': () => (
    <div>
      <p>home</p>
      <button onClick={() => push('/home/jack')}>Go jack</button>
    </div>
  ),
  '/home/:id': ({ id }) => (
    <div>
      <p>{id}</p>
      <button onClick={() => push('/')}>Go home</button>
    </div>
  ),
}

const App = () => useRoutes(routes)

render(<App />, document.getElementById('root'))
```

以上，首先定义一个路由的对象，key 为正则路径，value 为组件

只 `history` 模式，但支持浏览器刷新

### React

use-routes 同时适用于 fre 和 react，但默认是服务于 fre 的

如果想要用于 react，可以通过 webpack 配置别名

```js
resolve: {
  alias: {
    'fre': 'react'
  }
}
```

然后还要修改 `createElement` 为 `h` 函数

```js
const h = React.createElement
```

#### useRoutes

```JSX
function App(){
  const result = useRoutes(routes)
  return result || <NotFound />
}
```

`useRoutes` 返回一个组件，这个组件会根据 `pathname` 和 routes 的 key 匹配

如果匹配不到，可以事先准备一个全局的 404 组件 √

#### redirect

重定向，只需要将 routes 对象的 value 变成需要重定向的 路径字符串 即可

```jsx
const routes = {
  '/': '/home',
  '/home': () => <Home />,
}
```

如上，当匹配到跟路径，会跳转到 home 路径，并渲染 home 组件

#### A link

方便跳转，默认也对外暴露了一个 A 组件，作用和 Link 组件一样：

```JSX
<A href='/home/jack'>Go jack</A>
```

标签属性和 a 标签一样，只是默认做了阻止冒泡

#### License

_MIT ©132yse, inspired by routerhook_
