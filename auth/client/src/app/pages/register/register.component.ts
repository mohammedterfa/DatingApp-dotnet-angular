import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from 'src/app/interfaces/role';
import { ValidationErrors } from 'src/app/interfaces/validation-error';
import { AuthService } from 'src/app/services/auth.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerForm! : FormGroup;
  confirmPasswordHide! :boolean ;

  errors!: ValidationErrors[]

  roles$!:Observable<Role[]>;

  constructor(private fb : FormBuilder, private router: Router,
    private roleService: RoleService,
    private authService: AuthService,
    private matSnackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fullName: ['', [Validators.required]],
      roles: [''],
      confirmPasword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });

    this.roles$ = this.roleService.getRoles();
  }


  register(){
    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log(response);

        this.matSnackBar.open(response.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center'
        });
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        if(err!.status === 400){
          this.errors = err.error;
          this.matSnackBar.open('Validation error', 'Close', {
            duration: 5000,
            horizontalPosition: 'center'
          })
        }
      },

      complete: () => console.log('completed')
    });
  }

  private passwordMatchValidator(
    control: AbstractControl
  ):{ [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPasword')?.value;
    if(password !== confirmPassword){ {
      return { passwordMismatch: true };
    }}

    return null;
  }



}
