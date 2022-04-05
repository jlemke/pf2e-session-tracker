import { Injectable } from '@angular/core';
import { SessionData } from './session-data';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  currentProfile: string = "_NO PROFILE_";

  currentSession: SessionData = {
    character: this.currentProfile,
    startTime: "",
    endTime: "", 
    combats: [],
    rolls: []
  }

  startSession() {
    
  }

  constructor() { }

}
