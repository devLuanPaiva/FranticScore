import { EStateGame } from './model/EStateGame.enum';
import { IGames } from './model/IGames.interface';
import { IGamesRepository } from './model/IGamesRepository';

import Game from "./model/Game.class";

export type { IGamesRepository, IGames, EStateGame };
export { Game };