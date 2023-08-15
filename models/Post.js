import { Schema, model } from 'mongoose';

const PostSchema = new Schema({
    title: { type: String, required: true },
    caption: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    body: { type: String, required: true },
    photo: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    tags: { type: [String] },
    categries: [{ type: Schema.Types.ObjectId, ref: 'PostCategories' }]

}, { timestamps: true, toJSON: { virtuals: true } });



const Post = model('Post', PostSchema);
export default Post;
