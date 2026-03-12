import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CustomBtn } from "../../../components/custom-btn/custom-btn";
import { Router } from '@angular/router';
import { ionHome } from '@ng-icons/ionicons';
import { provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-section-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, CustomBtn],
  templateUrl: './section-header.html',
  styleUrl: './section-header.scss',
  viewProviders: [provideIcons({ ionHome })],
})
export class SectionHeader {

  private router = inject(Router);

  redirectToSignUp() {
    console.log('redirigir a sign up');
    this.router.navigate(['/auth/register']);
  }

  redirectToLogin(){
    console.log('redirigir a login');
    this.router.navigate(['/auth/login']);
  }

  redirectToHome(){
    console.log('redirigir a home');
    this.router.navigate(['/']);
  }
}
