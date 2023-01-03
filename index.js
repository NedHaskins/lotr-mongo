import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';


mongoose.set('strictQuery', true);

const app = express();

//Used to parse URL-encoded bodies
app.use(express.urlencoded());

dotenv.config();


//Now, print the available environment variables.
console.log(process.env.API_HOST);


async function connectToMongo() {
	const endpoint = 

	//Cloud instance of MongoDB 
	// `mongodb+srv://nedtheadmin:${process.env.PASSWORD}@my-new-cluster.u7spzrw.mongodb.net/test`;
	
	//Local instance of MongoDB
	// 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1';

	//Railway MongoDB instance - data will be stored here
	`mongodb://mongo:${process.env.RAILPASSWORD}@containers-us-west-79.railway.app:7267`;

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
app.get('/', function(request, response) {

	const form = `
		<form action='/add' method='POST'>
			<label>Name</label>
			<input type='text' name='name' />
			<label>Type</label>
			<input type='text' name='type' />
			<button type='submit'>Submit</button>
		</form>
	`;

	response.send(form);
})


app.post('/add', async function(request, response) {
	console.log(request.body);
	const character = new Character(request.body); //why does request.params not work here?
	await character.save();
	console.log(character);
	response.redirect('/');
})

//Commands for a read request.
app.get('/characters', async function(request, response) {
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


//this is set up this way for the Railway deployment
app.listen(process.env.PORT);



