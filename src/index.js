/* eslint-disable import/prefer-default-export */
import { createGameForm, typeText } from './domchanges';
import './style.css';

const message = 'Welcome to the battle station, Captain! Please select your opponent and prepare for battle!';
typeText(0, message, createGameForm);
