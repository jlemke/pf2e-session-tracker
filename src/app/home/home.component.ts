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

  currentProfile: string = "No Profiles";

  constructor(private profileDialog: MatDialog, private profileService: ProfileService) { }

  openProfileSelect() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    //this.profileDialog.open(SelectProfileComponent, dialogConfig);

    const dialogRef = this.profileDialog.open(SelectProfileComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => { 
        this.profiles = this.profileService.getProfiles();
        this.currentProfile = this.profiles[0];
      }
    );  
  }

  ngOnInit(): void {
    //TODO add case for no exisiting profiles found
    this.profiles = this.profileService.getProfiles();
    this.currentProfile = this.profiles[0];
  }

}
