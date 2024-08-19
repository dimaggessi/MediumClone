import {createFeature, createReducer, on} from '@ngrx/store';
import {routerNavigationAction} from '@ngrx/router-store';
import {updateArticleActions} from './actions';
import {UpdateArticleStateInterface} from '../types/updateArticleState.interface';

const initialState: UpdateArticleStateInterface = {
  article: null,
  isLoading: false,
  isSubmitting: false,
  validationErrors: null,
};

const updateArticleFeature = createFeature({
  name: 'updateArticle',
  reducer: createReducer(
    initialState,
    on(updateArticleActions.getArticle, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(updateArticleActions.getArticleSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      article: action.article,
    })),
    on(updateArticleActions.getArticleFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(updateArticleActions.updateArticle, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(updateArticleActions.updateArticleSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(updateArticleActions.updateArticleFailure, (state, actions) => ({
      ...state,
      isSubmitting: false,
      validationErrors: actions.errors,
    })),

    // when jumping to different articles is always clearing the state:
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: updateArticleFeatureKey,
  reducer: updateArticleReducer,
  selectIsSubmitting,
  selectValidationErrors,
  selectIsLoading,
  selectArticle,
} = updateArticleFeature;
