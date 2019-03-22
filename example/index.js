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
