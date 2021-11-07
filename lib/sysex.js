module.exports = {
  getAllPresetsSysex,
}

const HEADER     = [ 0xF0, 0x00, 0x01, 0x77, 0x7F ]
const TRAILER    = [ 0xF7 ]
const CMD_SET    = 0x01
const CMD_GET    = 0x02
const TGT_PRESET = 0x01
const TGT_GLOBAL = 0x05
const TGT_BACKUP = 0x7F

// sysex to Pacer to dump a lot of stuff
// f000 0177 7f02 7f7f f7
function getAllPresetsSysex() {
  const command = [CMD_GET, TGT_BACKUP]
  addCheckSum(command)
  return [].concat(HEADER, command, TRAILER)
}

/** @type { (bytes: number[]) => number[] } */
function addCheckSum(bytes) {
  if (bytes.length == 0) return [0x80]

  const sum = bytes.reduce((prev, curr) => prev + curr)
  const checkSum = (0x80 - (sum % 0x80)) % 0x80
  return bytes.concat(checkSum)
}
