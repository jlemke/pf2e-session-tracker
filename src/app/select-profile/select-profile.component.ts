import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-select-profile',
  templateUrl: './select-profile.component.html',
  styleUrls: ['./select-profile.component.css']
})
export class SelectProfileComponent implements OnInit {

  profiles: string[] = [];

  selectedProfile: string = "";

  newProfile: string = "";

  constructor(private profileService: ProfileService, 
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<SelectProfileComponent>) { }

  ngOnInit(): void {
    this.profiles = this.profileService.getProfiles();
    if (this.profiles)
      this.selectedProfile = this.profiles[0];
  }

  cancel(): void {
    this.dialogRef.close();
  }

  done(selection: string): void {
    this.profileService.selectProfile(selection);
    this.dialogRef.close();
  }

}
