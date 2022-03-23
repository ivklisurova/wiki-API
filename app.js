const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://localhost:27017/wikiDB");
}


const articleSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
});

const Article = mongoose.model("Article", articleSchema);


/* GET all Articles from DB,
POST a new article into DB,
DELETE all Articles  */

app.route("/articles")
    .get(function (req, res) {
        Article.find({}, function (err, records) {
            if (!err) {
                res.send(records);
            } else {
                res.send(err);
            }
        });
    })
    .post(function (req, res) {

        const newRecord = new Article({
            title: req.body.title,
            content: req.body.content,
        });

        newRecord.save(function (err) {
            if (!err) {
                res.send("Successfully added a new article!");
            } else {
                res.send(err);
            }
        });
    })
    .delete(function (req, res) {
        Article.deleteMany({}, function (err) {
            if (!err) {
                res.send("Successfully deleted all records!");
            } else {
                res.send(err);
            }
        });
    });


app.listen(3000, function () {
    console.log("Server started on port 3000");
});