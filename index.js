import express from 'express';
import axios from 'axios';
import cors from 'cors';
import bodyParser from 'body-parser';
import { GetAuthToken } from './dbImitation.js'; // Import GetAuthToken function







const port = 8081;
const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

/**
 * Simulates retrieving a list of equipment types with a delay.
 *
 * @returns {Promise<Array>} A promise that resolves with the simulated list of equipment types.
 */
export async function GetListEquipmentTypesMOCK() {
    await delay(500); // Simulating a delay of 500ms
  
    // Simulated list of equipment types
    const equipmentTypes = [
      { name: "reactor" },
      { name: "oven" },
      { name: "balances" },
      { name: "druck_filter" },
      { name: "nutsche_filter" },
      { name: "membrane_pump" },
      { name: "peristaltic_pump" },
    ];
  
    return equipmentTypes;
  }


// Endpoint to handle authentication and return token
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Call the GetAuthToken function to fetch the authorization token
        const token = await GetAuthToken(username, password);
        console.log("token:");
        console.log(token);
        
        // Return the token as JSON
        res.json({ token });
    } catch (error) {
        // Handle any errors that occur during token retrieval
        res.status(500).json({ error: 'Failed to fetch authorization token' });
    }
});


app.get("/equipment_list", async (req,res)=>{
    let equipmentTypes = await GetListEquipmentTypesMOCK();
    equipmentTypes = JSON.stringify(equipmentTypes);
    res.status(200).json(equipmentTypes);
})

app.listen(port,(err)=>{
    if(err) throw err;
    console.log("server is running on port: "+port)
})