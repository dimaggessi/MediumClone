import {ArticleInterface} from './../types/article.interface';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable, switchMap} from 'rxjs';
import {environment} from '../../../environments/environment.development';
import {ArticleResponseInterface} from '../types/articleReponse.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticle(slug: string): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;
    return this.http
      .get<ArticleResponseInterface>(fullUrl)
      .pipe(map((response) => response.article));
  }
}
