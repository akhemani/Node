const superagent = require("superagent");
const fs = require("fs");

const readFilePromise = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf8", (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const writeFilePromise = (fileName, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) return reject(err);
      resolve("image saved");
    });
  });
};

// readFilePromise(__dirname + "/breed.txt")
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err.message));

// fs.readFile(__dirname + "/breed.txt", "utf8", (err, data) => {

// readFilePromise(__dirname + "/breed.txt")
//   .then((data) => {
//     superagent
//       .get("https://dog.ceo/api/breed/" + data + "/images/random")
//       .then((res) => {
//         writeFilePromise(__dirname + "/breed-photos.txt", res.body.message);
//       })
//       .catch((err) => {
//         if (err) return console.log(err.message);
//       });
//   })
//   .catch((err) => {
//     if (err) return console.log(err);
//   });

readFilePromise(__dirname + "/breed.txt")
  .then((data) => {
    return superagent.get(
      "https://dog.ceo/api/breed/" + data + "/images/random"
    );
  })
  .then((res) => {
    return writeFilePromise(__dirname + "/breed-photos.txt", res.body.message);
  })
  .then((res) => console.log(res))
  .catch((err) => {
    if (err) return console.log(err.message);
  });
