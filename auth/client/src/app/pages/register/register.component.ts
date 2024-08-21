import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerForm! : FormGroup;
  confirmPasswordHide! :boolean ;

  constructor(private fb : FormBuilder, router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fullName: ['', [Validators.required]],
      roles: [''],
      confirmPasword: ['', Validators.required]
    });
  }



}
