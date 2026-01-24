export interface IComment {
    name: string;
    email: string;
    content: string;
    dateComment?: Date;
}

export class CommentModel implements IComment {
    readonly name: string;
    readonly email: string;
    readonly content: string;
    readonly dateComment?: Date;

    constructor(data: IComment) {
        this.name = data.name;
        this.email = data.email;
        this.content = data.content;
        this.dateComment = data.dateComment;
    }
}
