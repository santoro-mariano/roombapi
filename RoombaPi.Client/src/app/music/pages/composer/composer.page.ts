import { Component } from "@angular/core";

import { faEdit } from "@fortawesome/free-solid-svg-icons";

@Component({
  templateUrl: "composer.page.html",
  styleUrls: ["composer.page.scss"]
})
export class ComposerComponent {
  editIcon = faEdit;
}
