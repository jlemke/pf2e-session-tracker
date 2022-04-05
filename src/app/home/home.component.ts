import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { ProfileService } from '../profile.service';
import { SelectProfileComponent } from '../select-profile/select-profile.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profiles: string[] = [];

  currentProfile: string = "";

  changeProfileButtonText = "Change Profile";

  constructor(private profileDialog: MatDialog, private profileService: ProfileService) { }

  openProfileSelect() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.profileDialog.open(SelectProfileComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => { 
        this.profiles = this.profileService.getProfiles();
        this.currentProfile = this.profiles[0];
        this.changeProfileButtonText = "Change Profile";
      }
    );  
  }

  ngOnInit(): void {
    //TODO add case for no exisiting profiles found
    this.profiles = this.profileService.getProfiles();
    if (this.profiles.length != 0)
      this.currentProfile = this.profiles[0];
    else
      this.changeProfileButtonText = "Add Profile";
  }

}
