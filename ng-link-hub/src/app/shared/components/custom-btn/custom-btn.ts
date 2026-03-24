import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgIcon } from '@ng-icons/core';
@Component({
  selector: 'app-custom-btn',
  imports: [MatIconModule, NgIcon],
  templateUrl: './custom-btn.html',
  styleUrl: './custom-btn.scss',
})
export class CustomBtn {
  isOnlyIcon = input.required<boolean>();
  //si solo ira icono
  iconSrc = input<string>('');
  directionIcon = input<string>('');
  //si ira texto
  label = input<string>('');
  backgroundColor = input.required<string>();
  color = input.required<string>();

  fontSize = input.required<string>(); //tanto para el icono como para el texto
  width = input.required<string>();

  borderRadius = input<string>('');
  borderWidth = input<string>('');
  borderColor = input<string>('');

  disabled = input<boolean>(false);

  padding = input<string>();
  //ouptuts
  onClick = output<void>();
  //metodos
  handleBtnClick() {
    if (!this.disabled()) {
      this.onClick.emit();
    }
  }
}
