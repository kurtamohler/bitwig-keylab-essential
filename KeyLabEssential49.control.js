loadAPI(2);
host.setShouldFailOnDeprecatedUse(true);

host.defineController("Arturia", "KeyLab Essential 49 (in progress)", "1.0", "e143e7ff-60f3-42c2-baed-4315ecf05f66");
host.defineMidiPorts(1, 0);
host.setShouldFailOnDeprecatedUse(true);

var Knobs = [
    0x4a,   // Cutoff / Pan 1
    0x47,   // Resonance / Pan 2
    0x4c,   // LFO Rate / Pan 3
    0x4d,   // LFO Amt / Pan 4
    0x5d,   // Param 1 / Pan 5
    0x12,   // Param 2 / Pan 6
    0x13,   // Param 3 / Pan 7
    0x10,   // Param 4 / Pan 8
    0x11,   // Master
];
var Faders = [
    0x49,   // Attack / CH 1
    0x4b,   // Decay / CH 2
    0x4f,   // Sustain / CH 3
    0x48,   // Release / CH 4
    0x50,   // Attack / CH 5
    0x51,   // Decay / CH 6
    0x52,   // Sustain / CH 7
    0x53,   // Release / CH 8
    0x55,   // Master
];
var ModWheel = 0x01;
var PartControls = [
    0x16,   // Part 1 / Next
    0x17,   // Part 2 / Prev
    0x18,   // Live / Bank
];
var RemoteControlCodes = Knobs.concat(Faders);
var AllControls = Knobs.concat(Faders, [ModWheel], PartControls);

function init() {
    midiIn = host.getMidiInPort(0);
    midiIn.setMidiCallback(onMidi);
    midiIn.setSysexCallback(onSysex);
    allChannels = midiIn.createNoteInput("All Channels", "??????");
    allChannels.setShouldConsumeEvents(false);

    for (var i = 0; i < 16; i++)
    {
        midiIn.createNoteInput("Channel " + (i + 1), "?" + i.toString(16) + "????");
    }

    transport = host.createTransport();

    cursorTrack = host.createCursorTrack(3, 0);
    cursorDevice = cursorTrack.createCursorDevice();
    remoteControls = cursorDevice.createCursorRemoteControlsPage(RemoteControlCodes.length);
    
    RemoteControlCodes.forEach(function (code, ind){
        var p = remoteControls.getParameter(ind).getAmount();
        p.setIndication(true);
        p.setLabel("CC" + code);
    });
}

function onMidi(status, data1, data2) {
    if (isChannelController(status))
    {
        var remote_control_index = RemoteControlCodes.indexOf(data1);
        if (remote_control_index >= 0) {
            remoteControls.getParameter(remote_control_index).getAmount().value().set(data2, 128);
        }
    }
}

function onSysex(data) {
    // MMC Transport Controls:
    switch (data) {
        case "f07f7f0605f7":
            transport.rewind();
            break;
        case "f07f7f0604f7":
            transport.fastForward();
            break;
        case "f07f7f0601f7":
            transport.stop();
            break;
        case "f07f7f0602f7":
            transport.play();
            break;
        case "f07f7f0606f7":
            transport.record();
            break;
    }
}

function exit() {}
