import { Component, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-container-custom-input',
  imports: [MatIconModule, RouterLink],
  templateUrl: './container-custom-input.html',
  styleUrl: './container-custom-input.scss',
})
export class ContainerCustomInput {
  //propiedades del label
  existLabel = input.required<boolean>();
  containLink = input<boolean>(false);
  textLink = input<string>('');
  routerLinkProp = input<string>('');
  textLabel = input<string>('');
  colorLabel = input<string>('');
  fontsizeLabel = input<string>('');
  typeSeccion = input<string>('');
  //propiedades del p-message
  isVisibleMessage = input.required<boolean>();
  typeMessage = input<string>('error');
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
  requiredInput = input.required<boolean>();
  controlInvalid = input<boolean>(false);
  controlTouched = input<boolean>(false);
  valueInput = input<string | null>(null);

  isPasswordVisible = signal<boolean>(false);
  typeInputSignal = signal<string>('password');
  

  passwordVisibilityChange = output<boolean>();

  valueChange = output<string>();

  togglePasswordVisibility() {
    const newVisibility = !this.isPasswordVisible();
    this.isPasswordVisible.set(newVisibility);
    this.passwordVisibilityChange.emit(newVisibility);
  }

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.valueChange.emit(inputElement.value);
  }
}
