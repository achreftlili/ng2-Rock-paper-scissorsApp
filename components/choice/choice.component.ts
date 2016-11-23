import { Component,  Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from 'ng2-redux';

@Component({
  selector: 'player',
  templateUrl: './components/player/player.component.html' ,
  styleUrls: ['./components/player/player.component.css']
})
export class PlayerComponent {
  @Input() playerColor:string;
  @Input() playerClass:string;
  public randomChoice = "rock";

  constructor() {
  }
  startRondomize() {
		var choices = ["rock", "paper", "scissors"];
		var interval = setInterval(
			() => {
					var randomIndex = Math.floor(Math.random() * 3);
					this.randomChoice = choices[randomIndex];
			},
			100
		);
	}
}
