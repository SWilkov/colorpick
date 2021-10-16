import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cp-clear-button',
  templateUrl: './clear-button.component.html',
  styleUrls: ['./clear-button.component.scss']
})
export class ClearButtonComponent implements OnInit {
  @Output() clearEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  clear(): void {
    this.clearEvent.emit();
  }
}
