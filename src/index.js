import { useState } from 'react'
let stack = {}
let prepared = {}

export const useRoutes = routes => {
  const [rid] = useState(Math.random().toString())
  const setter = useState(0)[1]

  let stackObj = stack[rid]

  if (!stackObj) {
    stackObj = {
      routes: Object.entries(routes),
      setter
    }

    stack[rid] = stackObj

    process(rid)
  }

  const result = stackObj.component(stackObj.props)

  return result
}

function process (rid) {
  const { routes, setter, path: oldPath } = stack[rid]
  const currentPath = window.history.location.pathname

  let route, component, props, path

  for (let i = 0; i < routes.length; i++) {
    ;[route, component] = routes[i]
    const [reg, group] = preparedRoutes[route]
      ? preparedRoutes[route]
      : preparedRoute(route)

    const result = currentPath.match(reg)
    if (!result) {
      component = () => {}
      continue
    }

    if (group.length) {
      props = {}
      group.forEach((item, index) => {
        props[item] = result[index + 1]
      })
    }

    path = currentPath.replace(result[0], '')
    break
  }

  Object.assign(stack[rid], {
    component,
    props,
    path,
    route
  })

  setter(Date.now())
}

function preparedRoute (route) {
  if (prepared[route]) return prepared[route]
  const prepare = [
    new RegExp(
      `${inRoute.substr(0, 1) === '*' ? '' : '^'}${inRoute
        .replace(/:[a-zA-Z]+/g, '([^/]+)')
        .replace(/\*/g, '')}${inRoute.substr(-1) === '*' ? '' : '$'}`
    )
  ]

  const props = route.match(/:[a-zA-Z]+/g)
  prepare.push(props ? props.map(name => name.substr(1)) : [])

  prepared[route] = prepare
  return prepare
}

export const push = url => {
  window.history.pushState(null, null, url)
  processStack()
}

const processStack = () => Object.keys(stack).forEach(process)

window.addEventListener('popstate', processStack)
