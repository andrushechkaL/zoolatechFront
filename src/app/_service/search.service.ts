import { Injectable } from '@angular/core';
import {Person, Result} from "../_models/person";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getPersons(person) {
    return this.http.get<Result>(`http://localhost:4000/autocomlete?name=${person.name}`);
  }


  showResult(name: string) {
    return this.http.get<Person>(`http://localhost:4000/search-people?name=${name}`);
  }

  getFromDB() {
    return this.http.get<Person[]>('http://localhost:4000/dbupload');
  }
}
