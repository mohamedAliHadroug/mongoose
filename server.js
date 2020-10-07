const mongoose = require('mongoose');

//Connect to the database

mongoose.connect('mongodb://localhost:27017/personsDB', { useNewUrlParser: true, useUnifiedTopology: true });

//schema

const personSchema = new mongoose.Schema({
    name : {type :String,
    required:[true, 'Please check your data entry, no name specified!']},
    age : Number,
    favoriteFoods : [{type: String}]
})

//Creating the Document

const Person = mongoose.model("Person", personSchema)


const person = new Person ({
  name : 'John',
  age : 30,
  favoriteFoods : ['Pizza', 'Coscous', 'Paella', 'Tacos']  
})

//Saving the document with  calback function


person.save(function(err, data){
if(err) {
    console.log(err);
} else {
    console.log(data);
}
})

//passing the data in the arrayOfPeople database

const arrayOfPeople=[
    {name: "John" , age: 20 , favoriteFoods: ["Haregma", "Chiken", "Fish"]} ,
    {name: "Naim" , age: 25 , favoriteFoods: ["Salad", "Pizza", "Meet"]} ,
    {name: "Samir" , age: 33 , favoriteFoods: ["Spaguetti", "Riz", "Burrito"]} ,
    {name: "Adam" , age: 80 , favoriteFoods: ["Cake", "Burrito", "Riz"]} ,
    {name: "Marya" , age: 30 , favoriteFoods: ["Cake", "Choclate", "Chips"]} ,
    {name: "Lasaad" , age: 50 , favoriteFoods: ["Milk", "Burrito", "Meat"]}]

//adding the data in mongodb

    const createManyPeople = (arrayOfPeople, done) => {
        Person.create(arrayOfPeople, (err, data) => {
          if (err) return done(err);
          return done(null, data);
        });
      };
      createManyPeople()

      
// searching person with specific name Naim and shows his data

Person.find({name: "Naim"}, (err, data)=>{
    if (err) {
        console.log(err);
    } else {
        console.log('the first person found with name Naim' + data)
    }
} )

//finding person who like a specific food as exemple Cake and Burrito and Riz

Person.findOne({favoriteFoods: [ "Cake", "Burrito", "Riz"]}, (err, data)=>{
    if (err) {
        console.log(err);
    } else {
        console.log('the first person Who like Cake,Burrito and Riz' + data)
    }
} )

//Searching person by a specific given id 5f7dff68cffe3d4a3c0f7a58

Person.findById("5f7dff68cffe3d4a3c0f7a58", (err, data)=>{
    if (err) {
        console.log(err);
    } else {
        console.log('the  person With the id 5f7dff68cffe3d4a3c0f7a58' + data)
    }
})

//Searching person by a specific given id 5f7dff68cffe3d4a3c0f7a58 and edit and save his favoriteFoods expl add "hamburger"

Person.findById("5f7dff68cffe3d4a3c0f7a58", (err, data)=>{
    if (err) {
        console.log(err);
    } else {
        data.favoriteFoods.push("hamburger")
        data.save()
        console.log('the  person With the id 5f7dff68cffe3d4a3c0f7a58 and updated' + data)
    }
})

// finding a person with a specific name exemple  Naim and updating his age to 20

Person.findOneAndUpdate({name:'Naim'}, {age: 20}, { new: true }, (err, data)=>{
    if (err) {
        console.log(err);
    } else {
        
        console.log('the  person With the name Naim and setting his age to 20' + data)
    }
})


// finding a person with a specific id exp 5f7dff68cffe3d4a3c0f7a58 and deleting it

Person.findByIdAndRemove("5f7dff68cffe3d4a3c0f7a58", (err, data)=>{
    if (err) {
        console.log(err);
    } else {
        
        console.log('the  person With the id 5f7dff68cffe3d4a3c0f7a58 and deleting it' + data)
    }
})

//deleting all the person of the name Marya

Person.deleteMany({name: 'Marya'}, (err, data)=>{
    if (err) {
        console.log(err);
    } else {
        
        done(null, data)
    }
})

//Find people who like Burrito. Sort them by name, limit the results to two documents, and hide their age

Person.find({favoriteFoods: { $all : ["Burrito"]}}).sort({'name':1}).limit(2).select('name favoriteFoods').exec((error,data)=>{
    if (error){console.log(error)}
    else {
      console.log("two People  like burrito "+data); }})