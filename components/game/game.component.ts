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
  //Select the game state from the store Asynchronously
  @select('game') game$: Observable<Object>;
  private randomizeResults = new Array();

  constructor(public gameActions: GameActions,private ngRedux: NgRedux<IAppState>) {}
  
  //Start the Game Methode as input the two players components
  startGame(playerOne, playerTwo) {
    this.gameResult="";
    this.randomizeResults = new Array();
    if(this.MachineVSMachine){
      playerOne.startRondomize();
    }
		playerTwo.startRondomize();
	}
  //Set the choice of the user in the Child componenet
  setChoice(playerOne, choice) {
		playerOne.setChoice(choice);
	}
  //Toggle the Game Types between MachineVSMachine and UserVSMachine
  toggleGameType() {
		this.MachineVSMachine = !this.MachineVSMachine;
	}
  //Set the choice of the User in our choicesArray=randomizeResults
  choiceSelected(playerResult) {
    this.randomizeResults.push(playerResult);
    if (this.randomizeResults.length == 2) {
      this.gameResult = this.calculateWinner();
    }
  }
  //Calculate the winner between the two users
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
  //Increment the score of users
  private incrementPlayer(number) {
    if (number == "One") {
      this.gameActions.incrementPlayer1();
    }else if(number == "Two"){
      this.gameActions.incrementPlayer2();
    }
  }
  //Reset the Game
	private resetGame(playerOne,playerTwo) {
    this.gameResult="";
    this.MachineVSMachine=true;
    this.randomizeResults = new Array();
    this.gameActions.resetGame();
    playerOne.init();
    playerTwo.init();
	}

}
