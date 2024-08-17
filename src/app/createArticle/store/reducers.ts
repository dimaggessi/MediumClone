import {createFeature, createReducer, on} from '@ngrx/store';
import {createArticleActions} from './actions';
import {routerNavigationAction} from '@ngrx/router-store';
import {CreateArticleStateInterface} from '../types/createArticleState.interface';

const initialState: CreateArticleStateInterface = {
  isSubmitting: false,
  validationErrors: null,
};

const createArticleFeature = createFeature({
  name: 'createArticle',
  reducer: createReducer(
    initialState,
    on(createArticleActions.createArticle, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(createArticleActions.createArticleSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
    })),
    on(createArticleActions.createArticleFailure, (state, actions) => ({
      ...state,
      isSubmitting: false,
      validationErrors: actions.errors,
    })),

    // when jumping to different articles is always clearing the state:
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: createArticleFeatureKey,
  reducer: createArticleReducer,
  selectIsSubmitting,
  selectValidationErrors,
} = createArticleFeature;
