const postModel = require('../models/posts');

const post_index = function(req, res){
    console.log(`new request: ${req.url}`);
    postModel.find()
        .then(posts => {
            res.render('blog.ejs', {posts})
        })
        .catch((err) => console.log(err));
};

const post_details = function(req, res){
    const id = req.params.postID;
    postModel.findById(id)
        .then((result)=> {
            res.render("details.ejs", {post: result});
        })
        .catch((err)=>{
            console.log(err);
            res.status(404);
            post_index(req, res);
        });
};

const post_create = function(req, res){
    const new_entry = new postModel(req.body);
    new_entry.save()
        .then(()=> {console.log(new_entry)})
        .catch((err) => console.log(err));
};

const post_delete = function(req, res){
    const id = req.params.postID;
    postModel.findByIdAndDelete(id)
        .then(()=> {res.status(200).send()})
        .catch((error) => {
            console.log(error);
            res.status(500).send(error);
        });
};

module.exports = {
    post_index,
    post_details,
    post_create,
    post_delete,
}