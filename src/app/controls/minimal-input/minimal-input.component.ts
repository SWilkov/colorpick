import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Theme } from 'src/app/models/theme.enum';
import { AppState } from 'src/app/reducers';
import * as themeSelectors from '../../selectors/theme.selector';
import * as hexActions from '../../actions/hex.actions';
@Component({
  selector: 'cp-minimal-input',
  templateUrl: './minimal-input.component.html',
  styleUrls: ['./minimal-input.component.scss']
})
export class MinimalInputComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('textInput') input: ElementRef;

  @Input() placeholderText: string = '';
  @Input() min: number = 5;
  @Input() max: number = 10;
  @Output() textChangedEvent: EventEmitter<string> = new EventEmitter<string>();
  theme$: Observable<Theme>;

  searchText: string; 
  readonly: boolean = false;
  keyupSubscription: Subscription;
  useInputEvent: boolean = true;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {  
      this.theme$ = this.store.select(themeSelectors.selectTheme);
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

      this.input.nativeElement.focus(); 
    }    
  }  

  onClearText(data: any): void {
    this.searchText = '';
    this.store.dispatch(hexActions.clearHexInput());
    this.input.nativeElement.focus();
  }

  ngOnDestroy(): void {
    if (this.keyupSubscription) {
      this.keyupSubscription.unsubscribe();
    }
  }
}
