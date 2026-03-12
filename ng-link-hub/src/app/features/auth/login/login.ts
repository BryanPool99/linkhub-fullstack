import { Component } from '@angular/core';
import { CustomBtn } from '../../../shared/components/custom-btn/custom-btn';
import { provideIcons } from '@ng-icons/core';
import { ionLogoGoogle, ionLogoGithub } from '@ng-icons/ionicons';
import { ContainerCustomInput } from "../../../shared/components/container-custom-input/container-custom-input";
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [CustomBtn, ContainerCustomInput,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  viewProviders: [provideIcons({ ionLogoGoogle, ionLogoGithub })],
})
export class Login {

  loginWithGoogle() {
    console.log('login with google');
    alert('login with google');
  }

  loginWithGithub() {
    console.log('login with github');
    alert('login with github');
  }

  loginWithCredentials() {
    console.log('login with credentials');
    alert('login with credentials');
  }
}
