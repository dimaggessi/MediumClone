import {CurrentUserRequestInterface} from './../../shared/types/currentUserRequest.interface';
import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {RegisterRequestInterface} from '../types/registerRequest.interface';
import {CurrentUserInterface} from '../../shared/types/currentUser.interface';
import {BackendErrorsInterface} from '../types/backendErrors.interface';
import {LoginRequestInterface} from '../types/loginRequest.interface';

// ngrx sugar
export const authActions = createActionGroup({
  source: 'auth', // action's namespace [Auth]
  events: {
    // effects typically uses 3 actions: start, success, failure
    Register: props<{request: RegisterRequestInterface}>(),
    'Register success': props<{currentUser: CurrentUserInterface}>(),
    'Register failure': props<{errors: BackendErrorsInterface}>(),

    Login: props<{request: LoginRequestInterface}>(),
    'Login success': props<{currentUser: CurrentUserInterface}>(),
    'Login failure': props<{errors: BackendErrorsInterface}>(),

    'Get current user': emptyProps(),
    'Get current user success': props<{currentUser: CurrentUserInterface}>(),
    'Get current user failure': emptyProps(),

    'Update current user': props<{
      currentUserRequest: CurrentUserRequestInterface;
    }>(),
    'Update current user success': props<{currentUser: CurrentUserInterface}>(),
    'Update current user failure': props<{errors: BackendErrorsInterface}>(),

    Logout: emptyProps(),
  },
});

// export const register = createAction(
//   '[Auth] Register',
//   props<{request: RegisterRequestInterface}>()
// );

// export const registerSuccess = createAction(
//   '[Auth] Register Success',
//   props<{request: RegisterRequestInterface}>()
// );

// export const registerFailure = createAction(
//   '[Auth] Register Failure',
//   props<{request: RegisterRequestInterface}>()
// );
