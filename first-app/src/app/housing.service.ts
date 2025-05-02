import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  url = 'http://localhost:3000/locations';

  async getAllHousingLocation(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);

    return (await data.json()) ?? [];
   }
  
  
  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/?id=${id}`);
    const locationJson = await data.json();
    return locationJson[0] ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string): void {
    console.log(
      `Homes Application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}`
    );
  }
}
