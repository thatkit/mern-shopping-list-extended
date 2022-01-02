const express = require('express');
const auth = require('../../middleware/auth');

const router = express.Router();

// List Model
const List = require('../../models/List');

// @route           GET api/lists
// @description     GET all lists
// @access          Private
router.get('/', auth, (req, res) => {
    res.send('success');
    // Item
    //     .find()
    //     .sort({ date: 1 })
    //     .then(items => res.json(items))
});

// @route           POST api/lists
// @description     Create a list
// @access          Private
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save().then(item => res.json(item));
});

// @route           DELETE api/lists/:id
// @description     Delete a list
// @access          Private
router.delete('/:id', auth, (req, res) => {
    Item
        .findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ id: req.params.id })))
        .catch(e => res.status(404).json({success: false}));
});

module.exports = router;