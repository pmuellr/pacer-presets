/** @typedef { import('../types').CommandHandler } CommandHandler */

const set = require('../set')
const midiPort = require('../midi-port')

module.exports = {
  command,
}

/** @type { CommandHandler } */
async function command(opts, args) {
  console.log('not yet implemented')
  process.exit(0)
}
