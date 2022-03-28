import { Injectable } from '@angular/core';
import { SessionData } from './session-data';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  currentProfile: string = "_NO PROFILE_";

  currentSession: SessionData;

  function startSession() {
    currentSession = {
      character: currentProfile,
      startTime: "",
      endTime: "NONE", 
      combats: [],
      rolls: []
    }
  }

  constructor() { }

}
