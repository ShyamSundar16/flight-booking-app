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
  showUpdateScheduleForm: boolean = false;
  schedules: Schedule[] = [];
  constructor(public scheduleService: ScheduleService,private router: Router) {
    
    this.updateScheduleForm = new FormGroup({
      id: new FormControl(0, [Validators.required]),
      code: new FormControl("", [Validators.required]),
      arrivalTime: new FormControl("", [Validators.required]),
      depatureTime: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required])
    })

    this.getSchedule();
   }

  ngOnInit(): void {
  }

  showUpdateForm(schedule: Schedule) {
    this.updateScheduleForm.setValue(schedule)
    this.showUpdateScheduleForm = true;
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
}
