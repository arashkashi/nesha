import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';


@Component({
  selector: 'app-top-bar',
  templateUrl: './app-top-bar.component.html',
  styleUrls: ['./app-top-bar.component.css']
})
export class AppTopBarComponent implements OnInit {
  env = environment;

  constructor() { }

  ngOnInit(): void {
  }

}
