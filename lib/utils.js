const { resolve } = require("path/posix")

module.exports = {
  createDeferred,
  until,
}

/** @type { () => { promise: Promise<any>, resolve: (a: any) => any, reject: (a: any) => any} } */
function createDeferred() {
  let resolve, reject

  const promise = new Promise((res, rej) => {
    resolve = res
    reject  = rej
  })

  return { promise, resolve, reject }
}

/** @type { (fn: ()=>boolean, interval: number) => Promise<void> } */
async function until(fn, interval) {
  const deferred = createDeferred()

  const intv = setInterval(onInterval, interval)

  return deferred.promise

  function onInterval() {
    try {
      if (!fn()) return
    } catch (err) {
      clearInterval(intv)
      deferred.reject(err)
    }

    clearInterval(intv)
    deferred.resolve()
  }
}
