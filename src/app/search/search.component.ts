import { Component, OnInit, SimpleChanges } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SearchService} from "../_service/search.service";
import {Person, Result} from "../_models/person";
import {Observable} from "rxjs";
import {debounceTime, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],

})
export class SearchComponent implements OnInit {

  searchForm : FormGroup;
  personSearchList: Observable<Result>;
  result = {} as Person;
  resultString: string;
  resultShow = [] as Person[];

  constructor(private searchService: SearchService) {

  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      "searchString": new FormControl("", Validators.required)
    });


    this.personSearchList = this.searchForm.get('searchString').valueChanges.pipe(
      debounceTime(300),
      switchMap(value => this.searchService.getPersons({name: value})),
    );
  }

  displayFn(person: Person) {
    if (person) {
      this.result = person
      return person.name;
    }
  }

  showResult() {
    this.searchService.showResult(this.result.name).subscribe(data => {
      this.result = data;
      this.resultString = `<p> ${this.result[0].name} (${this.result[0].homeworld})</p>`;
      this.resultShow.push(this.result);
    })
  }

  getFromDB() {
    this.searchService.getFromDB().subscribe(data => this.resultShow = data)
  }
}
