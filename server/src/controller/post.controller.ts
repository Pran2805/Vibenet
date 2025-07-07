// import fs from "fs/promises";
import httpResponse from "../utils/httpResponse"
import httpError from "../utils/httpError"
import Post from "../model/post.model"
import { NextFunction, Request, Response } from "express"
import cloudinary from "../utils/cloudinary"
import User from "../model/user.model"
import fs from "fs"
import Comment from "../model/comment.model"

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description } = await req.body

        if (!title?.trim()) {
            throw new Error("Title is required")
        }

        const files = req.files

        const data: string[] = []

        if (files && Array.isArray(files)) {
            const uploadPromises = (files as Express.Multer.File[]).map(async (file) => {
                const res = await cloudinary.uploader.upload(file.path)
                await fs.unlinkSync(file.path)
                return res.secure_url
            })

            const results = await Promise.all(uploadPromises)
            data.push(...results)
        }

        // const uploadFile
        const post = await Post.create({
            title,
            description,
            files: data,
            owner: req.user?._id
        })

        await User.findByIdAndUpdate(req.user?._id, { $push: { posts: post._id } })
        httpResponse(req, res, 201, "Post created successfully", post)
    } catch (error: any) {
        httpError(next, error?.message || "Error creating post", req, 400)
    }
}

export const getAllPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await Post.find().populate("owner")
        if (!posts) {
            return httpResponse(req, res, 404, "No posts found", null)
        }
        httpResponse(req, res, 200, "Posts retrieved successfully", posts)
    } catch (error: any) {
        httpError(next, error?.message || "Error creating post", req, 400)
    }
}

export const getPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postId = await req.params.id
        if (!postId) {
            throw new Error("Post Id is Required!!")
        }
        const post = await Post.findById(postId).populate("owner")
        if (!post) {
            throw new Error("Invalid Post Id")
        }
        httpResponse(req, res, 200, "Post retrieved successfully", post)
    } catch (error: any) {
        httpError(next, error?.message || "Error creating post", req, 400)
    }
}

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = req.params.id;
    const user = req.user?._id;

    const { title, description } = req.body;

    if (!title && !description) {
      throw new Error("Title or Description is required");
    }

    if (!postId) {
      throw new Error("Invalid Post Id");
    }

    if (!user) {
      throw new Error("User is not logged in");
    }

    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }

    if (post.owner.toString() !== user.toString()) {
      throw new Error("You are not authorized to update this post");
    }

    const updatedFields: any = {};
    if (title) updatedFields.title = title;
    if (description) updatedFields.description = description;

    const updatedPost = await Post.findByIdAndUpdate(postId, updatedFields, {
      new: true,
    });

    if (!updatedPost) {
      throw new Error("Post is not updated");
    }

    httpResponse(req, res, 200, "Post updated successfully", updatedPost);
  } catch (error: any) {
    httpError(next, error?.message || "Error updating post", req, 400);
  }
};

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      throw new Error("Not Provided the Post id");
    }

    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Invalid Post Id");
    }

    const deletePromises = post.files.map((url) => {
      const parts = url.split("/");
      const filename = parts[parts.length - 1].split(".")[0]; 
      return cloudinary.uploader.destroy(filename);
    });

    await Promise.all(deletePromises);

    await Post.findByIdAndDelete(postId);

    httpResponse(req, res, 200, "Post deleted successfully", post);
  } catch (error: any) {
    httpError(next, error?.message || "Error deleting post", req, 400);
  }
};

export const toggleLikePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = req.params.id;
    const userId = req.user?._id;

    if (!userId) throw new Error("User not authenticated");

    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found");

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      // ❌ Unlike
      post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
      await post.save();
      httpResponse(req, res, 200, "Post unliked", post.likes);
    } else {
      // ✅ Like
      post.likes.push(userId);
      await post.save();
      httpResponse(req, res, 200, "Post liked", post.likes);
    }
  } catch (error: any) {
    httpError(next, error?.message || "Error toggling like", req, 400);
  }
};


export const createComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = req.params.id;
    const userId = req.user?._id;
    const { comment } = req.body;

    if (!comment?.trim()) throw new Error("Comment is required");

    const newComment = await Comment.create({
      user: userId,
      post: postId,
      comment: comment.trim()
    });

    httpResponse(req, res, 201, "Comment created", newComment);
  } catch (error: any) {
    httpError(next, error?.message || "Failed to create comment", req, 400);
  }
};

export const getComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = req.params.id;

    const comments = await Comment.find({ post: postId })
      .populate("user", "username name avatar")
      .sort({ createdAt: -1 });

    httpResponse(req, res, 200, "Comments fetched", comments);
  } catch (error: any) {
    httpError(next, error?.message || "Failed to fetch comments", req, 400);
  }
};


export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { commentId } = req.params;
    const userId = req.user?._id;

    if(!userId){
      throw new Error("User is not logged in")
    }
    const comment = await Comment.findById(commentId);
    if (!comment) throw new Error("Comment not found");

    if (comment.user.toString() !== userId.toString()) {
      throw new Error("Unauthorized to delete this comment");
    }

    await comment.deleteOne();

    httpResponse(req, res, 200, "Comment deleted", commentId);
  } catch (error: any) {
    httpError(next, error?.message || "Failed to delete comment", req, 400);
  }
};


export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { commentId } = req.params;
    const { comment } = req.body;
    const userId = req.user?._id;

    if(!userId){
      throw new Error("User is not logged in")
    }

    if (!comment?.trim()) throw new Error("Updated comment is required");

    const existing = await Comment.findById(commentId);
    if (!existing) throw new Error("Comment not found");

    if (existing.user.toString() !== userId.toString()) {
      throw new Error("Unauthorized to update this comment");
    }

    existing.comment = comment.trim();
    await existing.save();

    httpResponse(req, res, 200, "Comment updated", existing);
  } catch (error: any) {
    httpError(next, error?.message || "Failed to update comment", req, 400);
  }
};

