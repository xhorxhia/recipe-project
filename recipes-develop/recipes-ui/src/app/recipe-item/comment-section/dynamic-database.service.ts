import { Injectable } from "@angular/core";
import { Comment } from "./comment.model";

export class DynamicFlatNode {
    constructor(
        public item: string,
        public level = 1,
        public expandable = false,
        public isLoading = false
    ) { }
}

@Injectable()
export class DynamicDatabase {
    comments!: Comment[];
    dataMap = new Map<string, string[]>([]);
    rootLevelNodes: string[] = [];

    initialData(comments: Comment[]): DynamicFlatNode[] {
        this.comments = comments;
        for (let key in comments) {
            let comment = comments[key];
            if (comment.parentId === '0') {
                this.rootLevelNodes.push(comment.id!);
            }
            this.dataMap.set(comment.id!, this.getChildrenByRootNode(comment.id!));
        }
        return this.rootLevelNodes.map(name => new DynamicFlatNode(name, 0, true));
    }

    getChildrenByRootNode(id: string): string[] {
        let children: string[] = [];
        for (let key in this.comments) {
            let comment = this.comments[key];
            if (comment.parentId === id) {
                children.push(comment.id!);
            }
        }
        return children;
    }

    getChildren(node: string): string[] | undefined {
        return this.dataMap.get(node);
    }

    isExpandable(node: string): boolean {
        return this.dataMap.has(node);
    }
}