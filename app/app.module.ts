import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {NgReduxModule, DevToolsExtension} from 'ng2-redux';
import { App } from './app.component';
import { GameComponent } from '../components/game/game.component';
import { PlayerComponent } from '../components/player/player.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    NgReduxModule.forRoot(),
    FormsModule,
  ],
  declarations: [
    App,
    GameComponent,
    PlayerComponent,
  ],
  bootstrap: [ App ],
  providers: [
    DevToolsExtension,
  ]
})
export class AppModule {}
