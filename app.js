console.log('im on a node server, yo');

require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
const { ObjectId } = require('mongodb')
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://rmcdowra:${process.env.MONGO_PWD}@cluster0.0bqty.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`; 

console.log(uri);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('./public/'))
app.set('view engine', 'ejs')



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


// ------------------------------------------

app.get('/mongo', async (req, res)=>{

  await client.connect();
  console.log("connected?");
  // Send a ping to confirm a successful connection
  let result = await client.db("reeds-db").collection("whatever-collection").find({}).toArray()
    console.log(result);

    res.render('mongo', {
      mongoResult: result
    });

})


app.get('/', function (req, res) {
  // res.send('Hello World')
  res.sendFile('index.html')
})

app.get('/ejs', (req,res)=>{
``
  res.render('index', {
    myServerVariable : "something from server"
  });

  //can you get content from client...to console? 
})

app.get('/read', async (req,res)=> {
  console.log('in /read');
  await client.connect();
  
  console.log('connected?');
  // Send a ping to confirm a successful connection
  
  let result = await client.db("reeds-db").collection("whatever-collection")
    .find({}).toArray(); 
  console.log(result); 

  res.render('read', {
    postData : result
  });

})

app.get('/insert', async (req,res)=> {

  //connect to the db
  await client.connect();
  //point to the collection
  await client.db("reeds-db").collection("whatever-collection").insertOne({post:'hardcoded post insert'});
  await client.db("reeds-db").collection("whatever-collection").insertOne({ iJustMadeThisUp: 'hardcoded new key '});  
  // insert into it
  res.render('insert');

});
app.post('/update/:id', async (req,res)=>{

  console.log("req.parms.id: ", req.params.id)

  client.connect; 
  const collection = client.db("reeds-db").collection("whatever-collection");
  let result = await collection.findOneAndUpdate( 
  {"_id": new ObjectId(req.params.id)}, { $set: {"post": "NEW POST" } }
)
.then(result => {
  console.log(result); 
  res.redirect('/read');
})

});

app.post('/delete/:id', async (req,res)=>{

  console.log("req.parms.id: ", req.params.id)

  client.connect; 
  const collection = client.db("reeds-db").collection("whatever-collection");
  let result = await collection.findOneAndDelete( 
  {"_id": new ObjectId(req.params.id)})

.then(result => {
  console.log(result); 
  res.redirect('/read');
})

  //insert into it

})



app.listen(3000)
