import {GetFeedResponseInterface} from '../types/getFeedResponse.interface';

export interface FeedStateInterface {
  isLoading: boolean; // to show the loading indicator
  error: string | null; // if get some error from the backend
  data: GetFeedResponseInterface | null; // store data from the API
}
