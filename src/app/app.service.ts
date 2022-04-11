import { Injectable } from '@angular/core';
import { PROFILES } from './sample-session-data';
import { SessionData } from './session-data';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  //TODO combine into singular service, session service

  profiles: string[] = PROFILES;

  sessions: SessionData[] = [];

  getProfiles(): string[] {
    return this.profiles;
  }

  selectProfile(selected: string) {
    this.profiles = [selected, ...this.profiles.filter((profile) => profile !== selected)];
  }

  getSelectedProfile(): string {
    return this.profiles[0];
  }

  getSessions() {
    return this.sessions;
  }

  saveSession(session: SessionData) {
    this.sessions.push(session);
  }

  constructor() { }
}
