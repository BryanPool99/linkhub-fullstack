import { Component, inject } from '@angular/core';
import { CustomBtn } from '../../../shared/components/custom-btn/custom-btn';
import { provideIcons } from '@ng-icons/core';
import { ionLogoGoogle, ionLogoGithub } from '@ng-icons/ionicons';
import { ContainerCustomInput } from "../../../shared/components/container-custom-input/container-custom-input";
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { AuthRequestDto } from '../../../shared/interfaces/auth.interface';
@Component({
  selector: 'app-login',
  imports: [CustomBtn, ContainerCustomInput,RouterLink,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  viewProviders: [provideIcons({ ionLogoGoogle, ionLogoGithub })],
})
export class Login {

  typeInput = 'password';
  loginForm!:FormGroup;

  //injectar lo necesario para la funcionalidad(authservice,router,formbuilder)
  _authService = inject(AuthService);
  _router = inject(Router);
  _fb = inject(FormBuilder);
  constructor() {
    this.loginForm = this._fb.group({
      usernameLogin: [''],
      passwordLogin: [''],
    });
  }

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
    //alert('login with credentials');
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      const authRequestData:AuthRequestDto = {
        username: this.loginForm.value.usernameLogin,
        password: this.loginForm.value.passwordLogin
      }
      console.log(authRequestData);
      this._authService.login(authRequestData).subscribe({
        next: (response) => {
          console.log("response de API", response);
          localStorage.setItem('access_token', response.accessToken);
          this._router.navigate(['admin/dashboard']);
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  onPasswordVisibilityChange(isVisible: boolean) {
    this.typeInput = isVisible ? 'text' : 'password';
  }
}
