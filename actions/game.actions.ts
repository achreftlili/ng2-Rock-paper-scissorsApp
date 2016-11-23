import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';

@Injectable()
export class GameActions {
  constructor (private ngRedux: NgRedux<IAppState>) {}

  static INCREMENT_PLAYER1: string = 'INCREMENT_PLAYER1';
  static INCREMENT_PLAYER2: string = 'INCREMENT_PLAYER2';
  static RESET_GAME: string = 'RESET_GAME';
  //Increment the player1 score
  incrementPlayer1(): void {
    this.ngRedux.dispatch({ type: GameActions.INCREMENT_PLAYER1 });
  }
  //Increment the player2 score
  incrementPlayer2(): void {
    this.ngRedux.dispatch({ type: GameActions.INCREMENT_PLAYER2 });
  }
  //Reset the players scores
  resetGame( ): void {
    this.ngRedux.dispatch({ type: GameActions.RESET_GAME });
  }
}
//Interface of the Game Actions
export interface IGameAction {
  type: string;
}
