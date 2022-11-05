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

const saveDogImage = async () => {
  try {
    const readFile = await readFilePromise(__dirname + "/breed.txt");
    // console.log(readFile);

    const getImage = await superagent.get(
      "https://dog.ceo/api/breed/" + readFile + "/images/random"
    );
    // console.log(getImage);

    const saveImage = await writeFilePromise(
      __dirname + "/breed-photos.txt",
      getImage.body.message
    );
    console.log(saveImage);
  } catch (err) {
    console.log(err);
  }
};

saveDogImage();

// we can use IIF here also