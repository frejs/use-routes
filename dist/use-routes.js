(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = global || self, factory(global['use-routes'] = {}, global.React));
}(this, function (exports, React) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  let stack = {};
  let prepared = {};
  function useRoutes(routes) {
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

    return typeof stackObj.component === 'function' ? stackObj.component(stackObj.props) : push(stackObj.component);
  }

  function process(rid) {
    const {
      routes,
      setter
    } = stack[rid];
    const currentPath = location.pathname || '/';
    let path, component, props;

    for (let i = 0; i < routes.length; i++) {
      [path, component] = routes[i];
      const [reg, group] = prepared[path] ? prepared[path] : preparedRoute(path);
      const result = currentPath.match(reg);

      if (!result) {
        component = () => {};

        continue;
      }

      if (group.length) {
        props = {};
        group.forEach((item, index) => props[item] = result[index + 1]);
      }

      break;
    }

    Object.assign(stack[rid], {
      path,
      component,
      props
    });
    setter(Date.now());
  }

  function preparedRoute(route) {
    if (prepared[route]) return prepared[route];
    const prepare = [new RegExp(`${route.substr(0, 1) === '*' ? '' : '^'}${route.replace(/:[a-zA-Z]+/g, '([^/]+)').replace(/\*/g, '')}${route.substr(-1) === '*' ? '' : '$'}`)];
    const props = route.match(/:[a-zA-Z]+/g);
    prepare.push(props ? props.map(name => name.substr(1)) : []);
    prepared[route] = prepare;
    return prepare;
  }

  function push(url) {
    window.history.pushState(null, null, url);
    processStack();
  }

  const processStack = () => Object.keys(stack).forEach(process);

  window.addEventListener('popstate', processStack);
  function A(props) {
    const {
      onClick: onclick
    } = props;

    const onClick = e => {
      e.preventDefault();
      push(e.target.href);
      if (onclick) onclick(e);
    };

    return React.createElement("a", _extends({}, props, {
      onClick: onClick
    }));
  }

  exports.useRoutes = useRoutes;
  exports.push = push;
  exports.A = A;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
