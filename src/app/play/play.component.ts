import { Component, OnInit } from '@angular/core';
import { CombatData } from '../session-data';
import { AppService } from '../app.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  profile: string = "";

  inCombat: boolean = false;

  turn = 0;

  combatStart: string = "";

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    let profiles = this.appService.getProfiles();
    this.profile = profiles[0];
  }

  startCombat() {
    this.inCombat = true;
    this.turn = 0;
    this.combatStart = new Date().toISOString();

    console.log(this.combatStart);
  }

  nextTurn() {
    this.turn += 1;
  }

  endCombat() {
    this.inCombat = false;
  }

}
