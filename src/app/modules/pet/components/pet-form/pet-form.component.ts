import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Pet} from "../../../../models/pets/pet";
import {PetService} from "../../../../services/pet/pet.service";
import {MatDialogRef} from "@angular/material/dialog";
import {UtilAlert} from "../../../../util/util-alert";
import {Feeder} from "../../../../models/feeder/feeder";
import {FeederService} from "../../../../services/feeder/feeder.service";
import {Schedule} from "../../../../models/schedule/schedule";
import {ScheduleService} from "../../../../services/schedule/schedule.service";

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.scss']
})
export class PetFormComponent implements OnInit {

  form!: FormGroup;
  feederList: Feeder[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private petService: PetService,
    private dialogRef: MatDialogRef<any>,
    private feederService: FeederService,
    private scheduleService: ScheduleService
  ) {
  }

  ngOnInit(): void {
    const pet: Pet | undefined = this.petService.getPet();
    this.buildForm();
    Promise.all([this.feederService.getAllFeederList(), this.scheduleService.getAllScheduleList(pet?.id || 0)])
      .then(answer => {
        this.feederList = answer[0];
        if (pet) pet.scheduleList = answer[1];
        this.buildForm();
      });
  }

  async save(): Promise<void> {
    try {
      this.validateForm();
    } catch (error) {
      UtilAlert.error({title: error.message});
      return;
    }

    const pet: Pet = this.buildPet();
    if (pet.id > 0) await this.update(pet);
    else await this.create(pet);
  }

  validateForm(): void {
    if (!this.form.valid) throw new Error('Formulario inválido');
    if (this.form.pristine) throw new Error('Aún no se detectaron cambios');
  }

  sendPet(pet: Pet): void {
    this.dialogRef.close(pet);
  }

  buildForm(): void {
    const pet = this.petService.getPet();

    if (pet) {
      this.form = this.formBuilder.group({
        id: [pet.id, [Validators.required]],
        name: [pet.name, [Validators.required]],
        weight: [pet.weight, [Validators.required]],
        species: [pet.species, [Validators.required]],
        feederId: pet.feeder?.id,
        scheduleList: this.formBuilder.array([])
      });
      pet.scheduleList?.forEach(schedule => this.addSchedule(schedule));
    } else {
      this.form = this.formBuilder.group({
        id: [0, [Validators.required]],
        name: ['', [Validators.required]],
        weight: ['', [Validators.required]],
        species: ['', [Validators.required]],
        feederId: undefined,
        scheduleList: this.formBuilder.array([])
      });
    }
  }

  addSchedule(schedule?: Schedule) {
    if (schedule) {
      this.scheduleListFA.push(this.formBuilder.group({
        id: schedule.id,
        time: [schedule.time, Validators.required],
        portion: [schedule.portion, Validators.required],
        pet: [schedule.pet, Validators.required]
      }));
    } else {
      this.scheduleListFA.push(this.formBuilder.group({
        id: '',
        time: ['', Validators.required],
        portion: ['', Validators.required],
        pet: undefined
      }));
    }
  }

  removeSchedule(index: number) {
    this.scheduleListFA.removeAt(index);
    this.scheduleListFA.markAsDirty();
  }

  private async create(pet: Pet): Promise<void> {
    const createdPet: Pet = await this.petService.create(pet);
    if (this.scheduleListFA.dirty && this.buildScheduleList().length > 0) {
      this.setPetInScheduleListFA(createdPet);
      this.scheduleService.save(this.buildScheduleList()).then(sheduleList => {
        createdPet.scheduleList = sheduleList;
        this.sendPet(createdPet);
        UtilAlert.success({title: 'Mascota y horario creados correctamente'});
      });
    } else {
      this.sendPet(createdPet);
      UtilAlert.success({title: 'Mascota creada correctamente'});
    }
  }

  private async update(pet: Pet): Promise<void> {
    const updatedPet: Pet = await this.petService.update(pet);
    if (this.scheduleListFA.dirty) {
      if (this.buildScheduleList().length > 0) {
        this.setPetInScheduleListFA(updatedPet);
        this.scheduleService.save(this.buildScheduleList()).then(sheduleList => {
          updatedPet.scheduleList = sheduleList;
          this.sendPet(updatedPet);
          UtilAlert.success({title: 'Mascota y horario editados correctamente'});
        });
      } else {
        await this.scheduleService.deleteAllBy(updatedPet.id);
        updatedPet.scheduleList = [];
        this.sendPet(updatedPet);
        UtilAlert.success({title: 'Mascota y horario editados correctamente'});
      }
    } else {
      this.sendPet(updatedPet);
      UtilAlert.success({title: 'Mascota editada correctamente'});
    }
  }

  private setPetInScheduleListFA(pet: Pet): void {
    this.scheduleListFA.controls.forEach(scheduleControl =>
      scheduleControl.get('pet')?.setValue(pet));
  }

  private buildPet(): Pet {
    return {
      id: this.form.value.id,
      name: this.form.value.name,
      weight: this.form.value.weight,
      species: this.form.value.species,
      feeder: this.feederList.find(feeder => feeder.id === this.form.value.feederId),
      scheduleList: this.buildScheduleList()
    };
  }

  private buildScheduleList(): Schedule[] {
    return this.form.value.scheduleList;
  }

  get scheduleListFA(): FormArray {
    return this.form.get('scheduleList') as FormArray;
  }

}
