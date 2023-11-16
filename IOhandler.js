/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

// const { rejects } = require("assert");
//const path = require('path');

// const dmZip = require("adm-zip");
const fs = require("fs");
const fsp = require("fs/promises");
//const { createReadStream, createWriteStream } = require("fs");

const AdmZip = require("adm-zip"),
  //fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  const zip = new AdmZip(pathIn);
  return new Promise((resolve, reject) => {
    zip.extractAllToAsync(pathOut, true, true, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log("Extraction operation complete");
        resolve(data);
      }
    });
  });
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  console.log("aaaa");
  return new Promise((resolve, reject) => {
    listOfImages = [];
    fsp
      .readdir(dir)
      .then((file) => {
        for (let images of file) {
          if (path.extname(images) === ".png") {
            images = "unzipped/" + images;
            listOfImages.push(images);
            console.log(images);
          }
        }
        resolve(listOfImages);
      })
      .catch((err) => {
        reject(err);
      });
  });
  //read directory and get png files
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */


const grayScale = (array, pathOut) => {
  return new Promise((resolve, reject) => {
    let pngCount = 0;
    for (imageLocation of array) {
      const newPathOut = path.join(pathOut,`output${pngCount}.png`)
      pngCount++
      const pathIn = path.join(__dirname, imageLocation);

      fs.createReadStream(pathIn)
        .pipe(new PNG({}))
        .on("parsed", function () {
          for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
              let idx = (this.width * y + x) << 2;
              let grayscale =
                this.data[idx] * 0.299 +
                this.data[idx + 1] * 0.587 +
                this.data[idx + 2] * 0.114;
              this.data[idx] = grayscale;
              this.data[idx + 1] = grayscale;
              this.data[idx + 2] = grayscale;
            }
          }
          this.pack().pipe(
            fs.createWriteStream(newPathOut).on("finish", () => resolve())
          );
        })
        .on("error", reject);
    }
  });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
