import {BackendErrorsInterface} from '../../auth/types/backendErrors.interface';
import {ArticleInterface} from '../../shared/types/article.interface';
import {ArticleRequestInterface} from './../../shared/types/articleRequest.interface';
import {createActionGroup, emptyProps, props} from '@ngrx/store';

export const createArticleActions = createActionGroup({
  source: 'create article',
  events: {
    'Create article': props<{request: ArticleRequestInterface}>(),
    'Create article success': props<{article: ArticleInterface}>(),
    'Create article failure': props<{errors: BackendErrorsInterface}>(),
  },
});
