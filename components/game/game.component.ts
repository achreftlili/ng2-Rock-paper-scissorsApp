import { Component, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from 'ng2-redux';
import { rootReducer, enhancers } from '../../store/index';
import { GameActions } from '../../actions/game.actions';
import { IAppState } from '../../store';

@Component({
  selector: 'game',
  templateUrl: './components/game/game.component.html' ,
  providers: [ GameActions ],
  styleUrls: ['./components/game/game.component.css']
})
export class GameComponent {
  gameResult:String = '';
  MachineVSMachine:Boolean = true;
  @select('game') game$: Observable<Object>;
  private randomizeResults = new Array();

  constructor(public gameActions: GameActions,private ngRedux: NgRedux<IAppState>) {}

  startGame(playerOne, playerTwo) {
    this.gameResult="";
    this.randomizeResults = new Array();
    if(this.MachineVSMachine){
      playerOne.startRondomize();
    }
		playerTwo.startRondomize();
	}

  setChoice(playerOne, choice) {
		playerOne.setChoice(choice);
	}

  toggleGameType() {
		this.MachineVSMachine = !this.MachineVSMachine;
	}

  choiceSelected(playerResult) {
    this.randomizeResults.push(playerResult);
    if (this.randomizeResults.length == 2) {
      this.gameResult = this.calculateWinner();
    }
  }

  calculateWinner() {
		if (this.randomizeResults[0].value == this.randomizeResults[1].value) {
			return "it's a draw !";
		}
		if(((this.randomizeResults[0].value == "rock") && (this.randomizeResults[1].value == "scissors"))
			|| ((this.randomizeResults[0].value == "scissors") && (this.randomizeResults[1].value == "paper"))
			|| ((this.randomizeResults[0].value == "paper") && (this.randomizeResults[1].value == "rock"))) {
      this.incrementPlayer(this.randomizeResults[0].player);
      return this.randomizeResults[0].player + " wins !!!";
		}
      this.incrementPlayer(this.randomizeResults[1].player);
		return this.randomizeResults[1].player + " wins !!!";
	}

  private incrementPlayer(number) {
    if (number == "One") {
      this.gameActions.incrementPlayer1();
    }else if(number == "Two"){
      this.gameActions.incrementPlayer2();
    }
  }

	private resetGame(playerOne,playerTwo) {
    this.gameResult="";
    this.MachineVSMachine=true;
    this.randomizeResults = new Array();
    this.gameActions.resetGame();
    playerOne.init();
    playerTwo.init();
	}

}
