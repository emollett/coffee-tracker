const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");

const API_PORT = 3001;
const app = express();
const router = express.Router();

const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(3001);
// WARNING: app.listen(80) will NOT work here!

//We are using socket.io to send messages that trigger the data to be updated on the client. See below for the emits on various events happening
io.on("connection", function (socket) {
  console.log("client connected");
	setTimeout(()=>{
  	socket.emit("NewData");
	}, 4000);
});

// this is our MongoDB database
const dbRoute = "mongodb://localhost:27017/coffee-tracker";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  {    useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// this is our get method
// this method fetches all available data in our database
router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Data.findByIdAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    //sends a message when data is updated, which triggers the client to get the data again
    io.emit( "NewData" );
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findByIdAndDelete(id, err => {
    if (err) return res.send(err);
    //sends a message when data is deleted, which triggers the client to get the data again
    io.emit( "NewData" );
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
  let data = new Data();

  const { id, message, coffee, name, date } = req.body;

  if ((!id && id !== 0) || !name || !coffee ) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.message = message;
  data.id = id;
  data.coffee = coffee;
  data.date = date;
  data.name = name;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    //sends a message when data is first created, which triggers the client to get the data again
    io.emit( "NewData" );
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use("/api/", router);
