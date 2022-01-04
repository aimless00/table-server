const express = require('express')
const app = express();
const { MongoClient } = require('mongodb');
const cors = require('cors')
const Objectid = require('mongodb').ObjectId;


const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://tables:W47PVAM5dXJi4Ajz@cluster0.jam0x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("tables");
        const dataCollection = database.collection("tablesData");

        app.get('/tablesData', async (req, res) => {
            const users = dataCollection.find({})
            const result = await users.toArray();
            res.send(result)
        })
        //Delete api
        app.delete('/tablesData/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: Objectid(id) };
            const result = await dataCollection.deleteOne(query);
            res.send(result)
        });
    }
    finally {
        // await client.close();
    }

}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Welcome My server site!')
})

app.listen(port, () => {
    console.log(` listening at ${port}`)
})