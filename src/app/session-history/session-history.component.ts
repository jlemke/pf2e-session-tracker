import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { getFormattedDuration, SessionData } from '../session-data';

@Component({
  selector: 'app-session-history',
  templateUrl: './session-history.component.html',
  styleUrls: ['./session-history.component.css']
})
export class SessionHistoryComponent implements OnInit {

  profile: string = "";
  sessions: SessionData[] = [];
  listNumber: number = 5;

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

  sessionLength(session: SessionData): string {
    return getFormattedDuration(session);
  }

  showMoreHistory(): void {
    this.listNumber += 5;
  }
}
