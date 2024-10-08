import {createFeature, createReducer, on} from '@ngrx/store';
import {UserProfileStateInterface} from '../types/userProfileState.interface';
import {userProfileActions} from './actions';
import {routerNavigationAction} from '@ngrx/router-store';

const initialState: UserProfileStateInterface = {
  data: null,
  isLoading: false,
  error: null,
};

export const userProfileFeature = createFeature({
  name: 'userProfile',
  reducer: createReducer(
    initialState,
    on(userProfileActions.getUserProfile, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(userProfileActions.getUserProfileSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.profile,
    })),
    on(userProfileActions.getUserProfileFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: userProfileFeatureKey,
  reducer: userProfileReducer,
  selectIsLoading,
  selectError,
  selectData: selectUserProfileData,
} = userProfileFeature;
