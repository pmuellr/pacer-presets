export interface CliOptions {
  port: string;
}

export interface CliParams {
  opts: CliOptions
  command: string
  args: string[]
}

export type OnMessage = (deltaTime: number, message: number[]) => void

export interface MidiPort {
  readonly name: string;
  close(): void
  sendMessage(bytes: number[]): void
}

export interface CreateMidiPortsParams {
  name: string
  onMessage: OnMessage
}

export type CommandHandler = (opts: CliOptions, args: string[]) => Promise<void>
