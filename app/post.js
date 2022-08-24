const postToSlack = require("./src/post_message");

const sendMessage = (record, callback) => {
  if (!record || !record.Sns || !record.Sns.Message) {
    callback(null);
  }
  postToSlack(record.Sns.Message, callback);
};

exports.handler = function (event, context, callback) {
  if (!event.Records) {
    console.log("No records to process");
    return callback(null);
  }
  var count = event.Records.length;
  for (var n = 0; n < event.Records.length; n++) {
    sendMessage(event.Records[n], function (err) {
      console.log(err);
      if (--count === 0) {
        callback(null);
      }
    });
  }
};

if (process.env.TEST) {
  const testEvent = {
    Records: [
      {
        Sns: {
          Message: "Test message",
        },
      },
    ],
  };
  exports.handler(testEvent, {}, console.log);
}
