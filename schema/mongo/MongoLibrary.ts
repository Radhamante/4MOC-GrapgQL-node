import mongoose from "mongoose"

const library = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name : {
      type: String,
      required: true,
    },
    adress: {
      type: String,
      required: true,
    },
    books: {
      type: [String],
      required: true,
      },
  }
)

module.exports = mongoose.model("Library", library)