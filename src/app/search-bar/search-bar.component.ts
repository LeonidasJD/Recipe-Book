import { NgFor } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { RecipeServiceService } from '../recipes/recipe-service.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(private recipeService:RecipeServiceService) { }

@ViewChild('f') form:NgForm



searchWord:string;

  ngOnInit(): void {}

    onSearch(){
    this.searchWord = this.form.value.search;

    console.log('this' + this.searchWord);

    this.recipeService.onSendWord.next(this.searchWord);

  }

}
