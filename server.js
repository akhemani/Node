const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/config.env` });
// console.log(process.env);

const app = require("./index");

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
