import { CommentModel } from "@models/comment.model"

export const SAMPLE_COMMENT: CommentModel = new CommentModel({ 
    name: 'John',
    email: 'john@example.com', 
    content: 'This is a sample comment that is used for the purpose of testing.' 
})