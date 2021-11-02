import { MidiNote } from "./midiNote";

export class Note {
  constructor(public  midiNote: MidiNote,
              public duration: number) {
  }
}
