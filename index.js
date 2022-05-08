const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// middleware


app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4tiwk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const bookCollection = client.db('elevenAssignment').collection('book');

        app.get('/book', async (req, res) => {
            const query = {};
            const cursor = bookCollection.find(query);
            const books = await cursor.toArray();
            res.send(books);
        });

        app.get('/book/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const book = await bookCollection.findOne(query);
            res.send(book);
        });


        // POST
        app.post('/book', async (req, res) => {
            const newBook = req.body;
            const result = await bookCollection.insertOne(newBook);
            res.send(result);
        })



    }
    finally {

    }
}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Running book server');
});

app.listen(port, () => {
    console.log('listening to port', port);
})
