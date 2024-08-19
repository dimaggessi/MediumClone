import {BackendErrorsInterface} from '../../auth/types/backendErrors.interface';
import {ArticleInterface} from '../../shared/types/article.interface';
import {ArticleRequestInterface} from './../../shared/types/articleRequest.interface';
import {createActionGroup, emptyProps, props} from '@ngrx/store';

export const updateArticleActions = createActionGroup({
  source: 'Update article',
  events: {
    'Get article': props<{slug: string}>(),
    'Get article success': props<{article: ArticleInterface}>(),
    'Get article failure': emptyProps(),

    'Update article': props<{request:ArticleRequestInterface, slug: string}>(),
    'Update article success': props<{article: ArticleInterface}>(),
    'Update article failure': props<{errors: BackendErrorsInterface}>(),
  },
});

// it's important 'Get article' here to know which namespace is using Get article
