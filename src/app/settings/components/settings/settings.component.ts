import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {selectCurrentUser} from '../../../auth/store/reducers';
import {combineLatest, filter, Subscription} from 'rxjs';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {selectIsSubmitting, selectValidationErrors} from '../../store/reducers';
import {CommonModule} from '@angular/common';
import {BackendErrorMessages} from '../../../shared/components/backendErrorMessages/backendErrorMessages.component';
import {CurrentUserRequestInterface} from '../../../shared/types/currentUserRequest.interface';
import {authActions} from '../../../auth/store/actions';

@Component({
  selector: 'mc-settings',
  templateUrl: './settings.component.html',
  standalone: true,
  imports: [CommonModule, BackendErrorMessages, ReactiveFormsModule],
})
export class SettingsComponent implements OnInit, OnDestroy {
  form = this.fb.nonNullable.group({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  });

  currentUser?: CurrentUserInterface;
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    validationErrors: this.store.select(selectValidationErrors),
  });

  currentUserSubscription?: Subscription;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnDestroy(): void {
    // to avoid memory leaks
    // unsubscribe when the component is destroyed
    this.currentUserSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.currentUserSubscription = this.store
      .pipe(
        select(selectCurrentUser),
        filter(Boolean) // filter undefined or null
      )
      .subscribe((currentUser) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }

  initializeForm(): void {
    if (!this.currentUser) {
      throw new Error('current user is not set');
    } else {
      this.form.patchValue({
        image: this.currentUser.image ?? '',
        username: this.currentUser.username,
        bio: this.currentUser.bio ?? '',
        email: this.currentUser.email,
        password: '',
      });
    }
  }

  submit(): void {
    if (!this.currentUser) {
      throw new Error('current user is not set');
    }
    const currentUserRequest: CurrentUserRequestInterface = {
      user: {
        ...this.currentUser,
        ...this.form.getRawValue(),
      },
    };
    this.store.dispatch(authActions.updateCurrentUser({currentUserRequest}));
  }

  logout(): void {
    this.store.dispatch(authActions.logout());
  }
}
