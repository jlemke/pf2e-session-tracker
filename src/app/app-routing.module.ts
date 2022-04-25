import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayComponent } from './play/play.component';
import { SelectProfileComponent } from './select-profile/select-profile.component';
import { SessionHistoryComponent } from './session-history/session-history.component';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  { path : '', component : HomeComponent },
  { path : 'session', component : PlayComponent },
  { path : 'stats', component: StatsComponent },
  { path : 'history', component: SessionHistoryComponent },
  { path : 'profile-select', component: SelectProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
