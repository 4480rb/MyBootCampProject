const express=require('express');
const cors=require("cors")
const app=express();

require('./config/db')
app.use(express.json())
app.use(cors())

const userRouter = require('./routes/userRouter');
const movieRouter = require('./routes/movieRouter');
const memberRouter = require('./routes/memberRouter');
const subscriptionsRouter = require('./routes/subscriptionsRouter');
const authinticationRouter = require('./routes/authinticationRouter');
const otherRouter = require('./routes/otherRouter');
const filterRouter=require('./routes/filterRouter')
app.use("/users",userRouter)
app.use("/movies",movieRouter)
app.use("/members",memberRouter)
app.use("/subscriptionses",subscriptionsRouter)
app.use("/authintications",authinticationRouter)
app.use("/other",otherRouter)
app.use("/filter",filterRouter)

const port=8000;
app.listen(port,()=>{
    console.log(`in server! run on port ${port}`);
})