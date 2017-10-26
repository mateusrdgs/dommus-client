import { Component, ContentChildren, AfterViewInit, Input, QueryList, ViewChild, ContentChild, Output, EventEmitter } from '@angular/core';
import { ModalBodyDirective } from './../../directives/modal-body.directive';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.styl']
})
export class ModalComponent implements AfterViewInit {
  @ContentChild(ModalBodyDirective) item;
  @Input() headerTitle: string;
  @Input() openModal: boolean;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngAfterViewInit() {

  }

  onCloseModal(event) {
    this.closeModal.emit(false);
  }

}
