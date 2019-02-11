import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApisService } from '../../services/apis.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  formErrors = {
    'email': '',
    'password': ''
  };
  validationMessages = {
    'email': {
      'required': 'Por favor introduzca su correo electrónico.',
      'email': 'por favor ingrese su correo electrónico válido.'
    },
    'password': {
      'required': 'Por favor, introduzca su contraseña.',
      'pattern': 'La contraseña debe contener números y letras.',
      'minlength': 'Por favor ingrese más de 4 caracteres.',
      'maxlength': 'Por favor, introduzca menos de 25 caracteres.',
    }
  };

  constructor(private router: Router,
              private fb: FormBuilder,
              public api: ApisService) {

  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
      ],
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
     if (!this.userForm) {
       return;
     }
     const form = this.userForm;
     for (const field in this.formErrors) {
       if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
         this.formErrors[field] = '';
         const control = form.get(field);
         if (control && control.dirty && !control.valid) {
           const messages = this.validationMessages[field];
           for (const key in control.errors) {
             if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
               this.formErrors[field] += messages[key] + ' ';
             }
           }
         }
       }
     }
  }
  login() {
    console.log(this.userForm);

    this.api.auth(this.userForm).then(data => {
      console.log(data, 'SUCEESSS');
      this.router.navigate(['/auth/dashboard']);
    });

  }
}

