/// <reference types="react" />
/**
 * Routes
 *
 * @export
 * @interface Routes
 */
export interface Routes {
  [key: string]: () => JSX.Element
}
/**
 * useRoutes
 *
 * @export
 * @param {Routes} routes
 * @returns {(JSX.Element | null)}
 */
export function useRoutes(routes: Routes): JSX.Element | null
/**
 * push
 *
 * @export
 * @param {string} url
 */
export function push(url: string): void
/**
 * A
 *
 * @export
 * @interface A
 * @extends {React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>}
 */
export interface A
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}
/**
 * A
 *
 * @export
 * @param {A} props
 * @returns {JSX.Element}
 */
export function A(props: A): JSX.Element
