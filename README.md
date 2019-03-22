<img align="right" height="150" src="https://ws1.sinaimg.cn/large/0065Zy9egy1g189q52z05j30dw0dwwgo.jpg" />

# fre-router

A router hook for react and fre

### Use

```javascript
import { useRoutes, push } from 'use-routes'

const routes = {
  '/': () => (
    <>
      <p>home</p>
      <button onClick={() => navigate('/home/jack')}>Go jack</button>
    </>
  ),
  '/home/:id': ({ id }) => (
    <>
      <p>{id}</p>
      <button onClick={() => navigate('/')}>Go jack</button>
    </>
  ),
}

const App = () => useRoutes(routes)
```
