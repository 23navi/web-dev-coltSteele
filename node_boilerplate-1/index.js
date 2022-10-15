if(process.env.NODE_ENV!== "production"){
    require('dotenv').config({ path: './config/dev.env' })
  }


const {app,server}= require("./app");
const PORT= process.env.PORT;

server.listen(PORT,()=>{
    console.log("Listening to port ",PORT);
})