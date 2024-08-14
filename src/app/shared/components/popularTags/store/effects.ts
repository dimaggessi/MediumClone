import {PopularTagService} from './../services/popularTag.service';
import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {popularTagsActions} from './actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {PopularTagType} from '../../../types/popularTag.type';

export const getPopularTagsEffect = createEffect(
  (
    actions$ = inject(Actions),
    popularTagService = inject(PopularTagService)
  ) => {
    return actions$.pipe(
      ofType(popularTagsActions.getTags),
      switchMap(() => {
        return popularTagService.getPopularTags().pipe(
          map((popularTags: PopularTagType[]) => {
            return popularTagsActions.getTagsSuccess({popularTags});
          }),
          catchError(() => {
            return of(popularTagsActions.getTagsFailure());
          })
        );
      })
    );
  },
  {functional: true}
);
