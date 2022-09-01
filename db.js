import mongoose from "mongoose"

try{
    mongoose.connect("mongodb://localhost:27017/wikiDB");
    console.log('Successfully Connected');
}catch(e){
    console.log('Failed to Connect');
}

const articleSchema = {
    title : String,
    content : String
};

export const Article = mongoose.model('Article', articleSchema);
