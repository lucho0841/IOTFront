import {Feeder} from "../feeder/feeder";
import {Schedule} from "../schedule/schedule";

export interface Pet {
  id: number;
  name: string;
  weight: number;
  species: string;
  feeder: Feeder | undefined;
  scheduleList?: Schedule[];
}
