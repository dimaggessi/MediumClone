import {map, Observable} from 'rxjs';
import {ArticleRequestInterface} from '../../shared/types/articleRequest.interface';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ArticleInterface} from '../../shared/types/article.interface';
import {environment} from '../../../environments/environment.development';
import {ArticleResponseInterface} from '../../shared/types/articleReponse.interface';

@Injectable()
export class UpdateArticleService {
  constructor(private http: HttpClient) {}

  updateArticle(
    slug: string,
    articleRequest: ArticleRequestInterface
  ): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;

    return this.http
      .put<ArticleResponseInterface>(fullUrl, articleRequest)
      .pipe(map((response) => response.article));
  }
}
