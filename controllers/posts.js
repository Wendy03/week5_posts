const Post = require('../models/posts');

const posts = {
  async getPosts(req, res) {
    const { keyword, sortby } = req.query;
    const search =
      keyword !== undefined ? { content: new RegExp(`${keyword}`) } : {};
    const sort = sortby === 'old' ? 'createdAt' : '-createdAt';
    const posts = await Post.find(search)
      .populate({
        path: 'user',
        select: 'name photo ',
      })
      .sort(sort);
    res.status(200).json({ status: 'success', posts });
  },
  async createPost(req, res) {
    try {
      const { content, image, user, createdAt } = req.body;
      if (content || user) {
        const newPost = await Post.create({
          content,
          image,
          user,
          createdAt,
        });
        res.status(200).json({ status: 'success', newPost });
      } else {
        res.status(400).json({ status: 'error', message: '欄位資料填寫不全' });
      }
    } catch (err) {
      res.status(400).json({ status: 'error', message: err.message });
    }
  },
  async deletePosts(req, res) {
    const posts = await Post.deleteMany({});
    res.status(200).json({ status: 'success', posts });
  },
  async deleteOnePost(req, res) {
    const id = req.params.id;
    if (id === null) {
      res.status(400).json({ status: 'error', message: '查無此 ID' });
      return;
    }
    const posts = await Post.findByIdAndDelete(id);
    res.status(200).json({ status: 'success', posts });
  },
  async editPost(req, res) {
    try {
      const { content, image, likes } = req.body;
      const id = req.params.id;
      if (id !== null && content) {
        const posts = await Post.findByIdAndUpdate(id, {
          content,
          image,
          likes,
        });
        res.status(200).json({ status: 'success', posts });
      } else {
        res.status(400).json({ status: 'error', message: 'content 必填' });
      }
    } catch (err) {
      res.status(400).json({ status: 'error', message: err.message });
    }
  },
};

module.exports = posts;
