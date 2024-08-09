import {Component} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class RegisterComponent {
  form: FormGroup;

  onSubmit() {
    console.log('form', this.form.getRawValue());
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.nonNullable.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
