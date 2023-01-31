const connectToMongo = require("./db");
const express = require("express");
connectToMongo();
const app = express();
const port = 5000;
app.use(express.json());
app.use("/api/auth", require("./routes/auth")); //'/api/auth' => url for routing && require('./routes/auth') => file path in which we get this url i.e "auth.js"
app.use("/api/notes", require("./routes/notes")); // //'/api/notes' => url for routing && require('./routes/notes') => file path in which we get this url i.e "notes.js"

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
connectToMongo();
