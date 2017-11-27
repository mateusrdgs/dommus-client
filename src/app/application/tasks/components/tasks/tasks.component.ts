import { Component, OnInit } from '@angular/core';

import { SocketIoService } from './../../../../shared/services/socket-io/socket-io.service';
import { TopBarEmitter } from './../../../../shared/emitters/top-bar.emitter';

import Task from '../../../../shared/classes/task';

import { viewAnimation } from '../../../../shared/animations/view.animation';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.styl'],
  animations: [viewAnimation],
  host: { '[@viewAnimation]': '' }
})
export class TasksComponent implements OnInit {

  constructor(
    private _socketIoService: SocketIoService,
    private _topbarEmitter: TopBarEmitter
  ) { }

  headers = ['Id', 'Data', 'Valor', 'Componente', 'Status'];
  tasks: any;

  ngOnInit() {
    this._topbarEmitter.emitNewRouteTitle('Tarefas');
    this._socketIoService
        .emitMessage('tasks:Get', null, (tasks) => {
          this.tasks = this.iterateOverTasks(tasks)
                           .map(task => {
                             const { Id, Date, ValueDescription, Component, StatusDescription } = task;
                             return { Id, Date, ValueDescription, Component: Component['description'], StatusDescription };
                            });
        });
  }

  iterateOverTasks(tasks = []): Task[] {
    return tasks.map(task => {
      const { component, date, milliseconds, value, id, status } = task;
      return new Task(component, date, milliseconds, value, id, status);
    });
  }

}
