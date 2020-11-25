let express = require("express");
let cors = require('cors');
let MongoClient = require("mongodb").MongoClient;
let bodyParser = require("body-parser");
let sanitizer = require("express-sanitizer");
let ObjectId = require("mongodb").ObjectId;

// MongoDB constants
const URL = "mongodb://localhost:27017/";
const DB_NAME = "dbPhotoAlbum";

// construct application object via express
let app = express();
// add cors as middleware
app.use(cors());

// add body-parser / sanitizer as middleware
app.use(bodyParser.json());
app.use(sanitizer());

// express static middleware - setup static files location
app.use("/", express.static('./build'));

// ----------------------------------------- get
app.get("/get", async (request, response) => {
    // construct MongoClient object for working with MongoDB
    let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });
    // Use connect method to connect to the server
    try {
        await mongoClient.connect(); 
        // convert all documents in technologies collection into array in one awesome statement!
        let techArray = await mongoClient.db(DB_NAME).collection("photos").find().sort("comments", -1).toArray();
        let json = { "photos": techArray };
        
        response.status(200);
        response.send(json);
    } catch (error) {
        response.status(500);
        response.send({error: error.message});
        throw error;
    } finally {
        // close mongoClient (connection to MongoDB server)
        mongoClient.close();
    }
});

// ----------------------------------------- post add
app.post("/post", async (request, response) => {
    // construct MongoClient object for working with MongoDB
    let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });
    // Use connect method to connect to the server
    try {
        await mongoClient.connect(); 

        // isolating all the incoming JSON
        // console.log(request.body);
        // console.log("BEFORE");
        // console.log(request.body.description);
        // request.body.description = request.sanitize(request.body.description);
        // console.log("AFTER");
        // console.log(request.body.description);

        // sanitize all the input
        request.body.title = request.sanitize(request.body.title);
        request.body.caption = request.sanitize(request.body.caption);
        request.body.source = request.sanitize(request.body.source);
        request.body.comments.forEach(comments => {
            comments.comment = request.sanitize(comments.comment);
            comments.author = request.sanitize(comments.author);
        });

        // insert a new document into the database
        let result = await mongoClient.db(DB_NAME).collection("photos").insertOne(request.body);

        // response with result JSON for client side to use
        response.status(200);
        response.send(result);     
    } catch (error) {
        response.status(500);
        response.send({error: error.message});
        throw error;
    } finally {
        // close mongoClient (connection to MongoDB server)
        mongoClient.close();
    }
});
app.post("/addComment/:id", async (request, response) => {
    let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });
    try {
        await mongoClient.connect(); 
        let id = new ObjectId(request.sanitize(request.params.id));

        /*request.body.title = request.sanitize(request.body.tile);
        request.body.description = request.sanitize(request.body.description);
        request.body.difficulty = request.sanitize(request.body.difficulty);*/
        request.body.comments.forEach(comment => {
            comment.author = request.sanitize(comment.author);
            comment.comment = request.sanitize(comment.comment);
        });
        let selector = { "_id":id };
        let newValues = { $push: {"comments": request.body.comments } };

        let result = await mongoClient.db(DB_NAME).collection("photos").updateOne(selector, newValues);

        if (JSON.parse(result).n <= 0) {
            response.status(404);
            response.send({error: "No technology documents found with ID"});
            mongoClient.close();
            return;
        }
        response.status(200);
        response.send(result);     
    } catch (error) {
        response.status(500);
        response.send({error: error.message});
        throw error;
    } finally {
        mongoClient.close();
    }
});
// ----------------------------------------- put update
app.put("/put/:id", async (request, response) => {
    // construct MongoClient object for working with MongoDB
    let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });
    // Use connect method to connect to the server
    try {
        await mongoClient.connect(); 

        // sanitize all the input
        let id = new ObjectId(request.sanitize(request.params.id));

        request.body.title = request.sanitize(request.body.tile);
        request.body.description = request.sanitize(request.body.description);
        request.body.difficulty = request.sanitize(request.body.difficulty);
        request.body.courses.forEach(course => {
            course.code = request.sanitize(course.code);
            course.name = request.sanitize(course.name);
        });

        // insert a new document into the database
        let selector = { "_id":id };
        let newValues = { $set: {"name": request.body.name, "description":request.body.description, 
                        "difficulty": request.body.difficulty, "courses": request.body.courses } };

        let result = await mongoClient.db(DB_NAME).collection("technologies").updateOne(selector, newValues);

        // check for no updates
        if (JSON.parse(result).n <= 0) {
            response.status(404);
            response.send({error: "No technology documents found with ID"});
            mongoClient.close();
            return;
        }

        // response with result JSON for client side to use
        response.status(200);
        response.send(result);     
    } catch (error) {
        response.status(500);
        response.send({error: error.message});
        throw error;
    } finally {
        // close mongoClient (connection to MongoDB server)
        mongoClient.close();
    }
});

// ----------------------------------------- Delete
app.delete("/delete/:id", async (request, response) => {
    let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });
    try {
        await mongoClient.connect(); 
        let id = new ObjectId(request.sanitize(request.params.id));
        let result = await mongoClient.db(DB_NAME).collection("technologies").deleteOne({_id:id});
        console.log(id);
        if (JSON.parse(result).n <= 0) {
            response.status(404);
            response.send({error: "No technology documents found with ID " + id});
            mongoClient.close();
            return;
        }
        response.status(200);
        response.send(result);     
    } catch (error) {
        response.status(500);
        response.send({error: error.message});
        throw error;
    } finally {
        mongoClient.close();
    }
});

app.listen(8080, () => console.log("Listening on port 8080"));