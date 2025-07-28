const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser')
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const multer = require('multer');
const { default: mongoose, Schema } = require('mongoose');
const { error, timeStamp } = require('console');
const { type } = require('os');
const { Session } = require('inspector/promises');
const PORT = 8080;
const session = require('express-session');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretkey = "your-secret-key";
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 600000
    }
}));
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({storage});
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
console.log(cloudinary.config());
const url = 'mongodb://localhost:27017/blog';
// mongodb+srv://MeshwaShah2003:Admin123@cluster0.vjixrb5.mongodb.net/blog
mongoose.connect(url)
.then(() => console.log(`MongoDB connected`))
.catch((err) => console.log(err));
const BlogSchema = new mongoose.Schema({
name: {
    type: String,
    default: 'Meshwa shah'
}, 
title:{
    type: String,
    require: true
},
description: {
    type: String,
    require: true
},
category: {
    type: String,
    require: true
},
image: {
   url:{
            type: String,
            require: true
        },
        public_id: {
             type: String,
            require: true
        }
},
isPublished: {
    type: Boolean,
    default: true
},
date: {
    type: Date,
    default: Date.now()
},
subTitle:{
 type: String,
 require: true
},
comments: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
]
},{timestamps: true});
const CommentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
   
    image:{
        type:String,
        require: true
    },
    comment:{
          type:String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
},{timestamps: true});
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    image:{
        url:{
            type: String,
            require: true
        },
        public_id: {
             type: String,
            require: true
        }
    },
    password:{
        type: String,
        require: true
    }
},{timestamps:true});

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

const User = mongoose.model('User', UserSchema);
const Blog = mongoose.model('Blog', BlogSchema);
const Comment  = mongoose.model('Comment', CommentSchema);
const Admin = mongoose.model('Admin', AdminSchema);
app.post('/upload', upload.single('image') ,async(req, res) => {
try{
    const {name, title, description, category, subTitle, isPublished} = req.body;
    const file = req.file;
    if(!title || !description || !subTitle){res.send('pls select a file')}
    else{
//const base64Image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'uploads/'
    });
    fs.unlinkSync(req.file.path);
    const addblog  = new Blog({
        name: name,
        title: title,
        description: description,
        category: category,
        image: {
            url:result.secure_url,
            public_id: result.public_id,
        },
        subTitle: subTitle,
        isPublished: isPublished
    })
    
    await addblog.save();
    if(addblog){
        res.json({success: true, addblog: addblog});
    }
    else{
        res.status(501).send("Error");
    }
}
}
catch(err){
    res.status(501).send(`Error: ${err}`)
}  
});
app.post('/updateblog', async(req, res) => {
const{title, type, value} = req.body;
const updated = {[type]: value}
try{
    const update = await Blog.findOneAndUpdate(
       {title: title},
       {$set: updated},
       {new: true}
    )
    if(update){
        res.json({success: true, message: 'Blog updated', data: update});
    }
    else{
         res.json({success: false, message: 'Blog not updated'});
    }
}
catch(err){
 res.status(501).send(err);
}
});
app.post('/checktitle', async(req, res) => {
  const {title} = req.body;
  try{
    const find = await Blog.findOne({title: title});
    if(find){
        res.json({success: true, message: "Blog title already exists"});
    }
    else{
         res.json({success: false});
    }
  }
  catch(err){
    res.status(501).send(err);
  }
});
app.post('/deletecomment', async (req, res) => {
    const {id, cid} = req.body;
    try{
         const [deletecom, deleteblog] = await Promise.all([
            Comment.findByIdAndDelete({_id: cid}),
            Blog.findByIdAndUpdate(
                {_id: id},
                {$pull: {comments: {_id: cid}}},
                {new: true}
            ).populate('comments')
         ]);
         if(deletecom && deleteblog){
            res.json({success: true, message: "comment deleted", blogdata: deleteblog});
         }
         else{
            res.json({success: false, message: "comment not deleted"});
         }
    }
    catch(err){
       res.status(501).send(err);
    }
})
app.post('/user' ,upload.single('image'), async(req, res) => {
try{
    const {name, email, password} = req.body;
    const file = req.file;
     
    if(!name || !email || !password){
        res.status(501).send("Please select");
    }
   
    else{

    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'uploads/'
    });
     fs.unlinkSync(req.file.path);
    const adduser  = new User({
        name: name,
        email: email,
        image: {
            url:result.secure_url,
            public_id: result.public_id,
        },
        password: password
    });
   
    await adduser.save();
    if(adduser){
        res.json({success: true, message: "Your account created successfully", data: adduser});
    }
    else{
        res.json({success: false, message: "User not created try again"});
    }
}
}
catch(err){
    res.status(501).send(err)
}
});

