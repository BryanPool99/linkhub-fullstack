import { Component, input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-custom-btn',
  imports: [MatIconModule],
  templateUrl: './custom-btn.html',
  styleUrl: './custom-btn.scss',
})
export class CustomBtn {
  isOnlyIcon = input.required<boolean>();
  //si solo ira icono
  iconSrc = input<string>('');
  //si ira texto
  label = input<string>('');
  backgroundColor = input.required<string>();
  color = input.required<string>();

  fontSize = input.required<string>();//tanto para el icono como para el texto
  width = input.required<string>();

  borderRadius = input.required<string>();
  borderWidth = input.required<string>();
  borderColor = input.required<string>();
}
