import { Injectable } from "@angular/core";

import * as Tone from "tone";

import { Note } from "../models/note";
import { MidiNote } from "../models/midiNote";

@Injectable({ providedIn: "root" })
export class MusicPlayerService {

  private synth: any;

  constructor() {
    this.synth = new Tone.PolySynth(1, Tone.Synth).toMaster();
  }

  public play(notes: Array<Note>): void {
    if (Tone.context.state !== "running") {
      Tone.context.resume().then(() => {
        notes.forEach(note => this.synth.triggerAttackRelease(MidiNote[note.midiNote].replace("S", "#"), note.duration));
      });
    } else {
      notes.forEach(note => this.synth.triggerAttackRelease(MidiNote[note.midiNote].replace("S", "#"), note.duration));
    }
  }
}
