import {Route} from '@angular/router';
import {ArticleComponent} from './components/article.component';
import {provideEffects} from '@ngrx/effects';
import * as articleEffects from './store/effects';
import {articleFeatureKey, articleReducer} from './store/reducers';
import {provideState} from '@ngrx/store';
import { ArticleService } from './services/article.service';

export const routes: Route[] = [
  {
    path: '',
    component: ArticleComponent,

    // providers here because they aren't shareable
    // this stuff belong only to this feature
    // lazyload
    providers: [
      provideEffects(articleEffects),
      provideState(articleFeatureKey, articleReducer),
      ArticleService
    ],
  },
];
