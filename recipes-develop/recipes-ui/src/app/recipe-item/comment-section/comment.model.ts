export class Comment {
    id?: string;
    recipeId!: string;
    userId!: string;
    parentId!: string;
    username!: string;
    message!: string;
}