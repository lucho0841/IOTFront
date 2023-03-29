import {Feeder} from "../feeder/feeder";
import {Schedule} from "../schedule/schedule";

export interface Pet {
  id: number;
  name: string;
  weight: string;
  species: string;
  feeder: Feeder | undefined;
  schedule?: Schedule;
}
