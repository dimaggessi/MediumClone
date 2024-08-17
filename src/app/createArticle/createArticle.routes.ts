import {CreateArticleService} from './services/createArticle.service';
import {Route} from '@angular/router';
import {CreateArticleComponent} from './components/createArticle/createArticle.component';
import * as createArticleEffects from './store/effects';
import {provideEffects} from '@ngrx/effects';
import {provideState} from '@ngrx/store';
import {createArticleFeatureKey, createArticleReducer} from './store/reducers';

export const routes: Route[] = [
  {
    path: '',
    component: CreateArticleComponent,
    providers: [
      CreateArticleService,
      provideEffects(createArticleEffects),
      provideState(createArticleFeatureKey, createArticleReducer),
    ],
    // effects only provided for this route (lazyloading)
  },
];
