import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const pPeixe = new Schema({
  pratos: [{
    name: {
    type: String,
    required: [true, "É necessário um nome para o prato."],
    maxlength: [50, "O nome não pode conter mais de 50 caracteres"]
    },
    price: {
      type: Number,
      set: n => typeof n == "number" ? n.toFixed(2) : n
    },
    price2: {
      type: Number,
      set: n => typeof n == "number" ? n.toFixed(2) : n
    }
  }],
  date: { type: Date, default: Date.now }
});

const PratosPeixe = mongoose.models.PratosPeixe|| mongoose.model('PratosPeixe', pPeixe);

export default PratosPeixe;
