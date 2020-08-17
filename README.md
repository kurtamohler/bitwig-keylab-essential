# bitwig-keylab-essential
Bitwig controller script for the Arturia KeyLab Essential 49 keyboard
  
## Environment

This script might be useful for you if your setup looks like this:

* DAW: Bitwig (<= 2.3.5, and possibly higher)
* Keyboard: Arturia KeyLab Essential 49
* OS: Linux (I'm not sure if this matters or not, the issues I had probably apply to MacOS and Windows as well)

## Install
  1. Find your `'Bitwig Studio/Controller Scripts'` directory. It will probably be right next to your `'Bitwig Studio/Projects'` directory.
  2. Create a `'Bitwig Studio/Controller Scripts/arturia/keylab_essential_49'` directory and copy the `KeyLabEssential49.control.js` script into it.

## Features

* Generic key mappings
* Enable user to map knobs and faders to any controllable parameters inside Bitwig 
* Automatically map knobs to channel controls in Bitwig (but they can be overridden inside Bitwig)

I'm still developing this script, so it's currently very basic. I'm planning on adding more features. Please submit an issue for any features you'd like me to add, or you can submit a PR if you want to add it yourself.

## Details

### The problem

In my version of Bitwig (2.3.5), there is no controller script available for the KeyLab Essential 49. Perhaps a newer version of Bitwig has it, but I didn't want to spend the money to update. It looks like [Bitwig does offer a script](https://www.bitwig.com/en/community/control_scripts/arturia/keylab/keylab.html), but the download link for it doesn't seem to work anymore.

I also tried using all the available scripts for other Arturia keyboards that my version of Bitwig offers. Those scripts unfortunately had a really annoying issue that made it impossible to use the control knobs effectively. Also, since those controllers are for different keyboards, the code mappings don't fully match the Essential 49.

### The solution

So I decided to make my own script. I started with the `'bitwig-studio/resources/controllers/generic/Generic MIDI Keyboard with 8 knobs.control.js'` script ([also used to be available from here](https://www.bitwig.com/en/community/control_scripts/generic/generic_knobs/genericknobs_1.html), but the download and github repo links don't work anymore) and added the correct MIDI code mappings for the knobs and faders. The way the generic controller script handles knob movements is evidently different than the Bitwig-provided KeyLab scripts, because it doesn't have the weird issues that made those scripts impossible to use.
