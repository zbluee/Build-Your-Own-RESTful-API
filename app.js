import express from "express"
import bodyParser from "body-parser"
import {Article} from "./db.js"

const exp = express();
const port = 3000;

exp.use(bodyParser.urlencoded({extended : true}));
exp.set("view engine", "ejs");

// Requstes targeting all the aricles

exp.route("/articles")
    .get((req, res)=>{
        Article.find({}, (err, articles)=>{
            if (!err){
                res.send(articles);
            }else{
                res.send(err);
            }
        });
        
    })  
    .post((req, res)=>{
        const newArticle = new Article({
            title : req.body.title,
            content : req.body.content
        });
        newArticle.save((err)=>{
            if(!err){
                res.send("Successfully added a new Article.");
            }else{
                res.send(err);
            }
        });
    })
    .delete((req, res)=>{
        Article.deleteMany({},(err)=>{
            if(!err){
                res.send('Seccessfully deleted all the articles');
            }else{
                res.send(err);
            }
        });
    });

// Requstes targeting a Specific aricle

exp.route("/articles/:articleTitle")
    .get((req, res)=>{
        Article.findOne({title : req.params.articleTitle}, (err, foundArticle)=>{
            if(!err && foundArticle){
                res.send(foundArticle);
            }else{
                res.send("No article matching that title was found");
            }
        });
    })
    .put((req, res)=>{
        Article.replaceOne(
            {title : req.params.articleTitle},
            {title : req.body.title,
             content : req.body.content},(err)=>{
                if(!err){
                    res.send("Seccessfully updated the selected article");
                }else{
                    res.send(err);
                }
             });
    })
    .patch((req, res)=>{
        Article.updateOne(
            {title : req.params.articleTitle},
            {$set : req.body},
            (err)=>{
                if(!err){
                    res.send("Seccussfully updated article");
                }else{
                    res.send(err);
                }
            });
    })
    .delete((req, res)=>{
        Article.deleteOne({title : req.params.articleTitle}, (err)=>{
            if(!err){
                res.send("Seccessfully deleted the selected article");
            }else{
                res.send(err);
            }
        })
    });

exp.listen(port, ()=>{
    console.log(`The Server is running on ${port}`);
})