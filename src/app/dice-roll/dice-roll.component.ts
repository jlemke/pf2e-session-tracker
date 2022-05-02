import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AppService } from '../app.service';
import { animate, state, style, transition, trigger } from '@angular/animations'
import { CHECKTYPES, getTimestamp, RESULTS, RollData } from '../session-data';

@Component({
  selector: 'app-dice-roll',
  templateUrl: './dice-roll.component.html',
  styleUrls: ['./dice-roll.component.css']
})
export class DiceRollComponent implements OnInit {

  CHECKTYPES = CHECKTYPES;
  RESULTS = RESULTS;

  checkType: string = "";
  dieRoll: number = 0;
  checkResult: string = "";
  

  constructor(private appService: AppService, 
    private dialogRef: MatDialogRef<DiceRollComponent>) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  done(): void {
    let roll: RollData = {
      time : getTimestamp(),
      dieRoll : this.dieRoll,
      checkResult : this.checkResult[0], //Not sure why these are arrays... ???
      checkType : this.checkType[0]
    }
    this.appService.addRoll(roll);
    this.dialogRef.close();
  }

}