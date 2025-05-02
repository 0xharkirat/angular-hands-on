import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { Housinglocation } from '../housinglocation';
@Component({
  selector: 'app-details',
  imports: [CommonModule],
  template: `
   <article>
    <img [src]="housingLocation?.photo" alt="Exterior photo of {{ housingLocation?.name}}" crossorigin class="listing-photo" />

    <section class="listing-description">
      <h2 class="listing-heading">
        {{ housingLocation?.name}}
      </h2>
      <p class="listing-location">
        {{ housingLocation?.city}}, {{ housingLocation?.state}}
      </p>
    </section>
    <section class="listing-features">
      <h2 class="section-heading">
        About this housing location

      </h2>

      <ul>
        <li>Units Available {{ housingLocation?.availableUnits}}</li>
        <li>Wifi {{ housingLocation?.wifi ? 'Yes' : 'No'}}</li>
        <li>Laundry {{ housingLocation?.laundry ? 'Yes' : 'No'}}</li>
      </ul>
    </section>
    
   </article>
  `,
  styleUrls: ['./details.component.css'],})
  
export class DetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
 
  housingService: HousingService = inject(HousingService);
  housingLocation: Housinglocation | undefined;


  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }

}
