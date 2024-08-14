import { PopularTagType } from '../../../types/popularTag.type';
import {createActionGroup, emptyProps, props} from '@ngrx/store';

export const popularTagsActions = createActionGroup({
  source: 'popular tags',
  events: {
    'Get tags': emptyProps(),
    'Get tags success': props<{popularTags: PopularTagType[]}>(),
    'Get tags failure': emptyProps(),
  },
});
