import { Component, input } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgIcon, provideIcons } from "@ng-icons/core";
import { ionPencilSharp, ionReorderFourOutline, ionTrashSharp } from '@ng-icons/ionicons';
import { CustomBtn } from "../custom-btn/custom-btn";
import { LinkDto } from '../../interfaces/link.interface';

@Component({
  selector: 'app-container-data-link',
  imports: [NgIcon, MatSlideToggleModule, CustomBtn],
  templateUrl: './container-data-link.html',
  styleUrl: './container-data-link.scss',
  viewProviders: [provideIcons({ ionReorderFourOutline,ionPencilSharp,ionTrashSharp })]
})
export class ContainerDataLink {
    dataLink = input.required<LinkDto>();
}
