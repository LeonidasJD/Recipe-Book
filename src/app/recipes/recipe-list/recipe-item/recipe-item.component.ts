
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, } from '@angular/core';
import { RecipeServiceService } from '../../recipe-service.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
  animations:[
    trigger('addReciState',[
      state('normal',style({'opacity':'1',transform:'translateX(0)'})),
      transition('void => normal',[style({'opacity':'0',transform:'translateX(-100px)'}),animate(300)])
    ])
  ]
})
export class RecipeItemComponent implements OnInit {

  constructor(private recipeService: RecipeServiceService){}

  reciState = 'normal';

  @Input() recipe: Recipe;
  @Input() id:number;
 



  

  ngOnInit(): void {
   
   
  }

}
