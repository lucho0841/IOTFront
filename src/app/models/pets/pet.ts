import {Feeder} from "../feeder/feeder";

export interface Pet {
  id: number;
  name: string;
  weight: string;
  species: string;
  feeder: Feeder | undefined;
}
