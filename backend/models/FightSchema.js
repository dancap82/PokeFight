/* const mongoose = require('mongoose');

const fightResultSchema = new mongoose.Schema({
  Pokemon1: String,
  Pokemon2: String,
  battleLog: [String],
  winner: String
});

const FightResult = mongoose.model('Fight', fightResultSchema);

module.exports = FightResult;
 */
// models/fightSchema.js

const mongoose = require('mongoose');

const fightSchema = new mongoose.Schema({
  pokemon1: { type: String, required: true },
  pokemon2: { type: String, required: true },
  winner: { type: String, required: true },
  battleLog: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Fight', fightSchema);
