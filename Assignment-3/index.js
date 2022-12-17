// run `node index.js` in the terminal
/**
 * CSCI2720/ESTR2106 Assignment 3
 * Using Database via Node.js
 *
 * I declare that the assignment here submitted is original
 * except for source material explicitly acknowledged,
 * and that the same or closely related material has not been
 * previously submitted for another course.
 * I also acknowledge that I am aware of University policy and
 * regulations on honesty in academic work, and of the disciplinary
 * guidelines and procedures applicable to breaches of such
 * policy and regulations, as contained in the website.
 *
 * University Guideline on Academic Honesty:
 *   http://www.cuhk.edu.hk/policy/academichonesty
 * Faculty of Engineering Guidelines to Academic Honesty:
 *   https://www.erg.cuhk.edu.hk/erg/AcademicHonesty
 *
 * Student Name: Kaan Simsek
 * Student ID  : 1155191086 
 * Date        : 15.12.2022 
 */

const express = require('express');
const app = express();
const path = require('path')
var mongoose = require('mongoose');

async function connect(){
  try{
    await mongoose.connect('mongodb+srv://stu123:p475092W@cluster0.gbo7pn3.mongodb.net/stu123');
    
    
  }catch(error){
    console.log(error);
  }
}

connect();
const db = mongoose.connection;
// Upon connection failure
db.on('error', console.error.bind(console, 'Connection error:'));
// Upon opening the database successfully
db.once('open', function () {
  console.log("Connection is open...");
  const LocationSchema = mongoose.Schema({
    locId:{type:Number, required:true},
    name:{type:String, required:true},
    quota:{type:Number}
  });
  const EventSchema = mongoose.Schema({
    eventId: { type: Number, required: true},
    name: { type: String, required: true },
    loc: { type: LocationSchema },
    quota: { type: Number }
  });

  const Loc = mongoose.model('Loc',LocationSchema);
  const Event = mongoose.model('Event', EventSchema);

  async function addPreLocations(){
    let arrLocId=[3,4,5];
    let arrLocName=['New York','Tokyo','Marakesh'];
    let locQuota=[10,2,7];
    for(let i=0;i<(arrLocId).length;i++){
      Loc.create({
        locId:arrLocId[i],
        name:arrLocName[i],
        quota:locQuota[i]
      });
    }
  }
  //addPreLocations();
  app.use(express.static(path.join(__dirname, '')));
  

  // This module is for parsing the content in a request body (installed with npm)
  const bodyParser = require('body-parser');
  // Use parser to obtain the content in the body of a request
  const router = express.Router();

  router.get('/event',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
  });

  app.get('/update',function(req,res){
    res.sendFile(path.join(__dirname+'/update.html'));
  });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json())
  app.get('/ev/:eventId', async (req, res) => {
    console.log("Entered to get");
    const eventId=req.params['eventId']
    const event =await Event.findOne(
      { eventId: eventId });
    if (event){
      res.status(200).send("{\n\"eventId\": " + event.eventId + ",<br>\n" +
            "\"name\": " + event.name + ",<br>\n" +
            "\"loc\":" + "<br>\n" +
            "{<br>\n"+
            "\"locId\":" +event.loc.locId + ",<br>\n" +
            "\"locName\":"+ event.loc.name +"<br>\n"+
            "}<br>\n"+
            "quota: " + event.quota + "<br>\n}");
    }
    else{
      res.status(404).send("Event with event-id=>"+eventId+" can not be found.")
    }
  });

  app.get('/ev',async (req,res)=>{
    if(req.query.q){
      const quota = req.query.q
      const events =await Event.find(
        { quota: quota });
        if (events){
          str="[\n";
            events.forEach(e=>str=str+"{\n\"eventId\": " + e.eventId + ",<br>\n" +
            "\"name\": " + e.name + ",<br>\n" +
            "\"loc\":" + "<br>\n" +
            "{<br>\n"+
            "\"locId\":" +e.loc.locId + ",<br>\n" +
            "\"locName\":"+ e.loc.name +"<br>\n"+
            "}<br>\n"+
            "quota: " + e.quota + "<br>\n},\n");
            str+="]";
            res.status(200).send(str);
        }
        else{
          res.status(404).send("Event with event-id=>"+quota+" can not be found.")
        }
    }
    else{
      Event.find().exec(function(err,users){
        if(err)
          res.send(err)
        else{
          str="[\n";
          users.forEach(e=>str=str+"{\n\"eventId\": " + e.eventId + ",<br>\n" +
          "\"name\": " + e.name + ",<br>\n" +
          "\"loc\":" + "<br>\n" +
          "{<br>\n"+
          "\"locId\":" +e.loc.locId + ",<br>\n" +
          "\"locName\":"+ e.loc.name +"<br>\n"+
          "}<br>\n"+
          "quota: " + e.quota + "<br>\n},\n");
          str+="]";
          res.send(str);
        }
      })
    }
    
  });
  app.get('/lo/:locId',async (req,res)=>{
    const locId= req.params['locId']
    const loc = await Loc.findOne(
      {locId:locId}
    );

    if(loc)
      res.status(200).send("{\n\"locId\": " + loc.locId + ",<br>\n" +
      "\"name\": " + loc.name + ",<br>\n" +
      "quota: " + loc.quota + "<br>\n}");
    else{
        res.status(404).send("Location id=>"+locId+" can not be found")
    }
  });
  app.get('/lo',(req,res)=>{
    Loc.find().exec(function(err,users){
      if(err)
        res.status(200).send(err);
      else{
        str="[\n";
        users.forEach(e=>str=str+"{\n\"locId\": " + e.locId + ",<br>\n" +
        "\"name\": " + e.name + ",<br>\n" +
        "quota: " + e.quota + "<br>\n},\n")
        str+="]";
        res.status(400).send(str);
      }
    })
  })
  
  // handle POST request
  app.delete('/ev/:eventId',async(req,res)=>{
    let id = req.params.eventId;
    console.log("aaaa"+id);
    const deleted = await Event.remove({ eventId: id}, ()=>{console.log('error')});
    if(deleted){
      res.status(204).json("Successfull");
    }
    else{
      res.status(404).json("Can not found event to delete")
    }
      
  })
  app.post('/ev', async (req, res) => {
    let re=await Event.findOne().sort({eventId:-1}).select('eventId');
    let id=0;
    if (re===null){
      id=-1;
    }
    else{
      id = re['eventId']+1;
    }
    let location = await Loc.findOne({locId:+req.body['loc']});
    if(location){
      let quota=(+req.body['quota'])
      console.log(req.body['quota'],"aa",location.quota)
      if(quota>location.quota){
        res.send("Quota of your event exceeds quota of location.")
      }
      else{
        console.log(location)
        const event=await Event.create({
          eventId: id,
          name: req.body['name'],
          loc: location,
          quota: quota,
        })
        if(event){
          res.status(201).send(event)
        }
        else{
          res.status(404).send("Can not find event")
        }
      }
    }
    else{
      res.send("Can not found location")
    }
    
   
  });

  app.put('/ev/:eventId',async(req,res)=>{
    res.set('Content-Type',"application/json")
    let id = req.params.eventId;
    const {name,quota,locId}=req.body
    console.log(name,quota,locId);
    const location=await Loc.findOne({locId})
    const update={name: name,
      loc: location,
      quota: quota
      }
      const filter = { eventId: id };
      const updatedEvent=await Event.updateOne(filter,update)
      res.status(200).send(updatedEvent)
  })

  app.get('/load/:eventId',async (req,res)=>{
    const eventId=req.params['eventId']
    const event =await Event.findOne(
      { eventId: eventId });
    if (event){
      res.status(200).send(event);
    }
    else{
      res.status(404).send("Event with event-id=>"+eventId+" can not be found.")
    }
  });

  
})
// listen to port 3000
const server = app.listen(3000);
