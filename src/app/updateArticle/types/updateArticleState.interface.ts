import {ArticleInterface} from './../../shared/types/article.interface';
import {BackendErrorsInterface} from '../../auth/types/backendErrors.interface';

export interface UpdateArticleStateInterface {
  article: ArticleInterface | null;
  isLoading: boolean;
  isSubmitting: boolean;
  validationErrors: BackendErrorsInterface | null;
}
