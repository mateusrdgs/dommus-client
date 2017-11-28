import { Component, ContentChildren, AfterViewInit, Input, QueryList, ViewChild, ContentChild, Output, EventEmitter } from '@angular/core';
import { ModalBodyDirective } from './../../directives/modal-body.directive';

import { modalWrapperAnimation } from './../../animations/modal.wrapper.animation';
import { modalAnimation } from './../../animations/modal.animation';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.styl'],
  animations: [modalWrapperAnimation, modalAnimation]
})
export class ModalComponent {

  modalWrapperState = 'inactive';
  modalState = '';
  openedModal: boolean;
  @ContentChild(ModalBodyDirective) item;
  @Input() headerTitle: string;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Input() set openModal(value: boolean) {
    this.openedModal = value;
    this.modalWrapperState = value ? 'active' : 'inactive';
    this.modalState = value ? 'active' : 'inactive';
  }

  constructor() { }

  onCloseModal(event) {
    this.closeModal.emit(false);
  }

}
