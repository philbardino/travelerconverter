var AWS = require("aws-sdk");
var http = require("http");

exports.handler = (event, context, callback) => {
  //console.log("Received event:", event);
  callExchangeRates();
};

//putObjectToS3 from https://stackoverflow.com/questions/40188287/aws-lambda-function-write-to-s3
function putObjectToS3(bucket, key, data) {
  var s3 = new AWS.S3();
  var params = {
    Bucket: bucket,
    Key: key,
    Body: data
  };
  s3.putObject(params, function(err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log("data" + data); // successful response
  });
}

function callExchangeRates() {
  var options = {
    host: "openexchangerates.org",
    path: "/api/latest.json?app_id=e8fc54fbef334621a7a0ae1cb1341430"
  };

  var callback = function(response) {
    var str = ""; //"const getRates = () => { return ";

    //another chunk of data has been recieved, so append it to `str`
    response.on("data", function(chunk) {
      str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    response.on("end", function() {
      //str += "; }; export default getRates;";
      putObjectToS3("currency-converter-bucket", "exchangeRates.json", str);
      //console.log(str);
    });
  };

  http.request(options, callback).end();
}
