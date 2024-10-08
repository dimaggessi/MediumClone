import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';

import {provideRouter} from '@angular/router';
import {appRoutes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideState, provideStore} from '@ngrx/store';
import {provideRouterStore, routerReducer} from '@ngrx/router-store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {authFeatureKey, authReducer} from './auth/store/reducers';
import {
  feedFeatureKey,
  feedReducer,
} from './shared/components/feed/store/reducer';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {provideEffects} from '@ngrx/effects';
import * as authEffects from './auth/store/effects';
import * as feedEffects from './shared/components/feed/store/effects';
import * as popularTagsEffects from './shared/components/popularTags/store/effects';
import * as addToFavoritesEffects from './shared/components/addToFavorites/store/effects';
import {authInterceptor} from './shared/services/authInterceptor';
import {
  popularTagsFeatureKey,
  popularTagsReducer,
} from './shared/components/popularTags/store/reducers';
import { AddToFavoritesService } from './shared/components/addToFavorites/services/addToFavorites.service';
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(appRoutes),
    provideClientHydration(),
    provideStore({router: routerReducer}),
    provideRouterStore(),
    provideState(authFeatureKey, authReducer),
    provideState(feedFeatureKey, feedReducer),
    provideState(popularTagsFeatureKey, popularTagsReducer),
    provideEffects(
      authEffects,
      feedEffects,
      popularTagsEffects,
      addToFavoritesEffects
    ),
    provideStoreDevtools({
      maxAge: 25, // maximum amounth of actions stored
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    AddToFavoritesService,
  ],
};
