const superagent = require("superagent");
const fs = require("fs");

fs.readFile(__dirname + "/breed.txt", "utf8", (err, data) => {
  if (err) return console.log(err);

  superagent
    .get("https://dog.ceo/api/breed/" + data + "/images/random")
    .then((res) => {
      fs.writeFile(__dirname + "/breed-photos.txt", res.body.message, (err) => {
        if (err) return console.log(err);
        console.log("image saved");
      });
    })
    .catch((err) => {
      if (err) return console.log(err.message);
    });
});
