import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Schedule } from 'src/app/models/Schedule';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-manageschedule',
  templateUrl: './manageschedule.component.html',
  styleUrls: ['./manageschedule.component.scss']
})
export class ManagescheduleComponent implements OnInit {
  updateScheduleForm: FormGroup;
  addScheduleForm: FormGroup;
  showUpdateScheduleForm: boolean = false;
  showAddScheduleForm: boolean = false;
  schedules: Schedule[] = [];
  constructor(public scheduleService: ScheduleService, private router: Router) {


    this.addScheduleForm = new FormGroup({
      code: new FormControl("", [Validators.required]),
      scheduledDate: new FormControl("", [Validators.required]),
      arrivalTime: new FormControl("", [Validators.required]),
      departureTime: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required]),
      availableEconomyTickets: new FormControl(0, [Validators.required]),
      availableBusinessTickets: new FormControl(0, [Validators.required]),
    })

    this.updateScheduleForm = new FormGroup({
      id: new FormControl(0, [Validators.required]),
      code: new FormControl("", [Validators.required]),
      scheduledDate: new FormControl("", [Validators.required]),
      arrivalTime: new FormControl("", [Validators.required]),
      departureTime: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required]),
      availableEconomyTickets: new FormControl(0, [Validators.required]),
      availableBusinessTickets: new FormControl(0, [Validators.required]),
    })

    this.getSchedule();
  }

  ngOnInit(): void {
  }

  showUpdateForm(schedule: Schedule) {
    this.updateScheduleForm.setValue(schedule)
    this.showUpdateScheduleForm = true;
  }

  showAddForm() {
    this.showAddScheduleForm = true;
  }

  cancelAddForm() {
    this.showAddScheduleForm = false;
  }
  cancelUpdateForm() {
    this.showUpdateScheduleForm = false;
  }

  getSchedule() {
    this.scheduleService.getScheduleInfo()
      .subscribe((res: any) => {
        this.schedules = res;
      })
  }


  modifySchedule() {
    this.scheduleService.updateSchedule(this.updateScheduleForm.value)
      .subscribe((res: any) => {
        this.showUpdateScheduleForm = false;
        this.getSchedule()
      });
  }

  addSchedule() {
    let addData: Schedule = this.addScheduleForm.value;
    this.scheduleService.saveSchedule(this.addScheduleForm.value)
      .subscribe((res: any) => {
        this.addScheduleForm.reset();
        this.showAddScheduleForm = false;
        this.getSchedule();
      });
  }

  deleteSchdeuleById(id: string) {
    this.scheduleService.deleteSchedule(id)
      .subscribe((res: any) => {
        this.getSchedule()
      });
  }
}
