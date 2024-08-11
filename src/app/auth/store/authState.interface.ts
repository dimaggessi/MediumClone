import {CurrentUserInterface} from '../../shared/types/currentUser.interface';
import {BackendErrorsInterface} from '../types/backendErrors.interface';

// every single feature will create a slice of state
export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUser: CurrentUserInterface | null | undefined;
  isLoading: boolean;
  validationErrors: BackendErrorsInterface | null;
}
