const updateExchangeRates = () => {
  var request = new XMLHttpRequest();

  request.open(
    "GET",
    "http://openexchangerates.org/api/latest.json?app_id=e8fc54fbef334621a7a0ae1cb1341430",
    true
  );

  request.onload = function() {
    var rates = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
      console.log(rates);
    } else {
      console.log("error");
    }
  };

  request.send();
  console.log("exchangeRates");
};
export default updateExchangeRates;
