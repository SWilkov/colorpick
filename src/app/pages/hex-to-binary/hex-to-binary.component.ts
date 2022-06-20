import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Theme } from 'src/app/models/theme.enum';
import { AppState } from 'src/app/reducers';
import * as hexActions from '../../actions/hex.actions';
import * as hexSelectors from '../../selectors/hex.selector';
import * as themeSelectors from '../../selectors/theme.selector';
import * as navigationActions from '../../actions/navigation.actions';
import { Page } from 'src/app/models/page.enum';
import * as balloonSelectors from '../../selectors/balloon.selector';
import { isRising } from 'src/app/reducers/balloon.reducer';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'cp-hex-to-binary',
  templateUrl: './hex-to-binary.component.html',
  styleUrls: ['./hex-to-binary.component.scss']
})
export class HexToBinaryComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('hexInput', {static: true}) hexInput: ElementRef<HTMLElement>;

  theme$: Observable<Theme>;
  binaryValue$: Observable<string>;
  validatedHex$: Observable<string>;
  isRising$: Observable<boolean>;

  validatedHexSubscription: Subscription;
  inputKeyUpSubscription: Subscription;

  data: string; 

  constructor(private store: Store<AppState>, private meta: Meta,
    private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Convert Hexadecimal to binary | ilovesums');
    this.meta.updateTag({
      name: 'description',
      content: 'Hexadecimal to binary calculator for free | ilovesums'
    });

    this.binaryValue$ = this.store.select(hexSelectors.selectBinary);
    this.validatedHex$ = this.store.select(hexSelectors.selectValidatedHexadecimal);
    this.theme$ = this.store.select(themeSelectors.selectTheme);
    this.isRising$ = this.store.select(balloonSelectors.selectIsRising);

    this.validatedHexSubscription = this.validatedHex$.subscribe(hex => {
      if (hex) {        
        this.store.dispatch(hexActions.calculateBinary({input: hex}));        
      }
    });  
    
    this.store.dispatch(navigationActions.navigationChanged({ payload: Page.binary }));
  }

  ngAfterViewInit(): void {
    this.inputKeyUpSubscription = 
      fromEvent<KeyboardEvent>(this.hexInput.nativeElement, 'keyup')
        .pipe(
          debounceTime(150),
          distinctUntilChanged()        
        )
        .subscribe(input => {
          this.store.dispatch(hexActions.calculateBinary({ input: this.data }));
        });

      this.hexInput.nativeElement.focus();
  }

  onClearText(input: any): void { 
    this.data = '';
    //this.store.dispatch(hexActions.clearBinary());
    this.hexInput.nativeElement.focus();
  }
  
  ngOnDestroy(): void {
    if (this.validatedHexSubscription) {
      this.validatedHexSubscription.unsubscribe();
    }
  }
}
