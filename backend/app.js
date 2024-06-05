const express = require ("express");
const cors = require ("cors");
const pokemonRoutes = require ("./routes/pokemonRoutes");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/pokemon', pokemonRoutes);






app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});