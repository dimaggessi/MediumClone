import {createFeature, createReducer, on} from '@ngrx/store';
import {SettingsStateInterface} from '../types/settingsState.interface';
import {authActions} from '../../auth/store/actions';
import {routerNavigationAction} from '@ngrx/router-store';

const initialState: SettingsStateInterface = {
  isSubmitting: false,
  validationErrors: null,
};

// this reducer is only responsible to the settings page!
const settingsFeature = createFeature({
  name: 'settings',
  reducer: createReducer(
    initialState,
    on(authActions.updateCurrentUser, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    // updateCurrentUserSuccess also changes authReducer
    // so is not common the same action that are changing different slices of reducers
    // here is just changing 'isSubmitting'
    on(authActions.updateCurrentUserSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(authActions.updateCurrentUserFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(routerNavigationAction, () => initialState)
  ),
});
export const {
  name: settingsFeatureKey,
  reducer: settingsReducer,
  selectValidationErrors,
  selectIsSubmitting,
} = settingsFeature;
