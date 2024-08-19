import {ArticleInterface} from './../../../shared/types/article.interface';
import {Component, OnInit} from '@angular/core';
import {ArticleFormValuesInterface} from '../../../shared/components/articleForm/types/articleFormValues.interface';
import {ArticleFormComponent} from '../../../shared/components/articleForm/components/createArticle/articleForm.component';
import {select, Store} from '@ngrx/store';
import {combineLatest, filter, map, Observable} from 'rxjs';
import {
  selectIsSubmitting,
  selectValidationErrors,
  selectArticle,
  selectIsLoading,
} from '../../store/reducers';
import {ArticleRequestInterface} from '../../../shared/types/articleRequest.interface';
import {CommonModule} from '@angular/common';
import {LoadingComponent} from '../../../shared/components/loading/loading.component';
import {ActivatedRoute} from '@angular/router';
import {updateArticleActions} from '../../store/actions';

@Component({
  selector: 'mc-update-article',
  templateUrl: './updateArticle.component.html',
  standalone: true,
  imports: [ArticleFormComponent, CommonModule, LoadingComponent],
})
// *********************************************
// two ways of using selectors:
// (1) - this.store.select(selectorName).pipe())
// (2) this.store.pipe(select(selectorName))
// *********************************************
export class UpdateArticleComponent implements OnInit {
  initalValues$: Observable<ArticleFormValuesInterface> = this.store.pipe(
    select(selectArticle),
    filter((article): article is ArticleInterface => article !== null),
    map((article: ArticleInterface) => {
      return {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      };
    })
  );
  slug = this.route.snapshot.paramMap.get('slug') ?? '';
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    validationErrors: this.store.select(selectValidationErrors),
    isLoading: this.store.select(selectIsLoading),
    initialValues: this.initalValues$,
  });

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(updateArticleActions.getArticle({slug: this.slug}));
  }

  onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const request: ArticleRequestInterface = {
      article: articleFormValues,
    };
    this.store.dispatch(
      updateArticleActions.updateArticle({request, slug: this.slug})
    );
  }
}
