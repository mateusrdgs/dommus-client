import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SocketIoService } from './../../../../../services/socket-io/socket-io.service';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.styl']
})
export class TaskFormComponent implements OnInit {

  taskForm: FormGroup;

  constructor(
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
    const _id = '59d251db07c24b12852d1bde';
    if (this.taskForm.valid) {
      const { date, hour, state } = this.taskForm.value,
            [day, month, year] = date.replace(/-/g, '/').split('/').reverse(),
            datetime = this.extractDate(`${[month, day, year].join('/')},${hour}`),
            now = this.extractDate(new Date().toLocaleString()),
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
            this.returnParsedInteger(splittedTime[1]));
    return dt;
  }

  returnParsedInteger(number: string) {
    return parseInt(number.trim(), 10);
  }

}
