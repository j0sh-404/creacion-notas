const express= require('express'); 
const path =require('path');
const exphbs=require('express-handlebars');
const methodOverride=require('method-override');
const session=require('express-session');
 const flash =require('connect-flash');
//initializacion
const app= express();
require('./database');

//setings
app.set('port',process.env.PORT||3000);
app.set('views',path.join(__dirname,'views'));//asignacion de ruta donde se encuentran las vistas
app.engine('.hbs',exphbs({
	defaultLayout:'main',
	layoutsDir:path.join(app.get('views'),'layouts'),
	partialsDir:path.join(app.get('views'),'partials'),
	extname:'.hbs'
}));

app.set('view engine','.hbs');


app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(session({
	secret:'mysecretapp',
	resave:true,
	saveUnitialized:true
}));
app.use(flash());


//Global Variables
app.use((req,res,next)=>{
	res.locals.succes_msg=req.flash('succes_msg');
	res.locals.error_msg=req.flash('error_msg');
next();
});
//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//Static files
app.use(express.static(path.join(__dirname,'public')));
//server is listenning

app.listen(app.get('port'),()=>{
 console.log('server on port',app.get('port'));
});