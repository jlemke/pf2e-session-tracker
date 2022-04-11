import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AppService } from '../app.service';

@Component({
  selector: 'app-select-profile',
  templateUrl: './select-profile.component.html',
  styleUrls: ['./select-profile.component.css']
})
export class SelectProfileComponent implements OnInit {

  profiles: string[] = [];

  selectedProfile: string = "";

  newProfile: string = "";

  constructor(private appService: AppService, 
    private dialogRef: MatDialogRef<SelectProfileComponent>) { }

  ngOnInit(): void {
    this.profiles = this.appService.getProfiles();
    if (this.profiles)
      this.selectedProfile = this.profiles[0];
  }

  cancel(): void {
    this.dialogRef.close();
  }

  done(selection: string): void {
    this.appService.selectProfile(selection);
    this.dialogRef.close();
  }

}
