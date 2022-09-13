import mongoose from "mongoose"

const book = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    isbn : {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: false,
      },
    date : {
      type: String,
      required: true,
    },

    idLibrary: {
      type: String,
      required: true,
    },
    name: {
        type: String,
        required: true,
      },
    idBorrower : {
      type: String,
      required: false,
    },

    imageUrl: {
      type: String,
      required: false,
    },
    genre: {
        type: [String],
        required: true,
      },
    history: {
        type: [String],
        required: true,
      },
  }
)

module.exports = mongoose.model("Book", book)