// reducer: a function where inside is defined how actions are changing the State

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
      currentUser: action.currentUser
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })),
  ),
});

// export name as authFeatureKey and reducer as authReducer
export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectCurrentUser,
  selectValidationErrors
} = authFeature;
