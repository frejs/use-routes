import { h, useState } from 'fre'
let routeStack = {}
let pathCache = {}

export function useRoutes (routes) {
  const id = useState(Symbol())[0]
  const setter = useState(0)[1]

  let stack = {
    routes: Object.entries(routes),
    setter
  }

  routeStack[id] = stack
  perfrom()

  return typeof stack.component === 'string'
    ? push(stack.component)
    : stack.component(stack.props)
}

function perfrom (rid) {
  const { routes, setter } = routeStack[rid]
  const currentPath = location.pathname || '/'

  let path, component, props

  for (let i = 0; i < routes.length; i++) {
    ;[path, component] = routes[i]
    const [reg, params] = pathSlice(path)

    const res = currentPath.match(reg)
    if (!res) {
      component = () => {}
      continue
    }

    if (params.length) {
      props = {}
      group.forEach((item, index) => (props[item] = result[index + 1]))
    }
    break
  }

  Object.assign(routeStack[rid], {
    path,
    component,
    props
  })

  setter(Symbol())
}

function pathSlice(path) {
  if (pathCache[path]) return pathCache[path]
  const slice = [
    new RegExp(
      `${path.substr(0, 1) === '*' ? '' : '^'}${path
        .replace(/:[a-zA-Z]+/g, '([^/]+)')
        .replace(/\*/g, '')}${path.substr(-1) === '*' ? '' : '$'}`
    )
  ]

  const params = path.match(/:[a-zA-Z]+/g)
  slice.push(params ? params.map(name => name.substr(1)) : [])

  pathCache[path] = slice
  return slice
}

export function push (url) {
  window.history.pushState(null, null, url)
  processStack()
}

const processStack = () => Object.keys(routeStack).forEach(perfrom)

window.addEventListener('popstate', processStack)

export function A (props) {
  const { onClick: onclick, children } = props

  const onClick = e => {
    e.preventDefault()
    push(e.target.href)

    if (onclick) onclick(e)
  }

  return (
    <a {...props} onClick={onClick}>
      {children}
    </a>
  )
}
