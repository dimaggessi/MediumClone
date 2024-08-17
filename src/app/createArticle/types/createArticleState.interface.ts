import {BackendErrorsInterface} from '../../auth/types/backendErrors.interface';

export interface CreateArticleStateInterface {
  isSubmitting: boolean;
  validationErrors: BackendErrorsInterface | null;
}
