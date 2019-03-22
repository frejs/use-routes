import React from 'react'
import ReactDOM from 'react-dom'
import { useRoutes, navigate } from './ignore/index'

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
  )
}

const App = () => {
  const result = useRoutes(routes)
  return result
}

ReactDOM.render(<App />, document.getElementById('root'))
