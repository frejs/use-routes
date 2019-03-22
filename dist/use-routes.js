(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = global || self, factory(global['use-routes'] = {}, global.React));
}(this, function (exports, React) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;

  let stack = {};
  let prepared = {};

  function useRoutes (routes) {
    const [rid] = React.useState(Math.random().toString());
    const setter = React.useState(0)[1];

    let stackObj = stack[rid];

    if (!stackObj) {
      stackObj = {
        routes: Object.entries(routes),
        setter
      };

      stack[rid] = stackObj;

      process(rid);
    }

    const result = stackObj.component(stackObj.props);

    return result
  }

  function process (rid) {
    const { routes, setter, path: oldPath } = stack[rid];
    const currentPath = location.pathname || '/';

    let route, component, props, path;

    for (let i = 0; i < routes.length; i++) {
  [route, component] = routes[i];
      const [reg, group] = prepared[route]
        ? prepared[route]
        : preparedRoute(route);

      const result = currentPath.match(reg);
      if (!result) {
        component = () => {};
        continue
      }

      if (group.length) {
        props = {};
        group.forEach((item, index) => {
          props[item] = result[index + 1];
        });
      }

      path = currentPath.replace(result[0], '');
      break
    }

    Object.assign(stack[rid], {
      component,
      props,
      path,
      route
    });

    setter(Date.now());
  }

  function preparedRoute (route) {
    if (prepared[route]) return prepared[route]
    const prepare = [
      new RegExp(
        `${route.substr(0, 1) === '*' ? '' : '^'}${route
        .replace(/:[a-zA-Z]+/g, '([^/]+)')
        .replace(/\*/g, '')}${route.substr(-1) === '*' ? '' : '$'}`
      )
    ];

    const props = route.match(/:[a-zA-Z]+/g);
    prepare.push(props ? props.map(name => name.substr(1)) : []);

    prepared[route] = prepare;
    return prepare
  }

  const push = url => {
    window.history.pushState(null, null, url);
    processStack();
  };

  const processStack = () => Object.keys(stack).forEach(process);

  window.addEventListener('popstate', processStack);

  exports.useRoutes = useRoutes;
  exports.push = push;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
