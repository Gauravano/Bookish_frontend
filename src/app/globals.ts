import { User} from './user';
import { Injectable } from '@angular/core';

@Injectable()

export class Globals {
  current_user: User = undefined;
}
