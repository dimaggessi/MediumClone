import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {PopularTagType} from '../../../types/popularTag.type';
import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment.development';
import {GetPopularTagResponseInterface} from '../types/getPopularTagResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class PopularTagService {
  constructor(private http: HttpClient) {}

  getPopularTags(): Observable<PopularTagType[]> {
    const url = environment.apiUrl + '/tags';
    return this.http
      .get<GetPopularTagResponseInterface>(url)
      .pipe(map((r) => r.tags));
  }
}
