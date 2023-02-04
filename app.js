const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// const items = [];
// const workItems = [];
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://admin-rahul:tArY8vk6BeNWaiB@atlascluster.yzpogkk.mongodb.net/todolistDB", {useNewUrlParser: true});

/////* Schema */////
const itemSchema = {
    name: String,
};

/////* Model */////
const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
    name: "Welcome to your todolist"
});

const item2 = new Item({
    name: "Hit the + button to add a new item"
});

const item3 = new Item({
    name: "<--- Hit this to delete an item"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [itemSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res){
    
    const day = date.getDate();
    // "Today"

    Item.find({}, function(err, foundItems){

        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function(err){
                if(err){
                    console.log(err);
                } else {
                    console.log("Success");
                }
            });
            res.redirect("/");
        } else {
            res.render("list", {listTitle: "Today", newListItems: foundItems});
        }
    })
});

app.post("/", (req, res) => {

    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item ({
        name: itemName
    });

    if (listName === "Today") {
        item.save();
        res.redirect("/");
    } else {
        List.findOne({ name: listName}, (err, foundList)=> {
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        })
    }
    // item.save();
    // res.redirect("/");
});

app.post("/delete", (req, res)=> {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "Today"){
        Item.findByIdAndRemove(checkedItemId, function(err){
            if (!err){
                console.log("Successfully deleted the checked item");
                res.redirect("/");
            }
        });
    } else {
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, (err, foundList) => {
            if (!err) {
                res.redirect("/" + listName);
            }
        });
    }
});

app.get("/:customListName", (req, res)=> {
    
    const customListName =  _.capitalize(req.params.customListName);

    List.findOne({ name: customListName}, (err, foundList) => {
        if (!err) {
            if (!foundList){
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
                list.save();
                res.redirect("/" + customListName);
            } else {
                res.render("list", {listTitle: foundList.name , newListItems: foundList.items});
            }
        }
    });

    const list = new List({
        name: customListName,
        items: defaultItems
    });

    list.save();
})

// app.get("/work", (req, res) => {
//     res.render("list", {listTitle: "Work List", newListItems: workItems})
// })

app.get("/about", (req, res) =>{
    res.render("about");
})

app.listen(3000, function(){
    console.log("Server started on port 3000");
})