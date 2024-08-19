import * as updateArticleEffects from './store/effects';
import {Route} from '@angular/router';
import {provideEffects} from '@ngrx/effects';
import {provideState} from '@ngrx/store';
import {UpdateArticleComponent} from './components/updateArticle/updateArticle.component';
import {UpdateArticleService} from './services/updateArticle.service';
import {updateArticleFeatureKey, updateArticleReducer} from './store/reducers';

export const routes: Route[] = [
  {
    path: '',
    component: UpdateArticleComponent,
    providers: [
      UpdateArticleService,
      provideEffects(updateArticleEffects),
      provideState(updateArticleFeatureKey, updateArticleReducer),
    ],
    // effects only provided for this route (lazyloading)
  },
];
