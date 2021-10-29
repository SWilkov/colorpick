import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Theme } from 'src/app/models/theme.enum';
import { AppState } from 'src/app/reducers';
import { HexService } from 'src/app/services/hex.service';
import * as hexActions from '../../actions/hex.actions';
import * as hexSelectors from '../../selectors/hex.selector';
import * as themeSelectors from '../../selectors/theme.selector';
import * as navigationActions from '../../actions/navigation.actions';
import { Page } from 'src/app/models/page.enum';

@Component({
  selector: 'cp-hex-to-decimal',
  templateUrl: './hex-to-decimal.component.html',
  styleUrls: ['./hex-to-decimal.component.scss']
})
export class HexToDecimalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('decimalInput', {static: true}) decimalInput: ElementRef<HTMLElement>;
  
  theme$: Observable<Theme>;
  decimalValue: string = "";
  data: string; 

  keyUpSubscription: Subscription;

  constructor(private store: Store<AppState>, private hexService: HexService) { }

  ngOnInit(): void {
    this.theme$ = this.store.select(themeSelectors.selectTheme); 
    this.store.dispatch(navigationActions.navigationChanged({ payload: Page.decimal }));   
  }

  ngAfterViewInit(): void {
    //using the keyup event from the user input to calculate the decimal value of the hexadecimal
    //TODO needs refactoring to make available for testing but for now showcases standard rxjs rather than
    //ngrx store 
    this.keyUpSubscription = 
      fromEvent(this.decimalInput.nativeElement, 'keyup')
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          map((ke: KeyboardEvent) => { 
            var hashless = this.hexService.removeHash(this.data);
            return this.hexService.hasValidHexCharacters(hashless);          
          })               
        ).subscribe(valid => {        
          if (valid) {         
            let res = this.hexService.getDecimal(this.data).reduce((a, b) => a + b, 0);           
            this.decimalValue = res.toString();
          } else {
            this.decimalValue = "Sorry invalid Hexadecimal!"
          }
        });

        this.decimalInput.nativeElement.focus();
  }

  onClearText(input: any): void { 
    this.data = '';
    this.decimalValue = '';
    this.decimalInput.nativeElement.focus();
  }
  
  ngOnDestroy(): void {
   if (this.keyUpSubscription) {
     this.keyUpSubscription.unsubscribe();
   }
  }
}
