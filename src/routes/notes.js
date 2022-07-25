const express =require('express');
const router=express.Router();
const Note = require('../models/Note');
router.get('/notes/add',(req,res)=>{
    res.render('notes/new-note');
});

router.post('/notes/new-note',async(req,res)=>{
    const {title,description}=req.body;
    const errors =[];
    if(!title){
        errors.push({text:'porfavor escriba un titulo'})
    }
    if(!description){
        errors.push({text:'porfavor escriba una descripcion'})
    }
    
    if(errors.length>0){
        res.render('notes/new-note',{
             errors,
             title,
             description
        });
    }else{
      const newNote= new Note({title,description});
      await newNote.save();
      req.flash('succes_msg','Tu nota ha sido agregada correctamente');
      res.redirect('/notes');


    }

});

router.get('/notes',async(req,res)=>{
 const notes= await  Note.find().sort({date:'desc'});
 res.render('notes/all-notes',{notes});
});

 router.get('/notes/edit/:id', async(req,res)=>{
    const note= await Note.findById(req.params.id)
     res.render('notes/edit-note',{note})
 });
 router.put('/notes/edit-note/:id', async(req,res)=>{
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('succes_msg','Tu nota ha sido acualizada correctamente');
  res.redirect('/notes'); 
 });
 router.delete('/notes/delete/:id', async(req,res)=>{
     console.log(req.params.id)
     await Note.findByIdAndDelete(req.params.id)
     req.flash('succes_msg','Tu nota ha sido eliminada correctamente');
     res.redirect('/notes');
 })
module.exports=router;