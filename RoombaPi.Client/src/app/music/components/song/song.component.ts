import { Component, Input } from "@angular/core";

import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Note } from "../../models/note";
import { MidiNote } from "../../models/midiNote";
import { MusicPlayerService } from "../../services/musicPlayer.service";

@Component({
  selector: "app-song",
  templateUrl: "song.component.html",
  styleUrls: ["song.component.scss"]
})
export class SongComponent {
  public closeIcon = faTimesCircle;

  constructor(private musicPlayer: MusicPlayerService) {
  }

  @Input()
  public notes: Array<Note> = [new Note(MidiNote.AS3, 0.1)];

  public playNote(note: Note): void {
    this.musicPlayer.play([note]);
  }
}
