import { Component } from '@angular/core';
import { ContainerCustomInput } from "../../shared/components/container-custom-input/container-custom-input";
import { CustomBtn } from "../../shared/components/custom-btn/custom-btn";

@Component({
  selector: 'app-presentacion-componentes',
  imports: [ContainerCustomInput, CustomBtn],
  templateUrl: './presentacion-componentes.html',
  styleUrl: './presentacion-componentes.scss',
})
export class PresentacionComponentes {

}
