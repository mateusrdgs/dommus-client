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

   tasks: Task[];

  constructor(
    private _socketIoService: SocketIoService,
    private _topbarEmitter: TopBarEmitter
  ) { }

  ngOnInit() {
    this._topbarEmitter.emitNewRouteTitle('Tasks');
    this._socketIoService
        .emitMessage('tasks:Get', null, (tasks) => {
          console.log(tasks);
        });
  }

}
