#!/usr/bin/env node

/** @typedef { import('./lib/types').OnMessage } OnMessage */
/** @typedef { import('./lib/types').MidiPort } MidiPort */

const pkg = require('./package.json')

const set = require('./lib/set')
const { log } = require('./lib/log')
const midiPort = require('./lib/midi-port')
const cliParams = require('./lib/cli-params')

const { command: cmdDump } = require('./lib/commands/dump');
const { command: cmdDumpHex } = require('./lib/commands/dump-hex');
const { command: cmdLoad } = require('./lib/commands/load');
const { command: cmdListPorts } = require('./lib/commands/list-ports');

if (require.main === module) setImmediate(main)

async function main() {
  const { opts, command, args }= cliParams.getCliParams(process.argv.slice(2))

  try {
    switch(command) {
      case 'dump':       await cmdDump(     opts, args); break
      case 'dump-hex':   await cmdDumpHex(  opts, args); break
      case 'load':       await cmdLoad(     opts, args); break
      case 'list-ports': await cmdListPorts(opts, args); break
      default:
        console.log(`${pkg.name}: unsupported command: ${command}`)
    }
  } catch(err) {
    console.log(`${pkg.name}: error running "${command}": ${err}`)
  }
}
