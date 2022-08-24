const https = require("https");
const url = require("url");
const buildBlockAlertMessage = require("./message_builder");
const parsed = url.parse(process.env.URL);

const postToSlack = (message, callback) => {
  var alertMessage = buildBlockAlertMessage(message);
  const postData = JSON.stringify(alertMessage);

  const options = {
    hostname: parsed.host,
    port: 443,
    path: parsed.pathname,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(postData),
    },
  };

  const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding("utf8");
    res.on("data", (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on("end", () => {
      console.log("No more data in response.");
      callback(null);
    });
  });

  req.on("error", (e) => {
    console.error(`problem with request: ${e.message}`);
    callback(e);
  });

  // Write data to request body
  req.write(postData);
  req.end();
};

module.exports = postToSlack;
