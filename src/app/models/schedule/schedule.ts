import {Time} from "@angular/common";
import {Pet} from "../pets/pet";

export interface Schedule {
  id: number;
  time: Time;
  portion: number;
  pet: Pet;
}
