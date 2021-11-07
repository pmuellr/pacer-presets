/** @typedef { import('../types').CommandHandler } CommandHandler */
/** @typedef { import('../types').OnMessage } OnMessage */

const hexer = require('hexer')

const set = require('../set')
const midiPort = require('../midi-port')
const { printableMessage } = require('../printable-midi')
const { getAllPresetsSysex } = require('../sysex')
const { until } = require('../utils')

module.exports = {
  command,
}

/** @type { CommandHandler } */
async function command(opts, args) {
  const sysexCommand = getAllPresetsSysex()

  const name = opts.port
  const port = midiPort.openMidiPort({ name, onMessage })

  port.sendMessage(sysexCommand)

  await until(() => Date.now() - lastMessage > 1000, 1000)

  port.close()
}

let lastMessage = Date.now()

/** @type { OnMessage } */
function onMessage(deltaTime, message) {
  lastMessage = Date.now()

  if (message[0] != 0xF0) { // sysex
    console.log(`unexpected message: ${printableMessage(message)}`)
    return
  }

  message = message.slice(1, message.length - 1) // remove F0 ... F7
  const buffer = Buffer.from(message)
  console.log(hexer(buffer, { cols: 32 }))
  console.log()
}
