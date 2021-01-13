import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Country } from '../model/country';
import { CountryService } from '../service/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  updateCountry: boolean = false;
  countries: Country[];
  Country: Country = new Country();

  countryId = null;
  isToggle: boolean = false;
  formSubmitted: boolean;
  isDelete: boolean;

  constructor(private _countryService: CountryService,
    private angularFirestore: AngularFirestore
  ) {
    this.getAllCountry();
  }

  getAllCountry() {
    this._countryService.getAllCountry().subscribe((data: any) => {
      this.countries = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Country;
      });
      console.log(this.countries);

    });
  }

  onSubmit(f) {
    if (f.form.valid) {
      const CountryData = JSON.parse(JSON.stringify(this.Country));
      console.log('countryData', CountryData)
      if (this.countryId == null) {
        console.log('this.countryId ==', this.countryId)
        this._countryService.addCountryInforamtion(CountryData);
      } else {
        console.log('this.countryId update ==', this.countryId)
        this._countryService.updateCountryInforamtion(this.countryId, CountryData);
      }
      this.Country = new Country();
      f.submitted = false;
      this.countryId = null;
      this.formSubmitted = true;
      this.updateCountry = false;
      setInterval(() => {
        this.formSubmitted = false;

      }, 2000);
    }
  }

  //Edit Country method  
  editCountry(countryId) {
    this.countryId = countryId;
    let obj: any = this.countries.filter((x: any) => {
      return x.id == countryId;
    });
    this.updateCountry = true;
    this.Country = obj[0];

  }

  // Delete Country method  
  deleteCountry(countryId) {
    if (confirm('Please note! This action can NOT be undone. Are you sure you want to delete?')) {

      this._countryService.deleteCountry(countryId);
      this.isDelete = true;
      setInterval(() => {
        this.isDelete = false;
      }, 2000);
    }
  }

  ngOnInit(): void {
    const name = sessionStorage.getItem('name')
    const email = sessionStorage.getItem('email')
    const pic = sessionStorage.getItem('picture')

    console.log(name, email, pic)
  }

}
