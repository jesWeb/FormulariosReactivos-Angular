import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-country',
  imports: [],
  templateUrl: './country.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryComponent { }
