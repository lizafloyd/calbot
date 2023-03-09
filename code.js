const hello = () => {
  return "Hello there! My name is CalBot! I've been created by the CTA to help you manage our public transit fares. Please use the 'npm run calculateFare' command followed by the fare you're trying to calculate, and then a comma-delimited list of the coins you have.";
};

const calculateFare = (fareArg, moniesArg) => {
  try {
    console.log("testing", moniesArg)
    const fare = parseInt(fareArg)
    const coins = moniesArg.split(",").map(Number);
    coins.sort((a,b) => b - a)
    if (!fare || !moniesArg) return "Sorry, please input fare and coins.";
    const usefulCoins = coins.filter((coin) => coin <= fare && coin > 0)
  
    function tryFares(fare, coins) {
      console.log(fare, coins)
      if (fare === 0 || coins.length === 0){
        return []
      }
      if (fare >= coins[0]){
          let fareLeft = fare - coins[0]
          let coinsLeft = [...coins]
          coinsLeft.shift()
          console.log("fareleft, next coin", fareLeft, coinsLeft[0])
          if (fareLeft == 0 || fareLeft >= coinsLeft[coinsLeft.length-1]) {
            console.log("hit")
            return [coins[0]].concat(tryFares(fareLeft, coinsLeft))
          } else {
            coins.shift()
            return tryFares(fare, coins)
          }
      }
    }
  
    const returnValue = tryFares(fare, usefulCoins)
    const returnMessage = returnValue && returnValue.length ? `Use ${returnValue}` : "Sorry, no coin combo found"
    return returnMessage;
  } catch(error) {
    `Sorry, you've hit the following error: ${error.message}`
  }
};

module.exports = { hello, calculateFare };
