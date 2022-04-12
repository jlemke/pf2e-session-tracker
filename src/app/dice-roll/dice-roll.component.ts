import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AppService } from '../app.service';
import { animate, state, style, transition, trigger } from '@angular/animations'
import { CHECKTYPES } from '../session-data';

@Component({
  selector: 'app-dice-roll',
  templateUrl: './dice-roll.component.html',
  styleUrls: ['./dice-roll.component.css'],
  animations: [
    trigger('slide', [
      state('left', style({ transform: 'translateX(0)' })),
      state('right', style({ transform: 'translateX(-50%)' })),
      transition('* => *', animate(300))
  ])]
})
export class DiceRollComponent implements OnInit {

  @Input() activePane: PaneType = 0;

  checkTypes = CHECKTYPES;

  constructor(private appService: AppService, 
    private dialogRef: MatDialogRef<DiceRollComponent>) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  done(selection: string): void {
    this.appService.selectProfile(selection);
    this.dialogRef.close();
  }

}

type PaneType = 0 | 1;