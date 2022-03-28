import { Component, OnInit } from '@angular/core';
import { PROFILES } from '../sample-session-data';

@Component({
  selector: 'app-select-profile',
  templateUrl: './select-profile.component.html',
  styleUrls: ['./select-profile.component.css']
})
export class SelectProfileComponent implements OnInit {

  profiles = PROFILES;
  
  constructor() { }

  ngOnInit(): void {
  }

}
