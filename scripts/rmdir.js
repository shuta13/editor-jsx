"use strict";

const fs = require("fs");
const fsPromises = require("fs/promises");
const sysPath = require("path");

(async () => {
  const dirName = process.argv[2];
  if (!dirName || typeof dirName !== "string") {
    throw new Error("Invalid args");
  }

  const basePath = process.cwd();
  const dirPath = sysPath.resolve(basePath, dirName);
  if (!fs.existsSync(dirPath)) {
    throw new Error(`${dirName} is not exist`);
  }
  await fsPromises.rm(dirPath, { recursive: true }).catch((err) => {
    throw new Error(err);
  });
  console.log(`Succeed to remove ${dirName}`);
})();
