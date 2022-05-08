const User = require('../models/users');

const users = {
  async getUser(req, res) {
    const users = await User.find();
    res.status(200).json({ status: 'success', users });
  },
  async creatUser(req, res) {
    try {
      const { name, email, password, photo } = req.body;
      if (name || email || password) {
        const newUser = await User.create({
          name,
          email,
          password,
          photo,
        });
        res.status(200).json({ status: 'success', newUser });
      } else {
        res.status(400).json({ status: 'error', message: '資料不全' });
      }
    } catch (err) {
      res.status(400).json({ status: 'error', message: '資料錯誤' });
    }
  },
  async editUser(req, res) {
    try {
      const { name, email, password, photo } = req.body;
      const id = req.params.id;
      if (name || password) {
        const user = await Post.findByIdAndUpdate(id, {
          name,
          email,
          password,
          photo,
        });
        res.status(200).json({ status: 'success', user });
      } else {
        res.status(400).json({ status: 'error', message: 'content 必填' });
      }
    } catch (err) {
      res.status(400).json({ status: 'error', message: '資料錯誤' });
    }
  },
};

module.exports = users;
