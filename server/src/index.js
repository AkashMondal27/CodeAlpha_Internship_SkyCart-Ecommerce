import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from './app.js'
import axios from "axios";

dotenv.config({
    path: "./.env"
})

// Render Keep-Alive
// ===============================
const url = "https://codealpha-internship-skycart-ecommerce.onrender.com";
const interval = 30000; // 30 seconds

function reloadWebsite() {
    axios
        .get(url)
        .then(() => {
            console.log("✅ Keep-alive request sent successfully");
        })
        .catch((error) => {
            console.error(`❌ Keep-alive error: ${error.message}`);
        });
}

setInterval(reloadWebsite, interval);


connectDB() 


// in dp we use async method which return some .then .catch
.then(()=>{
    app.listen(process.env.PORT || 5000 ,()=>{
        console.log(`Server is running at http://localhost:${process.env.PORT}`)
    })


    app.on("error", (error) => {
      console.error("❌ Application could not talk to the database:", error);
      throw error;
    })
})

.catch((err)=>{
   console.log("mongpDB connection failed !" , err)
})
