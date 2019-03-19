import { useState } from 'react'

let router = {
  root: [],
  match: path => {},
  setHandler: router => {},
  clearHandler: handlerId => {}
}

export function createRouter(routes) {
  router.root = routes
}

export function useRouter(initPath) {
  const [router, setRouter] = useState([])
  useEffect(() => {
    let handlerId = router.setHandler(r => {
      setRouter(r)
    })

    router.match(initPath)

    return () => router.clearHandler(handlerId)
  }, [])
}

export const push = path => router.match(path)
