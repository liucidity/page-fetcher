const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const writeToFile = function (localPath, data) {
  // console.log('writing to file call');
  fs.writeFile(localPath, data, (err) => {
    if (err) console.error(err);
    console.log('wrote to File');
    console.log(`Downloaded and saved ${data.length} to ${localPath}`);
  });
  rl.close();
};

const fetcher = function (URL, localPath) {
  const directory =
    request(URL, (err, response, body) => {
      if (err) {
        return console.error(err);
      }

      console.log(response.statusCode);
      if (response.statusCode !== 200) {
        return console.log('URL is invalid');
      }

      if (!localPath) {
        return console.log('invalid or no path was given');
      }

      if (!fs.existsSync(directory));

      //check if file exists
      if (!fs.existsSync(localPath)) {
        writeToFile(localPath, body);
        // process.exit();
      } else {
        rl.question("File already exists, would you like to overwrite? ", (answer) => {
          console.log(answer);
          if (answer.toLowerCase() === "y") {
            // console.log(body);
            // console.log(localPath);
            writeToFile(localPath, body);
          } else {
            console.log('skipped');
            process.exit();
          }
        });
      }

    });

};


fetcher("http://www.example.edu", "./index.html");
// fetcher(process.argv[2], process.argv[3]);

//edge cases
//2. file path is invalid, app should fail and let user know about issue
