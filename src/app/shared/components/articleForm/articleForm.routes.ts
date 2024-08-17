import {Route} from '@angular/router';
import { ArticleFormComponent } from './components/createArticle/articleForm.component';

export const routes: Route[] = [
  {
    path: '',
    component: ArticleFormComponent,
  }
];
