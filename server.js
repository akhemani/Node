const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/config.env` });

const dbURL = process.env.MONGODB_URL.replace(
  "<PASSWORD>",
  process.env.MONGODB_PASSWORD
);
// console.log("dbURL: ", dbURL);
mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then((con) => console.log("db connected"))
  .catch((err) => console.log(err));

const app = require("./index");

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
