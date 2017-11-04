import { Component, OnInit } from '@angular/core';

import { SocketIoService } from './../../../../shared/services/socket-io/socket-io.service';
import { TopBarEmitter } from './../../../../shared/emitters/top-bar.emitter';

import Task from '../../../../shared/classes/task';


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

  headers = ['Id', 'Data', 'Valor', 'Componente', 'Status'];
  tasks: any;

  ngOnInit() {
    this._topbarEmitter.emitNewRouteTitle('Tasks');
    this._socketIoService
        .emitMessage('tasks:Get', null, (tasks) => {
          this.tasks = this.iterateOverTasks(tasks)
                           .map(task => {
                             const { Id, Date, ValueDescription, Component, StatusDescription } = task;
                             return { Id, Date, ValueDescription, Component: Component['description'], StatusDescription };
                            });
        });
  }

  iterateOverTasks(tasks): Task[] {
    return tasks.map(task => {
      const { component, date, milliseconds, value, id, status } = task;
      return new Task(component, date, milliseconds, value, id, status);
    });
  }

}
