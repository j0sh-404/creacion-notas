
const express =require('express');
const router=express.Router();
router.get('/users/signin',(req,res)=>{
    res.render('users/signin');
});
router.get('/users/signup',(req,res)=>{
    res.render('users/signup');
});
router.post('/users/signup',(req,res)=>{
    const {name,email,password,confirm_password}=req.body;
    const errors=[];
    if(password!= confirm_password){
errors.push({text:'las contraseñas no coinciden'})
    }
    if(password.length<4){
        errors.push({text:'La contraseña debe tener almenos 5 caracteres'})
    }
    if(errors.length>0){
        res.render('users/signup',{errors,name,email,password,confirm_password});
    }else{
     res.send('ok');
    }
 
});

module.exports=router;