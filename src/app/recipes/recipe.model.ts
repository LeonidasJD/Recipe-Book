import { Ingredient } from "../shared/ingredient-model";

export class Recipe{


    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients:Ingredient[];
    public howToPrepare:string;
    public recipeType:string;

    constructor(name: string, description: string, imagePath: string,ingredients:Ingredient[],howToPrepare:string,recipeType:string){

        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
        this.howToPrepare = howToPrepare;
        this.recipeType = recipeType;

    }
}
