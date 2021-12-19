const express = require('express');
const auth = require('../../middleware/auth');

const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route           GET api/items
// @description     GET All Items
// @access          Private
router.get('/', auth, (req, res) => {
    Item
        .find()
        .sort({ date: 1 })
        .then(items => res.json(items))
});

// @route           POST api/items
// @description     Create An Item
// @access          Private
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save().then(item => res.json(item));
});

// @route           DELETE api/items/:id
// @description     Delete An Item
// @access          Private
router.delete('/:id', auth, (req, res) => {
    Item
        .findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ id: req.params.id })))
        .catch(e => res.status(404).json({success: false}));
});

module.exports = router;