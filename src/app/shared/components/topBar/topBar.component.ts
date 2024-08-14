import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectCurrentUser} from '../../../auth/store/reducers';
import {combineLatest} from 'rxjs';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'mc-topbar',
  templateUrl: './topBar.component.html',
  standalone: true,
  imports: [RouterLink, CommonModule],
})
export class TopBarComponent {
  // currentUser$ = this.store.select(selectCurrentUser);

  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser),
  });
  constructor(private store: Store) {}
}
