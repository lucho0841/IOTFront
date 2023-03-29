import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
  feederList!: Feeder[];

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
    Promise.all([this.feederService.getAllFeederList(), this.scheduleService.getSchedule(pet?.id || 0)])
      .then(answer => {
        this.feederList = answer[0];
        if (pet) pet.schedule = answer[1];
        this.buildForm();
      });
  }

  save(): void {
    try {
      this.validateForm();
    } catch (error) {
      UtilAlert.error({title: error.message});
      return;
    }

    const pet: Pet = this.buildPet();
    if (pet.id > 0) this.update(pet);
    else this.create(pet);
  }

  private create(pet: Pet): void {
    this.petService.create(pet).then(answer => {
      if (pet.schedule) {
        this.scheduleService.save(this.buildSchedule()).then(shedule => {
          answer.schedule = shedule;
          this.sendPet(answer);
          UtilAlert.success({title: 'Mascota y horario creado correctamente'});
          return;
        });
      }
      this.sendPet(answer);
      UtilAlert.success({title: 'Creado correctamente'});
    });
  }

  private update(pet: Pet): void {
    this.petService.update(pet).then(answer => {
      if (pet.schedule) {
        this.scheduleService.save(this.buildSchedule()).then(shedule => {
          answer.schedule = shedule;
          this.sendPet(answer);
          UtilAlert.success({title: 'Mascota y horario editado correctamente'});
          return;
        });
      }
      this.sendPet(answer);
      UtilAlert.success({title: 'Editado correctamente'});
    });
  }

  validateForm(): void {
    if (!this.form.valid) throw new Error('Formulario inválido');
    if (this.form.pristine) throw new Error('Aún no se detectaron cambios');
  }

  sendPet(pet: Pet): void {
    console.log(pet);
    this.dialogRef.close(pet);
  }

  buildForm(): void {
    const pet = this.petService.getPet();
    const scheduleControlList = this.formBuilder.array([]);
    pet?.schedule?.scheduleList.forEach(time => scheduleControlList.push(new FormControl(time)));

    this.form = this.formBuilder.group(pet ? {
      id: [pet.id, [Validators.required]],
      name: [pet.name, [Validators.required]],
      weight: [pet.weight, [Validators.required]],
      species: [pet.species, [Validators.required]],
      feederId: pet.feeder?.id,
      scheduleList: scheduleControlList
    } : {
      id: [0, [Validators.required]],
      name: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      species: ['', [Validators.required]],
      feederId: undefined,
      scheduleList: this.formBuilder.array([])
    });
  }

  addSchedule() {
    this.scheduleList.push(this.formBuilder.control(''));
  }

  removeSchedule(index: number) {
    this.scheduleList.removeAt(index);
    this.form.markAsDirty();
  }

  get scheduleList(): FormArray {
    return this.form.get('scheduleList') as FormArray;
  }

  private buildPet(): Pet {
    return {
      id: this.form.value.id,
      name: this.form.value.name,
      weight: this.form.value.weight,
      species: this.form.value.species,
      feeder: this.feederList.find(feeder => feeder.id === this.form.value.feederId),
      schedule: this.buildSchedule()
    };
  }

  private buildSchedule(): Schedule {
    return {
      petId: this.form.value.id,
      scheduleList: this.form.value.scheduleList
    }
  }

}
