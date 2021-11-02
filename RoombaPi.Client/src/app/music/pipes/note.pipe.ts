import { Pipe, PipeTransform } from "@angular/core";

import { MidiNote } from "../models/midiNote";

@Pipe({ name: "note" })
export class NotePipe implements PipeTransform {
  transform(value: MidiNote) {
    return MidiNote[value].replace("S", "#");
  }
}
