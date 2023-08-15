// import { Schema, model } from 'mongoose';

// const CommentSchema = new Schema({
//     user: { type: Schema.Types.ObjectId, ref: 'User' },
//     description: { type: String, required: true },
//     //which posts the user commented
//     post: { type: Schema.Types.ObjectId, ref: 'Post' },
//     //admin check the comment
//     check: { type: Boolean, default: false },
//     //admin check if comment is main or reply
//     parent: { type: Schema.Types.ObjectId, ref: 'Comment', default: null },
//     replyOnUser: { type: Schema.Types.ObjectId, ref: 'User', default: null },



// }, { timestamps: true, toJSON: { virtuals: true } });

// //mongoose virtuals populate
// CommentSchema.virtual('replies', {
//     //ref to comment model
//     ref: 'Comment',
//     localField: '_id',
//     //get replies commnet off main comment
//     foreignField: 'parent',

// });


// const Comment = model('Comment', CommentSchema);
// export default Comment;