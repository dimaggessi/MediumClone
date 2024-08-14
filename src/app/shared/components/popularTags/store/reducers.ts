import {createFeature, createReducer, on} from '@ngrx/store';
import {PopularTagsStateInterface} from '../types/popularTagsState.interface';
import {popularTagsActions} from './actions';

const initialState: PopularTagsStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const popularTagsFeature = createFeature({
  name: 'popular tags',
  reducer: createReducer(
    initialState,
    on(popularTagsActions.getTags, (state) => ({...state, isLoading: true})),
    on(popularTagsActions.getTagsSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.popularTags,
    })),
    on(popularTagsActions.getTagsFailure, (state) => ({
      ...state,
      isLoading: false,
    }))
  ),
});

export const {
  name: popularTagsFeatureKey,
  reducer: popularTagsReducer,
  selectIsLoading,
  selectError,
  selectData: selectPopularTagsData, //selectData is too generic, so it's renamed here
} = popularTagsFeature;
