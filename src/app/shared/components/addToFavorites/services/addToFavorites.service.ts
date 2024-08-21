import {Injectable} from '@angular/core';
import {ArticleInterface} from '../../../types/article.interface';
import {map, Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {ArticleResponseInterface} from '../../../types/articleReponse.interface';

// only related to AddToFavoritesComponent
// so it can be provided only inside the component imports: []
@Injectable()
export class AddToFavoritesService {
  constructor(private http: HttpClient) {}
  addToFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);

    return this.http
      .post<ArticleResponseInterface>(url, {})
      .pipe(map(this.getArticle));
  }

  removeFromFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);

    return this.http
      .delete<ArticleResponseInterface>(url)
      .pipe(map(this.getArticle));
  }

  getUrl(slug: string): string {
    return `${environment.apiUrl}/articles/${slug}/favorite`;
  }

  getArticle(response: ArticleResponseInterface): ArticleInterface {
    return response.article;
  }
}
