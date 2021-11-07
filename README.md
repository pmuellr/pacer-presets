pacer-presets - read and write presets for the Nektar Pacer
================================================================================

A tool to read and write [Nektar Pacer][] presets as structured text files in
[JSON][], [YAML][], or [TOML][] format.


[Nektar Pacer]: https://nektartech.com/pacer-midi-daw-footswitch-controller/
[JSON]: https://www.json.org/json-en.html
[YAML]: https://yaml.org/
[TOML]: https://toml.io/en/


usage
================================================================================

After installing, run the following for usage help

    pacer-presets -h

TODO: ADD MORE 


installation
================================================================================

    npm install -g pmuellr/pacer-presets


background
================================================================================

I just bought a [Nektar Pacer][], which seems to be a really nice product,
physically, and probably one of the worst I've had to use, programmatically.
The system can be "programmed" via the encoder / switches and LED display with
a handful of characters.  It's like pulling teeth.

There's also the [Pacer editor][] by [StudioCode.dev][] / 
[François Georgy][].  It's invaluable as
a tool to get a dump of the presets, and do some experimentation.

But I really want text files.  I'd like a text file format for as many of the
Pacer settings that can be made, that I can use to "send" to the Pacer as it's
current settings.  And then also read them back into a text file in the same
format.  This would make it easier to play with multiple changes at the same
time, like re-configuring colors of switches across presets.

This would be fairly straight-forward if Nektar provided the format of the MIDI
Sysex messages that are sent to / from the device, but they don't.  I opened a
support issue asking for that information.  In lieu of that, the 
[Pacer editor source code][] is apparently reading and writing the Sysex
messages to do it's thing, so I'll crib from there.

Initially I'm developing this for node, as it will be the quickest way for me
to iterate on it.  But longer-term, would be nice to have the following:

- support for [Web Midi API][], so you can drag/drop files, paste text, etc,
  in a browser
- support for [Max For Live][], so you can have presets associated with a Live
  Set

[Pacer editor]: https://studiocode.dev/pacer-editor
[François Georgy]: https://github.com/francoisgeorgy
[StudioCode.dev]: https://studiocode.dev/
[Pacer editor source code]: https://github.com/francoisgeorgy/pacer-editor
[Web Midi API]: https://webaudio.github.io/web-midi-api/
[Max for Live]: https://www.ableton.com/en/live/max-for-live/


changelog
================================================================================

version 1.0.0 - 2021-11-07

- initial version, under active development


license
================================================================================

This package is licensed under the MIT license.  See the [LICENSE.md][] file
for more information.


contributing
================================================================================

Awesome!  We're happy that you want to contribute.

Please read the [CONTRIBUTING.md][] file for more information.


[LICENSE.md]: LICENSE.md
[CONTRIBUTING.md]: CONTRIBUTING.md
[CHANGELOG.md]: CHANGELOG.md