const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    title: { type: String },
    state: {
      type: String,
      enum: ["open", "closed", "pending"],
      default: "open",
    }, // Make sure the enum correlates to the front end model and vice-versa
    description: { type: String },
  },
  { optimisticConcurrency: true }
);

// Duplicate the ID field.
// eslint-disable-next-line
issueSchema.virtual("id").get(function () {
  // eslint-disable-next-line
  return this._id.toString();
});

// Ensure virtual fields are serialised.
issueSchema.set("toJSON", {
  getters: true,
  virtuals: true,
});

issueSchema.set("toObject", {
  getters: true,
  virtuals: true,
});

module.exports = mongoose.model("Issue", issueSchema);
