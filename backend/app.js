const express = require ("express");
const cors = require ("cors");
const pokemonRoutes = require ("./routes/pokemonRoutes"); 
const connectDB = require ('./DB/dbConnection');
const Fight =require ("./models/FightSchema");
require('dotenv').config();




const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/pokemon', pokemonRoutes);

connectDB();

app.get('/api/test', (req, res) => {
    res.send('Server is up and running!');
});

/* app.post('/api/fight', async (req, res) => {
    const { pokemon1, pokemon2, winner, battleLog } = req.body; // Added battleLog

    try {
        const newFightResult = new FightResult({ pokemon1, pokemon2, battleLog, winner }); // Corrected FightResult
        await newFightResult.save();
        res.status(201).json({ message: 'Fight saved successfully!' });
    } catch (error) {
        console.error('Error saving fight:', error); // Log error for debugging
        res.status(500).json({ message: 'Error saving fight', error: error.message });
    }
}); */
// POST route to save fight result
app.post('/api/fight', async (req, res) => {
    const { pokemon1, pokemon2, winner, battleLog } = req.body;
  
    try {
      // Validate required fields
      if (!pokemon1 || !pokemon2 || !winner) {
        return res.status(400).json({ error: 'pokemon1, pokemon2, and winner are required fields' });
      }
  
      const newFight = new Fight({ pokemon1, pokemon2, winner, battleLog });
      const savedFight = await newFight.save();
      res.status(201).json(savedFight);
    } catch (error) {
      console.error('Error saving fight:', error);
      res.status(500).json({ error: 'Error saving fight' });
    }
  });
  

app.get('/api/fight-logs', async (req, res) => {
    try {
        const fight = await Fight.find().sort({ _id: -1 }).limit(20); // Corrected FightResult
        res.status(200).json(fight);
    } catch (error) {
        console.error('Error fetching fight logs:', error); // Log error for debugging
        res.status(500).json({ message: 'Error fetching fight logs', error: error.message });
    }
});


/* app.post('/api/fight', async (req, res) => {
    try {
        const fightData = new Fight(req.body);
        await fightData.save();
        res.status(200).send('Fight data saved successfully');
    } catch (error) {
        res.status(500).send('Error saving fight data');
    }
});
 */

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});