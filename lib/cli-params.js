/** @typedef { import('./types').CliParams } CliParams */
/** @typedef { import('./types').CliOptions } CliOptions */

const minimist = require('minimist')
const pkg = require('../package.json')
const { log } = require('./log')

module.exports = {
  getCliParams,
}

const DEFAULT_PORT = 'PACER MIDI1'

const minimistOpts = {
  boolean: ['help', 'version' ],
  alias: {
    h: 'help',
    v: 'version',
    p: 'port',
  },
}

/** @type { (argv?: string[]) => CliParams } */
function getCliParams(argv) {
  if (!argv) argv = process.argv.slice(2)
  const cliArgs = minimist(argv, minimistOpts)

  /** @type { CliOptions } */
  const opts = {
    port: cliArgs.port || DEFAULT_PORT,
  }

  if (cliArgs.help) help()
  if (cliArgs.version) version()

  const [ command, ...args ] = cliArgs._
  if (!command) help()

  return { opts, command, args }
}

function version() {
  console.log(pkg.version)
  process.exit(1)
}

function help() {
  console.log(`
${pkg.name} v${pkg.version}

A tool to read and write Nektar Pacer presets as structured text files in
JSON, YAML, or TOML format.

usage:
    ${pkg.name} command args...

commands:
    dump <filename>
    load <filename>
    dump-hex
    list-ports

options:
    -h --help          print this help
    -v --version       print program version
    -p --port          MIDI port; default: PACER MIDI1

If no parameters are provided, the help text is printed.

The dump command will dump the current Pacer settings to the specified file.

The load command will load the current Pacer settings from the specified file.

The dump-hex command will dump the current Pacer settings to the specified file,
as Sysex information in a nice hex format.

The list-ports command will list the currently available MIDI ports.

The DEBUG environment variable can be set to anything for debug logging.

For more information, go to ${pkg.homepage}
`.trim())
  process.exit(1)
}

