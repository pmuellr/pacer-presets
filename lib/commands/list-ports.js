/** @typedef { import('../types').CommandHandler } CommandHandler */

const set = require('../set')
const midiPort = require('../midi-port')

module.exports = {
  command,
}

/** @type { CommandHandler } */
async function command(opts, args) {
  const iPorts = new Set(midiPort.getInputPorts())
  const oPorts = new Set(midiPort.getOutputPorts())

  const ioPorts = set.filter(iPorts, (port) => oPorts.has(port))
  const isPorts = set.filter(iPorts, (port) => !oPorts.has(port))
  const osPorts = set.filter(oPorts, (port) => !iPorts.has(port))

  console.log('input-output ports:')
  ioPorts.forEach(port => console.log(`    ${port}`))

  if (isPorts) {
    console.log('input-only ports:')
    isPorts.forEach(port => console.log(`    ${port}`))
  }

  if (osPorts) {
    console.log('output-only ports:')
    osPorts.forEach(port => console.log(`    ${port}`))
  }
}
