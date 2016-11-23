import { GameActions,IGameAction } from '../actions/game.actions';
import{ INITIAL_STATE,IAppState }from '../store';

export function gameReducer(  state: IAppState = INITIAL_STATE , action:IGameAction ): any {
  if (!state ) {
       return [];
   }
  switch (action.type) {
    case GameActions.INCREMENT_PLAYER1:
      state.player1 = state.player1 + 1;
      return state;
    case GameActions.INCREMENT_PLAYER2:
      state.player2 = state.player2 + 1;
      return state;
    case GameActions.RESET_GAME:
      state.player1 = 0;
      state.player2 = 0;
      return INITIAL_STATE;
    default:
      return state;
  }
}
