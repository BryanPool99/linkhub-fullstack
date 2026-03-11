import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-container-custom-input',
  imports: [MatIconModule],
  templateUrl: './container-custom-input.html',
  styleUrl: './container-custom-input.scss',
})
export class ContainerCustomInput {
  //propiedades del label
  existLabel = input.required<boolean>();
  textLabel = input<string>('');
  colorLabel = input<string>('');
  fontsizeLabel = input<string>('');
  //propiedades del p-message
  isVisibleMessage = input.required<boolean>();
  typeMessage = input<string>();
  textMessage = input<string>();
  //propiedades del input
  typeInput = input<string>('text');
  idInput = input<string>('');
  placeholderInput = input<string>('');
  fontSizeInput = input<string>('');
  colorTextInput = input<string>('');
  isWithIcon = input.required<boolean>();
  directionIcon = input<string>('');
  disabledInput = input.required<boolean>();
  requeredInput = input.required<boolean>();
}
