import { Component, OnInit } from '@angular/core';

import { SocketIoService } from './../../../../shared/services/socket-io/socket-io.service';
import { TopBarEmitter } from './../../../../shared/emitters/top-bar.emitter';

import Task from '../../class/task';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.styl']
})
export class TasksComponent implements OnInit {

  constructor(
    private _socketIoService: SocketIoService,
    private _topbarEmitter: TopBarEmitter
  ) { }

  headers = ['Id', 'Data', 'Estado/Posição', 'Componente', 'Status'];
  tasks: Task[];

  ngOnInit() {
    this._topbarEmitter.emitNewRouteTitle('Tasks');
    this._socketIoService
        .emitMessage('tasks:Get', null, (tasks) => {
          this.tasks = this.iterateOverTasks(tasks);
          console.log(this.tasks);
        });
  }

  iterateOverTasks(tasks): Task[] {
    return tasks.map(task => {
      const { id, milliseconds, state, position, status, target } = task;
      return new Task(target, milliseconds, (state ? state : position), target, status);
    });
  }

}
