import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";

import {
  MusicComposerServiceClient,
  SetSongRequest,
  Note as RequestNote,
  PlaySongRequest
} from "@app/grpc/musicComposer";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";

import { Note } from "../models/note";

@Injectable({ providedIn: "root" })
export class MusicComposerService {
  private readonly client: MusicComposerServiceClient;

  constructor() {
    this.client = new MusicComposerServiceClient(environment.grpcServer);
  }

  public setSong(songIndex: number, notes: Array<Note>): void {
    const request = new SetSongRequest();
    request.setSongIndex(songIndex);
    request.setNotesList(notes.map(x => {
      const note = new RequestNote();
      note.setNumber(x.midiNote);
      note.setDuration(x.duration);
      return note;
    }));
    this.client.setSong(request, null);
  }

  public playSong(songIndex: number): void {
    const request = new PlaySongRequest();
    request.setSongIndex(songIndex);
    this.client.playSong(request, null);
  }

  public getSelectedSong(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.client.getSelectedSong(new Empty(), null, (error, response) => {
        if (error) {
          return reject(error);
        }

        resolve(response.getSongIndex());
      });
    });
  }

  public isSongPlaying(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.client.isSongPlaying(new Empty(), null, (error, response) => {
        if (error) {
          return reject(error);
        }

        resolve(response.getSongPlaying());
      });
    });
  }
}
