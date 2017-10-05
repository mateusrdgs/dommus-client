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
            [ hours, mins ] = hour.split(':'),
            now = Date.now(),
            time = new Date(date).setHours(parseInt(hours, 10), parseInt(mins, 10));
      this._socketIoService.emitMessage('create:Task', { _id, state, milliseconds: 2000 });
    }
  }

}
