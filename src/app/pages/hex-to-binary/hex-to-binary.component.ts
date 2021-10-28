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

@Component({
  selector: 'cp-hex-to-binary',
  templateUrl: './hex-to-binary.component.html',
  styleUrls: ['./hex-to-binary.component.scss']
})
export class HexToBinaryComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('hexInput', {static: true}) hexInput: ElementRef;

  theme$: Observable<Theme>;
  binaryValue$: Observable<string>;
  validatedHex$: Observable<string>;

  validatedHexSubscription: Subscription;
  inputKeyUpSubscription: Subscription;

  data: string; 

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.binaryValue$ = this.store.select(hexSelectors.selectBinary);
    this.validatedHex$ = this.store.select(hexSelectors.selectValidatedHexadecimal);
    this.theme$ = this.store.select(themeSelectors.selectTheme);

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
          console.log(this.data);

          this.store.dispatch(hexActions.calculateBinary({ input: this.data }));
        });
  }
  
  ngOnDestroy(): void {
    if (this.validatedHexSubscription) {
      this.validatedHexSubscription.unsubscribe();
    }
  }
}
