import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SocketIoService } from './../../../../../services/socket-io/socket-io.service';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.styl'],
  providers: [DatePipe]
})
export class TaskFormComponent implements OnInit {

  taskForm: FormGroup;

  constructor(
    private _datePipe: DatePipe,
    private _formBuilder: FormBuilder,
    private _socketIoService: SocketIoService
  ) { }

  ngOnInit() {
    this.createTaskForm();
  }

  createTaskForm() {
    this.taskForm = this._formBuilder.group({
      date: ['', Validators.required],
      hour: ['', Validators.required],
      state: [false, Validators.required]
    });
  }

  onSubmit() {
    const _id = '59f334db70afde1063a2fdd4';
    if (this.taskForm.valid) {
      const { date, hour, state } = this.taskForm.value,
            [day, month, year] = date.replace(/-/g, '/').split('/').reverse(),
            datetime = this.extractDate(`${[month, day, year].join('/')},${hour}`),
            shortDateNow = this._datePipe.transform(new Date(), 'shortDate'),
            formattedHours = this.convert12HoursTo24Hours(this._datePipe.transform(new Date(), 'mediumTime')),
            now = this.extractDate(`${shortDateNow},${formattedHours}`),
            milliseconds = datetime.getTime() - now.getTime();
      this._socketIoService.emitMessage('create:Task', { _id, state, milliseconds });
    }
  }

  extractDate(datetime: string) {
    const [date, time ] = datetime.split(','),
          splittedDate = date.split('/'),
          splittedTime = time.split(':'),
          dt = new Date(
            this.returnParsedInteger(splittedDate[2]),
            this.returnParsedInteger(splittedDate[0]) - 1,
            this.returnParsedInteger(splittedDate[1]),
            this.returnParsedInteger(splittedTime[0]),
            this.returnParsedInteger(splittedTime[1]),
            this.returnParsedInteger(splittedTime[2] || '0'));
    return dt;
  }

  returnParsedInteger(number: string) {
    return parseInt(number.trim(), 10);
  }

  convert12HoursTo24Hours(time: string) {
    const spaceSplit = time.split(' '),
          colonSplit = spaceSplit[0].split(':'),
          initials = spaceSplit[1];
    colonSplit[0] = initials === 'PM' ? (this.returnParsedInteger(colonSplit[0]) + 12).toString() : colonSplit[0];
    return colonSplit.join(':');
  }

}
