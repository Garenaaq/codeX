const Post = require("../models/postModel");
const { findUserById } = require("../helpers/userHelpers");

exports.createPost = async (req, res) => {
  try {
    const user = req.user;

    const { title, content, previewImage, direction, type } = req.body;

    const newPost = new Post({
      title,
      content,
      previewImage,
      direction,
      type,
      author: user.id,
    });

    await newPost.save();

    const formattedPost = {
      id: newPost._id,
      title: newPost.title,
      content: newPost.content,
      previewImage: newPost.previewImage,
      direction: newPost.direction,
      type: newPost.type,
      nickname: user.nickname,
      authorId: user._id,
      likes: newPost.likes,
    };

    res.status(201).json({
      message: "Пост был успешно создан",
      post: formattedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const direction = req.query.direction;
    const type = req.query.type;

    const filterConditions = {};

    if (direction) {
      filterConditions.direction = direction;
    }

    if (type) {
      filterConditions.type = type;
    }

    const user = req.user;

    const posts = await Post.find(filterConditions).populate(
      "author",
      "nickname"
    );

    const formattedPosts = posts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      previewImage: post.previewImage,
      direction: post.direction,
      type: post.type,
      nickname: post.author.nickname,
      authorId: post.author._id,
      likes: post.likes,
      userLiked: user ? post.likedBy.includes(user.id) : false,
    }));

    res.status(200).json({ posts: formattedPosts.reverse() });
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const idPost = req.query.id;

    const user = req.user;

    const post = await Post.findById(idPost);
    if (!post) {
      return res.status(404).json({ message: "Пост не найден" });
    }

    if (post.author.toString() !== user.id) {
      return res
        .status(403)
        .json({ message: "У вас нет прав для редактирования этого поста" });
    }

    await Post.findByIdAndDelete(idPost);

    res.status(201).json({ message: "Пост был успешно удалён" });
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

exports.editPost = async (req, res) => {
  try {
    const idPost = req.query.id;
    const { title, content, previewImage, direction, type } = req.body;

    const user = req.user;

    const post = await Post.findById(idPost);
    if (!post) {
      return res.status(404).json({ message: "Пост не найден" });
    }

    if (post.author.toString() !== user.id) {
      return res
        .status(403)
        .json({ message: "У вас нет прав для редактирования этого поста" });
    }

    const editPost = await Post.findByIdAndUpdate(
      idPost,
      {
        title,
        content,
        type,
        direction,
        previewImage,
      },
      { new: true }
    );

    if (!editPost) {
      return res.status(404).json({ message: "Пост не найден" });
    }

    const formattedEditPost = {
      id: editPost.id,
      title: editPost.title,
      content: editPost.content,
      previewImage: editPost.previewImage,
      direction: editPost.direction,
      type: editPost.type,
      nickname: user.nickname,
      authorId: editPost.author._id,
      likes: editPost.likes,
      userLiked: editPost.likedBy.includes(user.id),
    };

    res.status(200).json({
      message: "Пост успешно обновлён",
      post: formattedEditPost,
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { idPost } = req.body;

    const idUser = req.user.id;

    const user = await findUserById(idUser);

    const likePost = await Post.findById(idPost);

    if (!likePost) {
      return res.status(404).json({ message: "Пост не найден" });
    }

    const hasLiked = likePost.likedBy.includes(user._id);

    let removeLike = false;

    if (hasLiked) {
      likePost.likedBy = likePost.likedBy.filter(
        (id) => id.toString() !== user._id.toString()
      );
      likePost.likes -= 1;
      removeLike = true;
    } else {
      likePost.likedBy.push(user._id);
      likePost.likes += 1;
    }

    await likePost.save();

    res.status(200).json({ removeLike });
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
};
