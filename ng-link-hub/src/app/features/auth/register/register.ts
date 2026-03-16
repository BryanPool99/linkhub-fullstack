import { Component } from '@angular/core';
import { ContainerCustomInput } from "../../../shared/components/container-custom-input/container-custom-input";
import { CustomBtn } from "../../../shared/components/custom-btn/custom-btn";
import { provideIcons } from '@ng-icons/core';
import { ionArrowForward, ionLogoGithub, ionLogoGoogle } from '@ng-icons/ionicons';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-register',
  imports: [ContainerCustomInput, CustomBtn, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  viewProviders: [provideIcons({ionArrowForward,ionLogoGoogle,ionLogoGithub})]
})
export class Register {
  typeInput = 'password';

   onPasswordVisibilityChange(isVisible: boolean) {
    this.typeInput = isVisible ? 'text' : 'password';
  }

  registerWithGoogle() {
    console.log('register with google');
  }

  registerWithGithub() {
    console.log('register with github');
  }
}