app.post('/editblog', async(req, res) => {
   const{id, description} = req.body;
   try{
   const edit = await Blog.findByIdAndUpdate(
    {_id: id},
    {$set: {description: description}},
    {new: true})

    if(edit){
        res.json({success: true, blog: edit});
    }
    else{
         res.json({success: true, message: "Blog not updated"});
    }
 }
 catch(err){
    res.status(501).send(err);
 }
})
app.post('/checkmail', async(req, res) => {
    const{email} = req.body;
    try{
      const findemail = await User.findOne({email: email});
      if(findemail){
        res.json({success: true, message: "Email already exists"});
      }
      else{
        res.json({success: false});
      }
    }
    catch(err){
      res.status(501).send(err);
    }
})
app.put('/updateuser', async(req, res) => {
  const{email, password} = req.body;
  try{
    const update = await User.findOneAndUpdate(
        {email: email},
        {$set: {password: password}},
        {new: true}
    )
    if(update){res.send(update)}
    else{res.send("Not updated");}
  }
  catch(err){
    res.status(501).send(err);
  }
})
app.get('/blogs', async (req, res) => {
    try{
    const blog = await Blog.find({});
    if(blog){
        res.json(blog);
    }
    else{
          res.json({success: false, message: 'something occcured'});
    }
    }
    catch(err){
        res.json({success: false, message: err});
    }
});
app.post('/comments', async(req, res) => {
    try{
    const{name, id, image, comment} = req.body;
    const addcom =  new Comment({
        name: name,
        image: image,
        comment: comment
    });
    await addcom.save();
    const addtoblog = await Blog.findByIdAndUpdate(
        {_id: id},
        {$push: {"comments": addcom._id}},
        {new: true}
    ).populate('comments');
    if(addtoblog){
        res.send(addtoblog)
    }
    else{
        res.json({succes: false, message: "comment not added"})
    }
}
catch(err){
  res.json({succes: false, message: "something occured"})
}
})
 app.delete('/des', async (req, res) => {
   try{
     const {id} = req.body;
     const result = await cloudinary.uploader.destroy(id);
     if(result.result === 'ok'){
        res.status(200).json({message: `deleted successfully` });
     }
     else{
        res.status(501).json({message: `deletion failed` });
     }
   }
   catch(err){
    res.status(501).send(`error: ${err}`);
   }
    
})

app.post('/delete', async(req, res) => {
try{
    const {id} = req.body;
  const deletedblog = await Blog.findByIdAndDelete({_id: id});
  if(deletedblog){
    const blogdata = await Blog.find({});
    res.json({success: true, blogdata: blogdata});
  }
  else{
    res.json({success: false, message: 'blog not deleted'});
  }
}
catch(err){
res.status(501).send(err)
}
})
app.post('/findblog', async(req, res) => {
    const{id} = req.body;
    try{
      const find = await Blog.findOne({_id: id}).populate('comments');
      if(find){
        res.send(find);
      }
      else{
        res.json({success: false, message: "something occured"})
      }
    }
    catch(err){
     res.json({success: false, message: err})
    }
})
app.post('/pub', async(req, res) => {
    const{id, isPublished} = req.body;
    try{
    const update = await Blog.findByIdAndUpdate(
        {_id: id},
        {$set: {isPublished: isPublished}},
        {new: true}
    );
    if(update){
        const blog = await Blog.find({});
        if(blog){res.json({success: true, message: "Blog type updated", data: blog});}
        else{res.json({success: false, message: "error sending the blog data"});}
    }
    else{
     res.json({success: false, message: "sorry try again"});
    }
}
catch(err){
    res.status(501).send(err);
}
})
app.post('/checkuser', async(req, res) => {
  const {email, password } = req.body;
  try{
   const finduser = await User.findOne({email: email});
   if(finduser){
    if(finduser.password !== password){res.json({success: false, message:"wrong password"})};

    res.json({success: true, data: finduser});

   }
   else{
     res.json({success: false, message:"user not found"});
    
   }
  }
  catch(err){
    res.status(501).send(err);
  }
});
app.post('/admin', async(req, res) => {
  try{
    const{email, password} = req.body;
    const newadmin = new Admin({
        email: email,
        password: password
    })
    await newadmin.save();
    if(newadmin){
        res.json({success: true, data: newadmin});
    }
    else{
        res.json({success: false, message: "Admin not added"});
    }
  }
  catch(err){
      const error = err;
      res.status(501).json({message: error})
  }
})
app.post('/checkadmin', async(req, res) => {
  const {email, password} = req.body;
  const mail = {email};
  try{
   const findadmin = await Admin.findOne({email: email});
    if(findadmin){
    if(findadmin.password !== password){res.json({success: false, message: "Wrong password"});}
    const token = jwt.sign(mail, secretkey);
    res.json({success: true, token: token});

   }
   else{
     res.json({success: false, message:"Admin data not found"});
    
   }
  }
  catch(err){
    res.status(501).json({success: false, message: err});
  }
});


app.get('/send', async(req, res) => {
  
  try{
    const blogdata = await Blog.find();
    const commentdata = await Comment.find();
    if(blogdata && commentdata){
        res.json({success: true, blogdata: blogdata, commentdata: commentdata});
    }
    else{
        res.json({success: false, message: 'data not found'});
    }
  }
  catch(err){
    res.status(501).send(err);
  }
})
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})