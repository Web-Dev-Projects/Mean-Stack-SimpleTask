const ItemModel = require('../models/item')
const authorize = require('../middlewares/authorize');
const formParser = require('../middlewares/formparser');
const fileSaver = require('../middlewares/filesaver');
const express = require('express')
const db = require('../db')
const path = require('path')

const itemsRouter = express.Router();

itemsRouter.post('', [formParser, authorize, fileSaver],
    (req, res) => {
        if (!req.body.downloadsNum) req.body.downloadsNum = 0;
        if (!req.body.rating) req.body.rating = { num: 0, value: 0 };
        if (!req.body.comments) req.body.comments = []

        db.create(ItemModel, req.body)
            .then((data) => {
                [data] = ratingsSum([data]);
                res.status(200).json(data);
            })
            .catch((err) => {
                console.log("in posting new item", err)
                res.status(500).json(err);
            });
    }
);

itemsRouter.put('/comments/:id', (req, res) => {
    db.addElemToList(ItemModel, req.params.id, req.body, "comments", true)
        .then(data => res.status(200).json(data))
        .catch((err) => { res.status(404).json(err) })
});

itemsRouter.put('/ratings/:id', authorize, (req, res) => {
    db.findOne(ItemModel, { '_id': req.params.id })
        .then(data => {
            let listName = "ratings";
            let listFilter = { "username": req.body.username };
            let newValue = { "value": req.body.value };

            db.upsertElemToList(ItemModel, req.params.id, listName, newValue, listFilter)
                .then(() => { res.status(200).json({ msg: "Data successfully modified" }); })
                .catch((err => { res.status(500).json(err) }))

        })
        .catch(err => {
            console.log("in changing rating ", err);
            res.status(404).json({ msg: "user id is wrong or invalid" });
        });
});

itemsRouter.post('/userRating/:id', authorize, (req, res) => {
    db.findOne(ItemModel, { _id: req.params.id }, { ratings: { "$elemMatch": { username: req.body.username } } })
        .then(data => {
            let rating = (data.ratings.length) ? data.ratings[0].value : 0;
            res.status(200).json(rating)
        })
        .catch(err => {
            console.log("in getting user rating", err);
            res.status(404).json({ msg: "user id is wrong or invalid" });
        });

});

itemsRouter.get('', (req, res) => {
    db.find(ItemModel, {})
        .then(data => {
            data = ratingsSum(data);
            res.status(200).json(data);
        })
        .catch((err) => { console.log("in getting items", err); res.status(500).json(err) })
});

itemsRouter.get('/:id', (req, res) => {
    db.findOne(ItemModel, { _id: req.params.id })
        .then(data => {
            [data] = ratingsSum([data]);
            res.status(200).json(data)
        })
        .catch((err) => {
            console.log("in changing rating ", err);
            res.status(404).json({ msg: "user id is wrong or invalid" });
        })
});

itemsRouter.get('/download/:id', (req, res) => {
    db.findOne(ItemModel, { '_id': req.params.id })
        .then(data => {
            db.incFieldsWithValues(ItemModel, req.params.id, ["downloadsNum"], [1])
                .then(() => {
                    let fileLocation = path.join(process.env.FILESPATH, data.exeFileSrc);
                    res.status(200).download(fileLocation, data.exeFileSrc);
                })
                .catch((err => { console.log("in file download", err); res.status(500).json(err) }))
        })
        .catch(err => res.status(404).json(err));
});

function ratingsSum(docs) {
    docs.forEach((doc, i) => {
        docs[i] = doc = doc.toObject();

        let num = 0;
        let ratingsSum = 0.0;
        doc.ratings.forEach((rating) => {
            if (rating.value)
                num++;
            ratingsSum += rating.value;
        });

        delete doc.ratings;
        doc.rating = { num: num, ratingsSum: ratingsSum };
        return doc;
    });
    return docs;
}

module.exports = itemsRouter