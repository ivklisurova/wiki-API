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

app.get("/articles", function (req, res) {
    Article.find({}, function (err, records) {
        if (!err) {
            res.send(records);
        } else {
            res.send(err);
        }
    });
});


app.listen(3000, function () {
    console.log("Server started on port 3000");
});