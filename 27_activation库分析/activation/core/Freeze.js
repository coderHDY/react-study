// Fork from react-freeze
// https://github.com/software-mansion/react-freeze/blob/main/src/index.tsx
import React, { Component, Suspense, Fragment } from 'react'

// function Suspender({ freeze, children }) {
//   const promiseCache = useRef({}).current
//   if (freeze && !promiseCache.promise) {
//     promiseCache.promise = new Promise((resolve) => {
//       promiseCache.resolve = resolve
//     })
//     throw promiseCache.promise
//   } else if (freeze) {
//     throw promiseCache.promise
//   } else if (promiseCache.promise) {
//     promiseCache.resolve()
//     promiseCache.promise = undefined
//   }

//   return <Fragment>{children}</Fragment>
// }

class Suspender extends Component {
  promiseCache = {}
  render() {
    const { freeze, children } = this.props
    const { promiseCache } = this

    /* 缓存且 React.lazy 的情况 */
    if (freeze && !promiseCache.promise) {
      promiseCache.promise = new Promise((resolve) => {
        promiseCache.resolve = resolve
      })
      throw promiseCache.promise

    /* 缓存 的情况 */
    } else if (freeze) {
      throw promiseCache.promise

    /* React.lazy 但不缓存 的情况 */
    } else if (promiseCache.promise) {
      promiseCache.resolve()
      promiseCache.promise = undefined
    }

    return <Fragment>{children}</Fragment>
  }
}

export default function Freeze({ freeze, children, placeholder = null }) {
  return (
    <Suspense fallback={placeholder}>
      <Suspender freeze={freeze}>{children}</Suspender>
    </Suspense>
  )
}