import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserProfileService} from '../services/userProfile.service';
import {inject} from '@angular/core';
import {userProfileActions} from './actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {UserProfileInterface} from '../types/userProfile.interface';

export const userProfileEffects = createEffect(
  (
    actions$ = inject(Actions),
    userProfileService = inject(UserProfileService)
  ) => {
    return actions$.pipe(
      ofType(userProfileActions.getUserProfile),
      switchMap(({slug}) => {
        return userProfileService.getUserProfile(slug).pipe(
          map((profile: UserProfileInterface) => {
            return userProfileActions.getUserProfileSuccess({profile});
          }),
          catchError(() => {
            return of(userProfileActions.getUserProfileFailure());
          })
        );
      })
    );
  },
  {functional: true}
);
