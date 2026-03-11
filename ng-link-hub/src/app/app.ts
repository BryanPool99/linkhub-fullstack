import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CustomBtn } from "./shared/components/custom-btn/custom-btn";
import { ContainerCustomInput } from "./shared/components/container-custom-input/container-custom-input";
import { SectionHeader } from "./shared/ui/layout/section-header/section-header";
import { SectionFooter } from "./shared/ui/layout/section-footer/section-footer";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggleModule, SectionHeader, SectionFooter],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ng-link-hub');
}
