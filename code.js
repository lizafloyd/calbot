const hello = () => {
  return "Hello there! My name is CalBot! I've been created by the CTA to help you manage our public transit fares. Please use the 'npm run calculateFare' command followed by the fare you're trying to calculate, and then a comma-delimited list of the coins you have.";
};

const calculateFare = (fareArg, moniesArg) => {
  try {
    console.log("testing", moniesArg);
    const fare = parseInt(fareArg);
    const coins = moniesArg.split(",").map(Number);
    coins.sort((a, b) => b - a);
    if (!fare || !moniesArg) return "Sorry, please input fare and coins.";
    const usefulCoins = coins.filter((coin) => coin <= fare && coin > 0);
    let coinsInUse = [];
    let fareSoFar = 0;
    const returnValue = tryFares(fare, usefulCoins);
    console.log("OMG", returnValue)
    const returnMessage =
      returnValue && returnValue.length
        ? `Use ${returnValue}`
        : "Sorry, no coin combo found";
    return returnMessage;

    function tryFares(initialFare, initialCoins) {
      console.log("beginning loop");
      const wallet = initialCoins;
      // not enough inputs
      if (initialFare === 0 || initialCoins.length === 0) {
        return [];
      }
      // exact change
      if (initialFare === initialCoins[0]) {
        coinsInUse.push(initialCoins[0]);
        return coinsInUse;
      }
      // sum is insufficient
      if (
        initialCoins.reduce((partialSum, num) => partialSum + num, 0) <
        initialFare
      ) {
        return [];
      }
      // the first coin gets us part of the way
      coinsInUse.push(initialCoins[0]);
      fareSoFar = fareSoFar + initialCoins[0];
      wallet.splice(0, 1);
      console.log("FARE FARESOFAR COINSINUSE", fare, fareSoFar, coinsInUse);
      // OR we overshot, so we need to try again without the first value
      // console.log("WHY", initialFare, fare);
      // if (fareSoFar > fare) {
      //   coinsInUse = [];
      //   const newAttemptCoins = coins
      //   newAttemptCoins.shift()
      //   console.log("omg we overshot", fare, newAttemptCoins, coins);
      //   tryFares(fare, newAttemptCoins);
      // }
      // now we have the correct change
      if (fare - fareSoFar === 0) {
        console.log("did it!", fareSoFar, fare, wallet);
        return coinsInUse;
      }
      console.log("beginning the ifs", fareSoFar, wallet, fare, wallet.length);
      // adding another coin is too much and there are NO more coins to try
      // throw away #1 and try again
      if (fareSoFar + wallet[0] > fare && wallet.length < 1) {
        coinsInUse.splice(0, 1);
        console.log(
          "should throw away #1",
          fareSoFar,
          initialCoins,
          coinsInUse
        );
        return tryFares(fare - fareSoFar, initialCoins);
      }
      // adding another coin is not enough and there are more coins to try
      // add #1 & #2 to fareSoFar and try again
      if (fareSoFar + wallet[0] < fare && wallet.length > 1) {
        console.log("add both", fareSoFar, initialCoins, coinsInUse);
        return tryFares(fare - fareSoFar, wallet);
      }
      // adding another coin is not enough and there are NO more coins to try
      // drop #1 and try again
      if (fareSoFar + wallet[0] < fare && wallet.length <= 1) {
        coinsInUse.splice(0, 1);
        console.log("drop #1", fareSoFar, initialCoins, coinsInUse);
        return tryFares(fare - fareSoFar, wallet);
      }
      // adding another coin is too much and there are more coins to try
      // throw away #2 and try again
      if (fareSoFar + wallet[0] > fare && wallet.length >= 1) {
        console.log("SUP", wallet[0], fare-fareSoFar)
          console.log("should throw away #2", fare - fareSoFar, wallet);
          wallet.splice(0, 1);
          return tryFares(fare - fareSoFar, initialCoins);
      }
      // adding another coin is the correct change
      if (fareSoFar + wallet[0] === fare) {
        coinsInUse.push(initialCoins[0]);
        console.log("AM I HERE", coinsInUse);
        return coinsInUse;
      }
      return coinsInUse;

      // console.log("top of tryFares", initialFare, initialCoins)

      // if (initialFare >= initialCoins[0]){
      //     let fareLeft = initialFare - initialCoins[0]
      //     let coinsLeft = [...initialCoins]
      //     coinsLeft.shift()
      //     console.log("fareleft, next coin", fareLeft, coinsLeft[0])
      //     if (initialCoins.length >= 1 && coinsLeft.length === 0 && fareLeft !== 0) {
      //       coinsInUse = []
      //       return tryFares(fareLeft, coinsLeft)
      //     }
      //     console.log("adding", initialCoins[0])
      //     coinsInUse.push(initialCoins[0])
      //     console.log("COINS", coinsInUse)
      //     if (fareLeft === 0) {
      //       return coinsInUse
      //     }
      //     if (fareLeft >= coinsLeft[0]) {
      //       console.log("hit", initialCoins[0])
      //       tryFares(fareLeft, coinsLeft)
      //       // return [coins[0]].concat()
      //       return coinsInUse
      //     }
      //     if (fareLeft !== 0 && fareLeft <= coinsLeft[0]) {
      //       console.log("dropping 4")
      //       // coinsLeft.shift()
      //       return tryFares(fareLeft, coinsLeft)
      //     }

      // } else {
      //   console.log("I'm else")
      //   coinsInUse = []
      //   console.log("running from else", fare, initialCoins)
      //   tryFares(fare, initialCoins)
      // }
      // return coinsInUse
    }
  } catch (error) {
    `Sorry, you've hit the following error: ${error.message}`;
  }
};

module.exports = { hello, calculateFare };
