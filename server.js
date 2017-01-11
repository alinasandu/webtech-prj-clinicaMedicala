var express= require('express');
var bodyParser= require('body-parser');
var cors= require('cors');

var app = new express();
app.use(bodyParser.json());
app.use(cors());

var router=express.Router();

router.get('/', function(req,res){
   res.json({message:'welcome to our api!'}) ;
});


app.use('/api',router);

// necesary from nodeadmin
var nodeadmin = require('nodeadmin');
app.use(nodeadmin(app));


// i need for my database
var Sequelize=require("sequelize");

//initialization  sequelize connexion
var sequelize = new Sequelize('doctorsDB', 'alinasandu', null, {
    dialect: 'mysql',
    host: '127.0.0.1',
    port:3306
});


//define entity Doctor
  var Doctor=sequelize.define('doctors',{
    name: {
        type: Sequelize.STRING,
        field: 'name'
    },
    specialization: {
        type: Sequelize.STRING,
        field: 'specialization'
    },
    price: {
        type: Sequelize.FLOAT,
        field: 'price'
    },
    note: {
        type: Sequelize.FLOAT,
        field: 'note'
    },
     opinions: {
        type: Sequelize.STRING,
        field: 'opinions'
    }
}, {
    timestamps: false
});


//define entity Appointment

 var Appointment=sequelize.define('appointments',{
    name: {
        type: Sequelize.STRING,
        field: 'name'
    },
    doctor: {
        type: Sequelize.STRING,
        field: 'doctor'
    },
    specialization: {
        type: Sequelize.STRING,
        field: 'specialization'
    },
    Investigation: {
        type: Sequelize.STRING,
        field: 'Investigation'
    },
    
     email: {
        type: Sequelize.STRING,
        field: 'email'
    },
    details: {
        type: Sequelize.STRING,
        field: 'details'
    }
}, {
    timestamps: false
});



//create an appointment
app.post('/appointments', function(request,response) {
   Appointment.create(request.body).then(function(appointment){
       Appointment.findById(appointment.id).then(function(appointment){
           response.status(201).send(appointment);
       });
   });
});



//read  appointments by id
app.get('/appointments/:id', function(request,response){
   Appointment.findById(request.params.id).then(function(appointment){
       if(appointment){
           response.status(200).send(appointment);
       } else {
           response.status(404).send();
       }
   }) ;
});




//update  an appointment  by id
app.put('/appointments/:id',function(req,res){
   Appointment
        .findById(req.params.id)
        .then(function(appointment){
            if(appointment){
                appointment
                    .updateAttributes(req.body)
                    .then(function(){
                        res.status(200).send('updated');
                    })
                    .catch(function(error){
                        console.warn(error);
                        res.status(500).send('server error');
                    });
            } else {
                res.status(404).send();
            }
        });
});

//delete an appointment by id
app.delete('/appointments/:id',function(req,res){
    Appointment
        .findById(req.params.id)
        .then(function(appointment) {
            if(appointment){
              appointment
                    .destroy()
                    .then(function(){
                        res.status(204).send();
                    })
                    .catch(function(error){
                        console.warn((error));
                        res.status(500).send('server error');
                    });
            } else {
                res.status(404).send();
            }
        });
});



//create a doctor
app.post('/doctors', function(request,response) {
   Doctor.create(request.body).then(function(doctor){
       Doctor.findById(doctor.id).then(function(doctor){
           response.status(201).send(doctor);
       });
   });
});

//read all doctors
app.get('/doctors', function(request,response){
    Doctor.findAll().then(function(doctors){
        response.status(200).send(doctors);
    });
});

//read doctor by id
app.get('/doctors/:id', function(request,response){
   Doctor.findById(request.params.id).then(function(doctor){
       if(doctor){
           response.status(200).send(doctor);
       } else {
           response.status(404).send();
       }
   }) ;
});

//update doctor by id
app.put('/doctors/:id',function(request,response){
   Doctor
        .findById(request.params.id)
        .then(function(doctor){
            if(doctor){
                doctor
                    .updateAttributes(request.body)
                    .then(function(){
                        response.status(200).send('updated');
                    })
                    .catch(function(error){
                        console.warn(error);
                        response.status(500).send('server error');
                    });
            } else {
                response.status(404).send();
            }
        });
});

//delete a doctor by id
app.delete('/doctors/:id',function(request,response){
    Doctor
        .findById(request.params.id)
        .then(function(doctor) {
            if(doctor){
              doctor
                    .destroy()
                    .then(function(){
                        response.status(204).send();
                    })
                    .catch(function(error){
                        console.warn((error));
                        response.status(500).send('server error');
                    });
            } else {
                response.status(404).send();
            }
        });
});

// include static files in the admin folder
app.use(express.static('myApp'));
app.use('/admin', express.static('admin'));
app.use('/about', express.static('about'));
app.use('/specialization', express.static('specialization'));
app.use('/database2', express.static('database2'));

app.listen(process.env.PORT);