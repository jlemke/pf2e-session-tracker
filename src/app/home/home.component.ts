import { Component, OnInit } from '@angular/core';
import { PROFILES } from '../sample-session-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentProfile = PROFILES[0];

  constructor() { }

  ngOnInit(): void {
    // TODO get list of profiles and currently selected profile
  }

}
