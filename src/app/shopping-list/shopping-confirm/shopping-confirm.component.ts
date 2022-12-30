import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient-model';
import { ShoppingServiceService } from '../shopping-service.service';

@Component({
  selector: 'app-shopping-confirm',
  templateUrl: './shopping-confirm.component.html',
  styleUrls: ['./shopping-confirm.component.css']
})
export class ShoppingConfirmComponent implements OnInit {

  constructor(private shopingService:ShoppingServiceService) { }

  ingredients: Ingredient[];

  ngOnInit(): void {
    this.ingredients = this.shopingService.getIngredients();
  }

}
