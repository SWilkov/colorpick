import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'cp-minimal-input',
  templateUrl: './minimal-input.component.html',
  styleUrls: ['./minimal-input.component.scss']
})
export class MinimalInputComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('textInput') input: ElementRef;

  @Input() placeholderText: string = '';
  @Output() textChangedEvent: EventEmitter<string> = new EventEmitter<string>();
  searchText: string; 
  readonly: boolean = false;
  keyupSubscription: Subscription;
  useInputEvent: boolean = true;
  min: number = 5;
  max: number = 10;

  constructor() { }

  ngOnInit(): void {    
  }

  ngAfterViewInit(): void {
    if (this.useInputEvent) {
      this.keyupSubscription = 
      fromEvent<KeyboardEvent>(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged()        
      ).subscribe(e => {
        if (this.searchText.length > this.min && this.searchText.length < this.max) {
          console.log(this.searchText);
          this.textChangedEvent.emit(this.searchText);
        }
      });
    }
  }  

  onClearText(data: any): void {
    this.searchText = '';
    this.input.nativeElement.focus();
  }

  ngOnDestroy(): void {
    if (this.keyupSubscription) {
      this.keyupSubscription.unsubscribe();
    }
  }
}
