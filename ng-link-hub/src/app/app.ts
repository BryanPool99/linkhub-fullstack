import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CustomBtn } from "./shared/components/custom-btn/custom-btn";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggleModule, CustomBtn],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ng-link-hub');
}
