import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { Housinglocation } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { first, last } from 'rxjs';


@Component({
  selector: 'app-details',
  imports: [CommonModule, ReactiveFormsModule],
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

    <!-- application  -->
     <section class="listing-apply">
      <h2 class="section-heading">
        Apply now to live here
      </h2>
      <form [formGroup]="applyForm" (submit)="submitApplication()">
        <label for="first-name">First Name</label>
        <input type="text" id="first-name" formControlName="firstName" />

        <label for="last-name">Last Name</label>
        <input type="text" id="last-name" formControlName="lastName" />

        <label for="email">Email</label>
        <input type="email" id="email" formControlName="email" />

        <button class="primary" type="submit">Submit Application</button>
      </form>
     </section>
    
   </article>
  `,
  styleUrls: ['./details.component.css'],})
  
export class DetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
 
  housingService: HousingService = inject(HousingService);
  housingLocation: Housinglocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
   
  });


  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }



}
