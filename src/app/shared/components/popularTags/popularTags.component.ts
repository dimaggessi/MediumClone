import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {popularTagsActions} from './store/actions';
import {Store} from '@ngrx/store';
import {
  selectError,
  selectIsLoading,
  selectPopularTagsData,
} from './store/reducers';
import {combineLatest} from 'rxjs';
import {LoadingComponent} from '../loading/loading.component';
import {ErrorMessageComponent} from '../errorMessage/errorMessage.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popularTags.component.html',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ErrorMessageComponent, RouterLink],
})
export class PopularTagsComponent implements OnInit {
  data$ = combineLatest({
    popularTags: this.store.select(selectPopularTagsData),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
  });

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(popularTagsActions.getTags());
  }
}
