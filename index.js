import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


mongoose.set('strictQuery', true);

const app = express();

//Used to parse URL-encoded bodies
app.use(express.urlencoded());

dotenv.config();


//Now, print the available environment variables.
console.log(process.env.API_HOST);


async function connectToMongo() {
	const endpoint = 

	//'mongodb+srv://nedtheadmin:rNtIzpxVQ1k48S1P@my-new-cluster.u7spzrw.mongodb.net/test';
	
	'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1';

	await mongoose.connect(endpoint);
}

//if at any time there's an error...run this
connectToMongo().catch(err => console.log(err));




//Order is important here!  First the schema definition, then the model.
const lotrSchema = new mongoose.Schema({
	name: String,
	type: String,
	description: String
})

const Character = mongoose.model('Character', lotrSchema);


//Setting the following function to 'async' allows for the await keyword.
app.get('/', async function(request, response) {
	const characters = await Character.find();
	console.log(characters);
	response.send(characters);

})


app.get('/create/:name', function(request, response) {
	const character = new Character ({name: request.params.name, type: undefined, description: ""})
	console.log(character);
	character.save();
	response.send(`<h1>Created: ${character.name}</h1>`);
	console.log(request.body);
})



//Commands for a read request.
app.get('/read', async function(request, response) {
	const characters = await Character.find();
	console.log(characters);
	response.send(characters);
})

//Commands for an update request.
app.get('/update', async function(request, response) {
	const characters = await Character.find();
	console.log(characters);
	response.send(characters);
})



app.listen('2000');



