const path = require("path");
const readDir = require("./IOhandler.js").readDir;
const grayScale = require("./IOhandler.js").grayScale;

/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");

IOhandler
    .unzip("myfile.zip", "unzipped")
    .then(() => readDir(pathUnzipped))
    .then((listOfImages) => grayScale(listOfImages, pathProcessed))
    .catch((err) => console.log(err));
    