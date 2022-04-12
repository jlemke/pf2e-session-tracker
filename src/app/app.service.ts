import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { PROFILES } from './sample-session-data';
import { SessionData } from './session-data';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  //TODO combine into singular service, session service

  profiles: string[] = PROFILES;

  sessions: SessionData[] = [];

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
      }
    });
  }

  saveSessions(): void {
    this.storage.set('sessions', this.sessions).subscribe(() => {});
  }

  getSessions() {
    return this.sessions;
  }

  
  
  selectProfile(selected: string) {
    this.profiles = [selected, ...this.profiles.filter((profile) => profile !== selected)];
  }

  getSelectedProfile(): string {
    return this.profiles[0];
  }

  saveCurrentSession(session: SessionData) {
    this.sessions.push(session);
    this.storage.set('sessions', this.sessions).subscribe(() => {});
    console.log(session);
  }

  constructor(private storage: StorageMap) { }

}
