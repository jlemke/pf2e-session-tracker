import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { PROFILES, SESSIONS } from './sample-session-data';
import { CombatData, getTimestamp, RollData, SessionData } from './session-data';
import { calculateLongestSession, calculateMostRecentSession } from './session-stats';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  //TODO combine into singular service, session service

  profiles: string[] = PROFILES;
  sessions: SessionData[] = SESSIONS;


  activeProfile: string = "";
  activeSessionStartTime: string = "";
  activeSessionCombats: CombatData[] = [];
  activeSessionRolls: RollData[] = [];


  loadProfilesFromStorage(): void {
    this.storage.get('profiles').subscribe((data) => {
      if (data != undefined) {
        console.log(data);
      }
    });
  }
  
  saveProfilesToStorage(): void {
    this.storage.set('profiles', this.profiles).subscribe(() => {});
  }

  getProfiles(): string[] {
    return this.profiles;
  }

  loadSessionsFromStorage(): void {
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

  saveSessionsToStorage(): void {
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
    this.activeProfile = selected;
  }

  getSelectedProfile(): string {
    this.activeProfile = this.profiles[0];
    return this.profiles[0];
  }

  startNewSession(): void {
    this.activeSessionStartTime = getTimestamp();
  }

  addCombat(combat: CombatData): void {
    this.activeSessionCombats = [combat, ...this.activeSessionCombats];
  }

  addRoll(roll: RollData): void {
    console.log(roll);
    this.activeSessionRolls = [roll, ...this.activeSessionRolls];
  }

  saveActiveSessionToStorage() {
    let session: SessionData = {
      character : this.activeProfile,
      startTime : this.activeSessionStartTime,
      endTime : getTimestamp(),
      rolls : this.activeSessionRolls,
      combats : this.activeSessionCombats
    }
    this.sessions = [session, ...this.sessions];
    this.storage.set('sessions', this.sessions).subscribe(() => {});

    this.activeSessionStartTime = "";
    this.activeSessionRolls = [];
    this.activeSessionCombats = [];

    console.log("Saved active session to storage.");
    console.log(session);
  }

  constructor(private storage: StorageMap) {
    this.loadProfilesFromStorage();
    this.loadSessionsFromStorage();
  }

}
