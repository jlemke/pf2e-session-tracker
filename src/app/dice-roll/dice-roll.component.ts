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
  NUMPAD = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  checkType: string = "";
  dieRoll: string = "";
  checkResult: string = "";
  

  constructor(private appService: AppService, 
    private dialogRef: MatDialogRef<DiceRollComponent>) { }

  ngOnInit(): void {
  }

  /**  Ensures dieroll input box only ever contains an integer value from 1 to 20
   * 
   * @param event Event data from keyboard key pressed in input box
   * @returns true if valid input, otherwise prevents input from processing
   */
  validateNumpadInput(event: any){
    let charCode = (event.which) ? event.which : event.keyCode;

    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else if (charCode == 48 && this.dieRoll != "1" && this.dieRoll != "2") {
      event.preventDefault();
      return false;
    } else {
      if (this.dieRoll == "2" && charCode == 48)
        return true;
      else if (this.dieRoll != "1")
        this.dieRoll = "";
      return true;
    }
  }

  addNumber(n: string) {
    if (n == "0") {
      if (this.dieRoll == "1" || this.dieRoll == "2")
        this.dieRoll += "0";
      else
        this.dieRoll = "1"; // can't have a 0 so it defaults to 1
    } else {
      if (this.dieRoll == "1")
        this.dieRoll += n;
      else
        this.dieRoll = n;
    }
  }

  deleteNumber() {
    if (this.dieRoll.length > 0)
      this.dieRoll = this.dieRoll.substring(0, this.dieRoll.length - 1);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  done(): void {
    let d = parseInt(this.dieRoll);
    let roll: RollData = {
      time : getTimestamp(),
      dieRoll : d,
      checkResult : this.checkResult[0], //Not sure why these are arrays... ???
      checkType : this.checkType[0]
    }
    this.appService.addRoll(roll);
    this.dialogRef.close();
  }

}