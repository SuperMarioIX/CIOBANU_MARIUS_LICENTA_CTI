import Post from '../models/Post.js';

export const getAll = async (req, res) => {
    try {
        const posts = await Post.find().populate('user').exec();
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot find posts!',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        console.log(postId);

        const doc = await Post.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewsCount: 1 } },
            { returnDocument: 'after' }
        );

        if (!doc) {
            return res.status(404).json({
                message: 'Post is not found!',
            });
        }

        res.json(doc);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot find post!',
        });
    }
};

export const create = async (req, res) => {
    try {
        console.log(req.body);
        const doc = new Post({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });
        console.log('ajunge aici');
        const post = await doc.save();
        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot create post!',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        console.log(postId);

        const doc = await Post.findOneAndDelete(
            { _id: postId }
        );

        if (!doc) {
            return res.status(404).json({
                message: 'Post is not found!',
            });
        }

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot delete post!',
        });
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;
        console.log(postId);
        await Post.updateOne(
            { _id: postId },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                user: req.userId,
            }
        );

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot update post!',
        });
    }
};

export const getLastTags = async (req, res) => {
    try {
      const posts = await Post.find().limit(5).exec();
      let tags = posts.flatMap(post => post.tags);

      tags = [...new Set(tags)].slice(0, 5);
  
      console.log(tags);
      res.json(tags); 
    } catch (err) {
      console.error(err); 
      res.status(500).json({
        message: 'Cannot find posts!',
        error: err.message
      });
    }
};