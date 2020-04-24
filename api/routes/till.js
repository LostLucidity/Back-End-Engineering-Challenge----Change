const express = require('express');
const router = express.Router();

const till = {
  quarters: 5,
  dimes: 4,
  nickels: 5,
  pennies: 5
};

const QUARTERVALUE = 25;
const DIMEVALUE = 10;
const NICKELVALUE = 5;
const PENNIEVALUE = 1;

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Till value returned.',
    coins: till,
    value: getValueOfTill(till)
  })
});

router.put('/', (req, res, next) => {
  till.quarters = req.body.quarters || 0;
  till.dimes = req.body.dimes || 0;
  till.nickels = req.body.nickels || 0;
  till.pennies = req.body.pennies || 0;
  res.status(200).json({
    message: 'Till was replaced.',
    coins: till,
    value: getValueOfTill(till)
  })
});

router.patch('/', (req, res, next) => {
  till.quarters = req.body.quarters || till.quarters;
  till.dimes = req.body.dimes || till.dimes;
  till.nickels = req.body.nickels || till.nickels;
  till.pennies = req.body.pennies || till.pennies;
  res.status(200).json({
    message: 'Till was updated.',
    coins: till,
    value: getValueOfTill(till)
  })
});

router.post('/', (req, res, next) => {
  const minimumCoins = getMinimumCoins(req.body.value, till);
  if (minimumCoins.success) {
    adjustTill(minimumCoins.coins, till);
    res.status(200).json({
      message: 'Change was calculated.',
      coins: minimumCoins.coins
    })
  } else {
    res.status(404).json({
      message: minimumCoins.message
    })
  }
});

function getValueOfTill(till) {
  value = till.quarters * QUARTERVALUE + till.dimes * DIMEVALUE + till.nickels * NICKELVALUE + till.pennies * PENNIEVALUE;
  return (value / 100)
}

function getMinimumCoins(change, till) {
  adjustedChange = change * 100;
  minimumCoins = {
    quarters: 0,
    dimes: 0,
    nickels: 0,
    pennies: 0
  };
  minimumCoins.quarters = iterateTillCoins(till.quarters, QUARTERVALUE, adjustedChange);
  adjustedChange -= minimumCoins.quarters * QUARTERVALUE;
  minimumCoins.dimes = iterateTillCoins(till.dimes, DIMEVALUE, adjustedChange);
  adjustedChange -= minimumCoins.dimes * DIMEVALUE;
  minimumCoins.nickels = iterateTillCoins(till.nickels, NICKELVALUE, adjustedChange);
  adjustedChange -= minimumCoins.nickels * NICKELVALUE;
  minimumCoins.pennies = iterateTillCoins(till.pennies, PENNIEVALUE, adjustedChange);
  adjustedChange -= minimumCoins.pennies * PENNIEVALUE;
  if (adjustedChange === 0) {
    return {
      success: true,
      coins: minimumCoins
    }
  } else if (adjustedChange > 0) {
    return {
      success: false,
      message: 'Not enough change in till.'
    }
  } else {
    return {
      success: false,
      message: 'Calculation error.'
    }
  }
}

function iterateTillCoins(coinAmount, value, change) {
  counter = 0
  coinsFromTill = 0
  for (let i = 1; i <= coinAmount; i++) {
    counter += value;
    if (counter <= change) {
      coinsFromTill += 1;
    } else {
      break;
    }
  }
  return coinsFromTill;
}

function adjustTill(minimumCoins, till) {
  console.log('till', till);
  till.quarters -= minimumCoins.quarters;
  till.dimes -= minimumCoins.dimes;
  till.nickels -= minimumCoins.nickels;
  till.pennies -= minimumCoins.pennies;
  console.log('till', till);
}

module.exports = router;