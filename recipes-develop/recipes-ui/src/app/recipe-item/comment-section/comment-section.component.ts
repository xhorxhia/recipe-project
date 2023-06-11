import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { FlatTreeControl } from '@angular/cdk/tree';

import { Comment } from './comment.model';
import { CommentService } from './comment.service';
import { DynamicDatabase, DynamicFlatNode } from './dynamic-database.service';
import { DynamicDataSource } from './dynamic-data-source.service';
import { ToolbarService } from 'src/app/toolbar/toolbar.service';
import { AuthState, User } from 'src/app/interfaces';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css'],
  providers: [DynamicDatabase]
})
export class CommentSectionComponent implements OnInit {
  comments!: Comment[];
  recipeId!: string;
  newComment!: any;
  isReplying = false;
  currentNode!: DynamicFlatNode;
  currentUser = { id: '', username: '' };
  loggedUser : User = {};

  ngOnInit(): void { 
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeId = params['id'];
      }
    );
    this.commentService.getComments().subscribe(
      data => {
        this.comments = data;
        for (let key in this.comments) {
          let index: number = +key;
          if (this.comments[key].recipeId !== this.recipeId) {
            this.comments.splice(index, 1);
            index--;
          }
          key = index.toString();
        }
        this.dataSource.data = this.database.initialData(this.comments); }
    );
    this.loggedUser = JSON.parse(localStorage.getItem('recipes.loggedUser') || "{}");
  }

  constructor(private database: DynamicDatabase, 
              private commentService: CommentService,
              private router: Router,
              private route: ActivatedRoute,
              private toolbarService: ToolbarService) {
    this.newComment = new Comment();
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);
    this.toolbarService.loggedInUser.subscribe(
      (state: AuthState) =>
      {
        // console.log(state);
        this.currentUser.id = state.userid;
        this.currentUser.username = state.username;
      }
    );
  }

  treeControl: FlatTreeControl<DynamicFlatNode>;
  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;
  isExpandable = (node: DynamicFlatNode) => node.expandable;
  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

  getComment(id: string): Comment {
    let result: Comment = new Comment();
    for (let key in this.comments) {
      if (this.comments[key].id === id) {
        result = this.comments[key];
      }
    }
    //console.log(result);
    
    return result;
  }

  addComment(itemValue: string){
    if (itemValue !== '') {  
      this.newComment.recipeId = this.recipeId;
      this.newComment.userId = this.loggedUser.id;
      this.newComment.username = this.loggedUser.username;
      this.newComment.parentId = '0';
      this.newComment.message = itemValue;
      this.commentService.addComment(this.newComment).subscribe();
      const currentRouter = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentRouter]);
      });
    }
  }

  addReplyComment(itemValue: string) {
    if (itemValue !== '') {    
      this.newComment.recipeId = this.recipeId;
      this.newComment.userId = this.currentUser.id;
      this.newComment.username = this.currentUser.username;
      this.newComment.parentId = this.currentNode.item;
      this.newComment.message = itemValue;
      this.commentService.addComment(this.newComment).subscribe();
      this.isReplying = false;
      const currentRouter = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentRouter]);
      });
    }
  }

  onReply(node: DynamicFlatNode){
    this.isReplying = true;
    this.currentNode = node;
  }
  
  onCancel() {
    this.isReplying = false;
    const currentRouter = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentRouter]);
    });
  }
}
