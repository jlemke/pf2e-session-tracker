import { Component, OnInit } from '@angular/core';
import { CombatData, getTimestamp, RollData, SessionData } from '../session-data';
import { AppService } from '../app.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  character: string;
  sessionStartTime: string;
  combats: CombatData[] = [];
  rolls: RollData[] = [];

  inCombat: boolean = false;
  combatStartTime = "";
  combatRounds = 0;

  constructor(private appService: AppService) {
    this.character = this.appService.getSelectedProfile(),
    this.sessionStartTime = getTimestamp();
   }

  ngOnInit(): void {

  }

  startCombat() {
    this.inCombat = true;
    this.combatRounds = 0;
    this.combatStartTime = getTimestamp();
    console.log(this.combatStartTime);
  }

  nextTurn() {
    this.combatRounds += 1;
  }

  endCombat() {
    this.inCombat = false;
    let newCombat: CombatData = {
      startTime : this.combatStartTime,
      endTime : getTimestamp(),
      rounds : this.combatRounds
    }
    this.combats.push(newCombat);
  }

  endSession() {
    let session: SessionData = {
      character : this.character,
      startTime : this.sessionStartTime,
      endTime : getTimestamp(),
      combats : this.combats,
      rolls : this.rolls
    }
    this.appService.saveSession(session);
    
  }

}
