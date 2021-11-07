/** @typedef { import('./types').CreateMidiPortsParams } CreateMidiPortsParams */
/** @typedef { import('./types').OnMessage } OnMessage */
/** @typedef { import('./types').MidiPort } MidiPort */

const midi = require('midi')

module.exports = {
  openMidiPort,
  getInputPorts,
  getOutputPorts,
}

/** @type { ({ name, onMessage }: CreateMidiPortsParams) => MidiPort } */
function openMidiPort({ name, onMessage }) {
  return new MidiPortImpl(name, false, onMessage)
}

/** @type { () => string[] } */
function getInputPorts() {
  return getPorts(true)
}

/** @type { () => string[] } */
function getOutputPorts() {
  return getPorts(false)
}

/** @type { (input: boolean) => string[] } */
function getPorts(input) {
  const ports = input ? new midi.Input() : new midi.Output()
  const count = ports.getPortCount()
  const result = []

  for (let i = 0; i < count; i++) {
    result.push(ports.getPortName(i))
  }

  result.sort()
  return result
}

/** @type { (name: string, input: boolean) => number } */
function getMidiPortNumber(name, input) {
  const ports = input ? new midi.Input() : new midi.Output()
  const count = ports.getPortCount()
  for (let i = 0; i < count; i++) {
    if (name === ports.getPortName(i)) return i
  }
  return -1
}

class MidiPortImpl {
  /** 
   * @param { string } name 
   * @param { OnMessage } onMessage 
   * */
  constructor(name, virtual, onMessage) {
    this._name = name
    this._onMessage = onMessage
    this._iPort = new midi.Input()
    this._oPort = new midi.Output()

    this._iPort.on('message', (deltaTime, message) => {
      this._onMessage(deltaTime, message)
    })

    const iPortNumber = getMidiPortNumber(name, true)
    const oPortNumber = getMidiPortNumber(name, false)

    if (iPortNumber < 0) throw new Error(`midi input port "${name}" not available`)
    if (oPortNumber < 0) throw new Error(`midi output port "${name}" not available`)

    this._iPort.openPort(iPortNumber)
    this._oPort.openPort(oPortNumber)

    this._iPort.ignoreTypes(false, true, true)
  }

  get name() {
    return this._name
  }

  close() {
    this._iPort.closePort()
    this._oPort.closePort()
  }

  /** @type { (bytes: number[]) => void } */
  sendMessage(bytes) {
    this._oPort.sendMessage(bytes)
  }
}
