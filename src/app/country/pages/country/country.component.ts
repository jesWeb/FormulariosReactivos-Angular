import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country.component.html',

})
export class CountryComponent {

  fb = inject(FormBuilder);
  countryService = inject(CountryService)

  regions = signal(this.countryService.regions)

  countrysByRegions = signal<Country[]>([])
  frontera = signal<Country[]>([])

  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required]
  })

  /**Cambiar valor del change de la region  */

  //forma uno -> inconveniente - la subscirpcion siempre se queda aqui ya que no se limpia

  // formRefion = this.myForm.get('region')!.valueChanges.subscribe((value) => {
  //   console.log([value]);
  // })

  //forma con un efecto

  onFormChanged = effect((onCleanup) => {

    const RegionSubsciption = this.onRegionChanged()
    const CountrySubscriptions = this.onCountryChanged()

    onCleanup(() => {
      RegionSubsciption.unsubscribe();
      CountrySubscriptions.unsubscribe();
      console.log('limpiado la subscripcion');

    })
  })


  onRegionChanged() {
    return this.myForm
      .get('region')!
      .valueChanges
      .pipe(
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => this.myForm.get('border')!.setValue('')),
        tap(() => {
          this.countrysByRegions.set([]),
            this.frontera.set([])
        }),
        //permite hacer un nuevo observable a traves de lo se arriba como el map de js
        switchMap((region) =>
          this.countryService.getCountriesBtRegion(region ?? '')
        )
      )
      .subscribe((country) => {
        this.countrysByRegions.set(country)
        console.log({ country });
      })

  }


  onCountryChanged() {
    return this.myForm
      .get('country')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('border')!.setValue('')),
        filter((value) => value!.length > 0),
        switchMap((alphaCode) =>
          this.countryService.getCountryByAlpha(alphaCode ?? '')
        ),
        switchMap((country) =>
          this.countryService.getCountryBorderCodes(country.borders)
        )
      )
      .subscribe((borders) => {
        // console.log({ borders: borders });
        this.frontera.set(borders)
      })
  }


}
