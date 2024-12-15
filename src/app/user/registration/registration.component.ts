import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {FirstKeyPipe} from "../../shared/pipes/first-key.pipe";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,FirstKeyPipe],
  templateUrl: './registration.component.html',
  styles: ``
})
export class RegistrationComponent {
  isSubmitted: boolean = false;
  constructor(public formBuilder: FormBuilder) {
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): null => {
    const password = control.get("password");
    const confirmPassword = control.get("confirmPassword");

    if(password && confirmPassword && password.value != confirmPassword.value){
      confirmPassword?.setErrors({passwordMismatch:true});
    }
    else{
      confirmPassword?.setErrors(null);
    }



    return null;
  }
  form = this.formBuilder.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required,
      Validators.minLength(6),
      Validators.pattern(/(?=.*[^a-zA-Z0-9 ])/)]],
    confirmPassword: [''],
  }, {validators: this.passwordMatchValidator})


  onSubmit() {
    this.isSubmitted = true;
    console.log(this.form.value)
  }

  hasDisplayableError(controlName:string):boolean{
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) && (this.isSubmitted || Boolean(control?.touched));
  }
}
