import {authActions} from './../../store/actions';
import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {RegisterRequestInterface} from '../../types/registerRequest.interface';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {selectIsSubmitting, selectValidationErrors} from '../../store/reducers';
import {combineLatest} from 'rxjs';
import {BackendErrorMessages} from '../../../shared/components/backendErrorMessages.component';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessages,
  ],
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    console.log('form', this.form.getRawValue());
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(authActions.register({request}));
  }

  // combine all the selectors with combineLatest
  // resolve every single stream with the value
  // so, every single value from every single observable
  // inside this data property will be resolved directly like a local property
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  constructor(private fb: FormBuilder, private store: Store) {}
}
