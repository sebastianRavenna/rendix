const http = require("http");
const path = require ("path");
const express = require("express");
const socketio = require("socket.io");

const mongoose = require ("mongoose")
mongoose.connect('mongodb+srv://sebastianravenna:jZO3UyEDQU1yFs5s@rendixchat.7h3ianx.mongodb.net/?retryWrites=true&w=majority&appName=rendixChat', { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('Mongoose is connected'))
 .catch(err => console.error('Connection error', err));

/*mongoose.connection.on('connected', () => {
 console.log('Mongoose connected to MongoDB');
});*/

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//conexion a db

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sebastianravenna:jZO3UyEDQU1yFs5s@rendixchat.7h3ianx.mongodb.net/?retryWrites=true&w=majority&appName=rendixChat";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



//configuracion
app.set("port", process.env.PORT || 3000)
require("./sockets")(io);

//archivos estaticos (que no cambian)
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
   });

//iniciando el server
server.listen (app.get("port"), () => {
    console.log ("server on port", app.get("port"))
});
