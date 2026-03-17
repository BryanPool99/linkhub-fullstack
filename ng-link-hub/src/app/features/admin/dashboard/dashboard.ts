import { Component, inject } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  _adminService = inject(AdminService);
  ngOnInit(): void {
    console.log("INICIO DE SECCION DASHBOARD DESDE EL ADMIN");
    this._adminService.saludoDesdeElAdmin().subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error)
    })
  }
}
