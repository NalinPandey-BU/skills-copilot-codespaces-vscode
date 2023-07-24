// create a web server// create a route to get all comments
// create a route to add a comment
// create a route to delete a comment
// create a route to update a comment
// create a route to get a comment by ID

const express = require('express');
const router = express.Router();
const Comment = require('../models/comments');

// GET ALL COMMENTS
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET ONE COMMENT
router.get('/:id', getComment, (req, res) => {
    res.json(res.comment);
});

// CREATE COMMENT
router.post('/', async (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });
    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE COMMENT
router.delete('/:id', getComment, async (req, res) => {
    try {
        await res.comment.remove();
        res.json({ message: 'Comment deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// UPDATE COMMENT
router.patch('/:id', getComment, async (req, res) => {
    if (req.body.name != null) {
        res.comment.name = req.body.name;
    }
    if (req.body.comment != null) {
        res.comment.comment = req.body.comment;
    }
    try {
        const updatedComment = await res.comment.save();
        res.json(updatedComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Middleware function to get comment by ID
async function getComment(req, res, next) {
    try {
        comment = await Comment.findById(req.params.id);
        if (comment == null) {
            return res.status(404).json({ message: 'Cannot find comment' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.comment = comment;
    next();
}

module.exports = router;