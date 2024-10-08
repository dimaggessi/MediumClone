// reducer: a function where inside is defined how actions are changing the State

import {routerNavigationAction} from '@ngrx/router-store';
import {authActions} from './actions';
import {AuthStateInterface} from './authState.interface';
import {createFeature, createReducer, on} from '@ngrx/store';

// slice of data for authFeature
const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: undefined,
  isLoading: false,
  validationErrors: null,
};

// createFeature is essentially a suger around reducer to write less code
// is defining all possible ways to change the State
// on(event, do something)
// register action is changing the State
const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.registerSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.loginSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),
    on(authActions.loginFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(authActions.getCurrentUser, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(authActions.getCurrentUserSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      currentUser: action.currentUser,
    })),
    on(authActions.getCurrentUserFailure, (state) => ({
      ...state,
      isLoading: false,
      currentUser: null,
    })),
    // because isLoading isn't needed, no reducer on 'updateCurrentUser' will be created
    // only reacting to updateCurrentUserSuccess
    on(authActions.updateCurrentUserSuccess, (state, action) => ({
      ...state,
      currentUser: action.currentUser,
    })),
    on(authActions.logout, (state) => ({
      ...state,
      ...initialState,
      currentUser: null
    })),
    on(routerNavigationAction, (state) => ({...state, validationErrors: null})),
  ),
});

// export name as authFeatureKey and reducer as authReducer
export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectCurrentUser,
  selectValidationErrors,
} = authFeature;
