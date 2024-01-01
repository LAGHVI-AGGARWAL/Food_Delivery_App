const express = require('express')
const app = express()
const port = 5000
const mongoDB =  require("./db")

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())
app.use('/api',require("./routes/users"));
app.use('/api',require("./routes/DisplayData"));
app.use('/api',require("./routes/OrderData"));

app.listen(port, () => {
  mongoDB();
  console.log(`Example app listening on port ${port}`)
})
