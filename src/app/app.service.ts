import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { PROFILES, SESSIONS } from './sample-session-data';
import { SessionData } from './session-data';
import { calculateLongestSession, calculateMostRecentSession } from './session-stats';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  //TODO combine into singular service, session service

  profiles: string[] = PROFILES;

  sessions: SessionData[] = SESSIONS;

  loadProfiles(): void {
    this.storage.get('profiles').subscribe((data) => {
      if (data != undefined) {
        console.log(data);
      }
    });
  }
  
  saveProfiles(): void {
    this.storage.set('profiles', this.profiles).subscribe(() => {});
  }

  getProfiles(): string[] {
    return this.profiles;
  }

  loadSessions(): void {
    this.storage.get('sessions').subscribe((data) => {
      if (data != undefined) {
        console.log(data);
        this.sessions = data as any[] ?? [];
        // Then it sorts it so most recent sessions are first
        this.sessions.sort((a, b) => Date.parse(b.startTime) - Date.parse(a.startTime));
      } else {
        console.log("Error loading session data from local storage.");
      }
    });
  }

  saveSessions(): void {
    this.storage.set('sessions', this.sessions).subscribe(() => {});
  }

  getSessions(profileName?: string) {
    if (typeof profileName != 'undefined')
      return this.sessions.filter(session => session.character == profileName);
    else
      return this.sessions;
  }

  getMostRecentSession(profileName: string) {
    //return calculateMostRecentSession(this.getSessions(profileName));
    return this.getSessions(profileName)[0];
  }
  
  selectProfile(selected: string) {
    this.profiles = [selected, ...this.profiles.filter((profile) => profile !== selected)];
  }

  getSelectedProfile(): string {
    return this.profiles[0];
  }

  saveCurrentSession(session: SessionData) {
    this.sessions = [session, ...this.sessions];
    this.storage.set('sessions', this.sessions).subscribe(() => {});
    console.log(session);
  }

  constructor(private storage: StorageMap) {
    this.loadProfiles();
    this.loadSessions();
  }

}
