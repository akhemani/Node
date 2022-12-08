const app = require("./index");

const PORT = 8080;

app.listen(PORT, (err) => {
  if (err) console.log("error in starting server ", err);
  console.log(`server is listening on port ${PORT}...`);
});
