import { User } from "../interfaces";

export class Recipe {
    id!: string;
    name!: string;
    description!: string;
    ingredients!: string[];
    steps!: string[];
    difficulty!: string;
    category!: string;
    author!: User;
    date!: string;
    imagePath!: string;
    rating!: Number;
    stars!: any;
    recipeDifficulty!: string;
}