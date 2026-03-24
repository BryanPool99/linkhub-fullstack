import { Component } from '@angular/core';
import { CustomBtn } from "../../../shared/components/custom-btn/custom-btn";
import { provideIcons } from '@ng-icons/core';
import { ionAddSharp } from '@ng-icons/ionicons';
import { ContainerDataLink } from "../../../shared/components/container-data-link/container-data-link";

@Component({
  selector: 'app-dashboard',
  imports: [CustomBtn, ContainerDataLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
   viewProviders: [provideIcons({ ionAddSharp })]
})
export class Dashboard {
  data:any = [1,2,3,4];
  ngOnInit(): void {
    console.log("INICIO DE SECCION DASHBOARD DESDE EL ADMIN");
  }

  addLink() {
    console.log('add link');
    alert('add link');
  }
}
