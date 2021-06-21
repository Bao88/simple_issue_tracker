const mongoose = require("mongoose");

// MongoDB configuration
const mongoDBConnectionString =
  `mongodb://` +
  `${process.env.MONGODB_HOST}:` +
  `${process.env.MONGODB_PORT}/` +
  `${process.env.MONGODB_DATABASE_NAME}`;

// Exit gracefully if the server is killed
process.on("SIGINT", () => {
  mongoose.disconnect();
  process.exit();
});

function connect(callerName) {
  // Start a MongoDB connection
  mongoose.connect(
    mongoDBConnectionString,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    },
    (error) => {
      if (error) {
        console.error(
          `${callerName}: Error connecting to MongoDB Database: ${error}`
        );
      } else {
        console.log(
          `${callerName} connected to Database: ${process.env.MONGODB_DATABASE_NAME} at ${process.env.MONGODB_HOST}`
        );
      }
    }
  );
}

module.exports = {
  connect,
  mongoose,
};
