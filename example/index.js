import React from 'react'
import ReactDOM from 'react-dom'
import { useRoutes, push, A } from './router'

const routes = {
  '/home': '/',
  '/': () => (
    <>
      <p>home</p>
      <A href='/home/jack'>Go jack</A>
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
