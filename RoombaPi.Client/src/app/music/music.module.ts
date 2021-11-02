import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatChipsModule } from "@angular/material/chips";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { MusicRoutingModule } from "./music-routing.module";
import { ComposerComponent } from "./pages/composer/composer.page";
import { SongComponent } from "./components/song/song.component";
import { NotePipe } from "./pipes/note.pipe";

@NgModule({
  declarations: [
    ComposerComponent,
    SongComponent,
    NotePipe
  ],
  imports: [
    CommonModule,
    MusicRoutingModule,
    MatCardModule,
    MatButtonModule,
    FontAwesomeModule,
    MatSelectModule,
    MatChipsModule
  ]
})
export class MusicModule {
}
