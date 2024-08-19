import {ArticleService as SharedArticleService} from './../../shared/services/article.service';
import {ArticleInterface} from './../../shared/types/article.interface';
import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, Observable, of, switchMap, tap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {UpdateArticleService} from '../services/updateArticle.service';
import {updateArticleActions} from './actions';

// Get Article method for Update it's associated
// to this Actions namespace:
export const getArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    articleService = inject(SharedArticleService)
  ) => {
    return actions$.pipe(
      ofType(updateArticleActions.getArticle),
      switchMap(({slug}) => {
        return articleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            // provide article that was sent by API on articleService call
            return updateArticleActions.getArticleSuccess({article});
          }),
          catchError(() => {
            return of(updateArticleActions.getArticleFailure());
          })
        );
      })
    );
  },
  {functional: true}
);

export const updateArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    updateArticleService = inject(UpdateArticleService)
  ) => {
    return actions$.pipe(
      ofType(updateArticleActions.updateArticle),
      switchMap(({slug, request}) => {
        return updateArticleService.updateArticle(slug, request).pipe(
          map((article: ArticleInterface) => {
            return updateArticleActions.updateArticleSuccess({article});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              updateArticleActions.updateArticleFailure({
                errors: errorResponse.error.errors,
              })
            );
          })
        );
      })
    );
  },
  {functional: true}
);

export const redirectAfterUpdateEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(updateArticleActions.updateArticleSuccess),
      tap(({article}) => {
        router.navigate(['/articles', article.slug]);
      })
    );
  },
  {functional: true, dispatch: false}
);
