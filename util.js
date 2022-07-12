
const fs = require("fs");

function writeDataToFile(filename, content) {
    console.log("WRITEDATA");
  fs.writeFileSync(filename, JSON.stringify(content,null,4), "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
}

function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(err);
    }
  });  
}

module.exports = {
    writeDataToFile,
  getPostData,
};
