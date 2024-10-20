const mongoose = require('mongoose');
const postModel = require('./models/posts');

const uri = "mongodb+srv://me:me@first.cujob52.mongodb.net/?retryWrites=true&w=majority&appName=first";

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})


function createEntries() {
    const posts = [
        {title: "New Post", content: "New Post Content"},
        {title: 'Yoshi finds eggs', content: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', content: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', content: 'Lorem ipsum dolor sit amet consectetur'},
    ];
    posts.forEach(post => {
        const new_entry = new postModel(post);
        new_entry.save()
            .then(() => console.log('Process finished successfully.'))
            .catch((err) => console.log(err));
    });
};

createEntries();