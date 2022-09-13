import mongoose from "mongoose"

const user = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name : {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    books_borrowed: {
      type: [String],
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    historys: {
      type: [String],
      required: true,
    }
  }
)

module.exports = mongoose.model("User", user)