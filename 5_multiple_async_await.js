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

    const getImage1 = superagent.get(
      "https://dog.ceo/api/breed/" + readFile + "/images/random"
    );

    const getImage2 = superagent.get(
      "https://dog.ceo/api/breed/" + readFile + "/images/random"
    );

    const getImage3 = superagent.get(
      "https://dog.ceo/api/breed/" + readFile + "/images/random"
    );

    const getImage4 = superagent.get(
      "https://dog.ceo/api/breed/" + readFile + "/images/random"
    );

    const getImages = await Promise.all([
      getImage1,
      getImage2,
      getImage3,
      getImage4,
    ]);
    const images = getImages.map((image) => image.body.message).join("\n");

    const saveImage = await writeFilePromise(
      __dirname + "/breed-photos.txt",
      images
    );
    console.log(saveImage);
  } catch (err) {
    console.log(err);
  }
};

saveDogImage();
