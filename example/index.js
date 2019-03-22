import React from 'react'
import ReactDOM from 'react-dom'
import { useRoutes } from '../src/index'

const routes = {
  '/': () => (
    <>
      <p>home</p>
    </>
  ),
  '/home/:id': ({ id }) => (
    <>
      <p>{id}</p>
      <button onClick={() => navigate('/')}>Go jack</button>
    </>
  )
}

const App = () =>  {
  return useRoutes(routes)
}

ReactDOM.render(<App />, document.getElementById('root'))
