/**
 * Routes
 *
 * @export
 * @interface Routes
 */
export interface Routes {
  [url: string]: string | (() => JSX.Element)
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
 * AnchorProps
 *
 * @export
 * @interface AnchorProps
 * @extends {React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>}
 */
export interface AnchorProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}
/**
 * A
 *
 * @export
 * @param {AnchorProps} props
 * @returns {JSX.Element}
 */
export function A(props: AnchorProps): JSX.Element
