import { combineReducers } from 'redux';
const persistState = require('redux-localstorage');
import { gameReducer } from './game.reducer';

export class IAppState {
  player1?: number;
  player2?: number;
};

export const INITIAL_STATE: IAppState = {
  player1: 0,
  player2: 0,
};

export const rootReducer = combineReducers<IAppState>({
  game: gameReducer,
});

export const enhancers = [
  persistState('game', { key: 'ng2-redux-game' })
];
