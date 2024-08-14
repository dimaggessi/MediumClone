import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {feedActions} from './store/actions';
import {combineLatest} from 'rxjs';
import {selectError, selectFeedData, selectIsLoading} from './store/reducer';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Params, Router, RouterLink} from '@angular/router';
import {ErrorMessageComponent} from '../errorMessage/errorMessage.component';
import {LoadingComponent} from '../loading/loading.component';
import {environment} from '../../../../environments/environment.development';
import {PaginationComponent} from '../pagination/pagination.component';
import queryString from 'query-string';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
  ],
})
export class FeedComponent implements OnInit {
  @Input() apiUrl: string = '';

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectFeedData),
  });

  limit = environment.limit;
  baseUrl = this.router.url.split('?')[0];
  currentPage: number = 0;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      // {page: '1'}
      this.currentPage = Number(params['page'] || '1');
      this.fetchFeed();
    });
  }

  // /articles?limit=20&offset=0
  // page 1 offset 0
  // page 2 offset 20 (first page has 20 articles)
  // page 3 offset 40
  // page 4 offset 60 and so on
  fetchFeed(): void {
    const offset = (this.currentPage * this.limit) - this.limit;

    // to avoid something like /articles?foo=foo
    const parsedUrl = queryString.parseUrl(this.apiUrl);

    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query
    })
    console.log('offset', offset, parsedUrl, stringifiedParams);

    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
    this.store.dispatch(feedActions.getFeed({url: apiUrlWithParams}));
  }
}
