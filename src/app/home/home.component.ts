import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { AppService } from '../app.service';
import { SelectProfileComponent } from '../select-profile/select-profile.component';
import { SessionData } from '../session-data';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profiles: string[] = [];

  currentProfile: string = "";
  sessionsByProfile: SessionData[] = [];

  changeProfileButtonText = "Change Profile";

  constructor(private profileDialog: MatDialog, private appService: AppService) { }

  openProfileSelect() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.profileDialog.open(SelectProfileComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => { 
        this.profiles = this.appService.getProfiles();
        this.currentProfile = this.profiles[0];
        this.sessionsByProfile = this.appService.getSessionsByProfile(this.currentProfile);
        this.changeProfileButtonText = "Change Profile";
      }
    );  
  }

  ngOnInit(): void {
    this.profiles = this.appService.getProfiles();
    if (this.profiles.length != 0) {
      this.currentProfile = this.profiles[0];
      this.sessionsByProfile = this.appService.getSessionsByProfile(this.currentProfile);
    } else
      this.changeProfileButtonText = "Add Profile";
  }

}
