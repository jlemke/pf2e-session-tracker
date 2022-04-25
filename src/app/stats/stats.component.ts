import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { getDuration, getFormattedDuration, SessionData } from '../session-data';
import { calculateNumberOfRolls } from '../session-stats';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  profile: string = "";
  sessions: SessionData[] = [];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.profile = this.appService.getSelectedProfile();
    this.sessions = this.appService.getSessions(this.profile);
  }

  sessionDate(session: SessionData): string {
    let date = new Date(session.endTime);
    let dateString = date.toDateString();
    return dateString;
  }

  totalSessionTime(): string {
    let totalDuration = this.sessions.reduce((acc, session) => acc + getDuration(session), 0);
    return getFormattedDuration(totalDuration);
  }

  totalRolls(): number {
    return calculateNumberOfRolls(this.sessions);
  }
}
