const express = require('express');
const auth = require('../../middleware/auth');

const router = express.Router();

// List Model
const List = require('../../models/List');

// .catch() callback
const catchCallback = e => res.status(404).json({success: false});

// @route           GET api/lists
// @description     GET a list
// @access          Private
router.get('/', (req, res) => {
    List
        .findById(req.body.listId)
        .populate('items')
        .then(list => res.json(list))
        .catch(catchCallback);
});

// @route           POST api/lists
// @description     Create a list
// @access          Private
router.post('/', (req, res) => {
    const newList = new List({
        name: req.body.name,
        totalBudget: req.body.totalBudget,
    });
    newList
        .save()
        .then(list => res.json(list))
        .catch(catchCallback);
});

// @route           PUT api/lists
// @description     Add a new item to the list
// @access          Private
router.put('/', (req, res) => {
    List
        .findOneAndUpdate(
            { listId: req.body.listId },
            { $push: { items: req.body.itemId } }
        )
        .then(list => res.json(list))
        .catch(catchCallback);
});

// @route           PUT api/lists/:itemId
// @description     Remove an item from the list
// @access          Private
router.put('/:itemId', (req, res) => {
    List
        .findOneAndUpdate(
            { listId: req.body.listId },
            { $pull: { items: req.params.itemId } }
        )
        .then(list => res.json(list))
        .catch(catchCallback);
});

// @route           DELETE api/lists/:id
// @description     Delete a list
// @access          Private
router.delete('/:listId', (req, res) => {
    List
        .findById(req.params.listId)
        .then(list => list
            .remove()
            .then(() => res.json({ id: req.params.listId })))
        .catch(catchCallback);
});

module.exports = router;