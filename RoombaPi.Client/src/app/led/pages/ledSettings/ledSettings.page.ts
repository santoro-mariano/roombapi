import { Component } from "@angular/core";

@Component({
  templateUrl: "ledSettings.page.html",
  styleUrls: ["ledSettings.page.scss"]
})
export class LedSettingsComponent {

  public onAsciiKeyPress(event: KeyboardEvent): boolean {
    const input = event.target as HTMLInputElement;
    return input && input.value.length < 4 && event.key.charCodeAt(0) >= 32 && event.key.charCodeAt(0) <= 126;
  }
}
