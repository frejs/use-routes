## :vertical_traffic_light: fre-router

A router hook for react and fre

### Use

```javascript
import { createRouter, useRouter, push } from 'fre-router'

createRouter([
  {
    path: '/home',
    component: () => <>
      <button onClick={() => push('/home/yse')}>Go yse</button>
    </>,
    children: [
      {
        path: '/:username',
        component: params => <>
          <p>{params.username}</p>
          <button onClick={() => push('/home')}>Go home</button>
        </>
      }
    ]
  }
])

export const App = () => useRoute('/home')
```
