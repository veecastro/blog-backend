import Post from "../models/Post";
import { v4 as uuidv4 } from "uuid";

const createPost = async (req, res, next) => {
    try {
        const post = new Post({
            title: "Sample title",
            caption: "Sample caption",
            slug: uuidv4(),
            body: {
                type: "doc",
                content: [],
            },
            photo: "",
            user: req.user._id,
        });

        const createdPost = await post.save();
        return res.status(201).json(createdPost);
    } catch (error) {
        next(error);
    }
};

const updatePost = async (req, res, next) => {
    try {
        const post = new Post.findOne({ slug: req.params.slug });

        if (!post) {
            const error = new Error("Post not found");
            next(error);
        }

        const upload = uploadPicture.single("photo");

        const handleUpdatePostData = async (data) => {
            const { title, caption, slug, body, tags, categories } = JSON.parse(data);
            post.title = title || post.title;
            post.caption = caption || post.caption;
            post.slug = slug || post.slug;
            post.body = body || post.body;
            post.tags = tags || post.tags;
            post.categories = categories || post.categories;
            const updatedPost = await post.save();
            return res.json(updatedPost);
        };

    } catch (error) {
        next(error);
    }
};

const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findOneAndDelete({ slug: req.params.slug });
        if (!post) {
            const error = new Error("Post not found");
            next(error);
        }
        // await fileRemover(post.photo);
        await Comment.deleteMany({ post: post._id });

        return res.json({ message: "Post deleted successfully" });
    } catch (error) {
        next(error);
    }
};

const getPost = async (req, res, next) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug }).populate([
            {
                path: "user",
                select: "name",
            },
            {
                path: "comments",
                match: {
                    check: true,
                    parent: null,
                },
                populate: [
                    {
                        //user for comment not post
                        path: "user",
                        select: "name",
                    },
                    {
                        path: "replies",
                        match: {
                            check: true,
                        },
                        populate: [
                            {
                                path: "user",
                                select: "name",
                            },
                        ],
                    },
                ],
            },
        ]);

        if (!post) {
            const error = new Error("Post not found");
            return;
            next(error);
        }

        return res.json(post);
    } catch (error) {
        next(error);
    }
};

const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({}).populate([
            {
                path: "user",
                select: ["name"],
            }
        ]);
        res.json(posts);
    } catch (error) {
        next(error);
    }
};


export { createPost, updatePost, deletePost, getPost, getAllPosts };
