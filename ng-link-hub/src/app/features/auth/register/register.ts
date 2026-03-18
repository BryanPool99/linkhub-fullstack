import { Component, inject } from '@angular/core';
import { ContainerCustomInput } from '../../../shared/components/container-custom-input/container-custom-input';
import { CustomBtn } from '../../../shared/components/custom-btn/custom-btn';
import { provideIcons } from '@ng-icons/core';
import { ionArrowForward, ionLogoGithub, ionLogoGoogle } from '@ng-icons/ionicons';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { UserRegisterRequestDto } from '../../../shared/interfaces/auth.interface';

@Component({
  selector: 'app-register',
  imports: [ContainerCustomInput, CustomBtn, RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  viewProviders: [provideIcons({ ionArrowForward, ionLogoGoogle, ionLogoGithub })],
})
export class Register {
  typeInput = 'password';
  registerForm!: FormGroup;

  _authService = inject(AuthService);
  _router = inject(Router);
  _fb = inject(FormBuilder);

  constructor() {
    this.registerForm = this._fb.group({
      usernameRegister: ['', Validators.required],
      emailRegister: ['', [Validators.required, Validators.email]],
      passwordRegister: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onPasswordVisibilityChange(isVisible: boolean) {
    this.typeInput = isVisible ? 'text' : 'password';
  }

  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);

    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }

    if (control?.hasError('email')) {
      return 'El formato del correo es incorrecto';
    }

    if (control?.hasError('minlength')) {
      return 'Es demasiado corto';
    }

    return ''; // Si no hay errores
  }

  registerWithGoogle() {
    console.log('register with google');
  }

  registerWithGithub() {
    console.log('register with github');
  }

  registerWithCredentials() {
    console.log('register with credentials');
    //console.log(this.registerForm);
    
    if(this.registerForm.valid){
      const userRegisterDto:UserRegisterRequestDto = {
        username: this.registerForm.value.usernameRegister,
        email: this.registerForm.value.emailRegister,
        password: this.registerForm.value.passwordRegister,
        roles: 'ROLE_USER,ROLE_ADMIN'
      }
      this._authService.registerUser(userRegisterDto).subscribe({
        next: (response) => {
          console.log("response de API para register", response);
          localStorage.setItem('access_token', response.accessToken);
          this._router.navigate(['admin/dashboard']);
        },
        error: (error) => {
          console.log(error);
          alert(error.error);
        }
      })
    }
  }
}
