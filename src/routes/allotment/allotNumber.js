const NumberCheck = require('../../../models/numbercheck');
const User = require('../../../models/user');

async function allotNumber(req, res) {
  const checkDocument = await NumberCheck.findOne({});
  if (!checkDocument) {
    const numberCheckObj = {
      counter: 0,
      specialNumbersRequested: [],
    };
    const numberCheckInstance = new NumberCheck(numberCheckObj);

    numberCheckInstance.save(function(err, savedObj) {
      console.log(savedObj);
    });

    // allot start number to user
    const {err, doc} = await User.updateOne(
      {userName: req.user.userName},
      {$push: {phoneNumbers: 1111111111}}
    );
    if (!err) {
      res.status(200).json({
        status: 200,
        message: 'Congrats! You have been allotted a phone number',
        number: 1111111111,
      });
    } else {
      res.status(500).send('Server Error');
    }
  } else {
    // allot numbers here
    let counter = checkDocument.counter + 1;
    let newNumber = checkDocument.startNumber + counter;
    console.log(newNumber);
    // check if this number exists in special requested list
    let found = checkIfNumberExists(
      checkDocument.specialNumbersRequested,
      newNumber
    );
    console.log(found);
    while (found) {
      ++counter;
      console.log(counter);
      newNumber = checkDocument.startNumber + counter;
      found = checkIfNumberExists(
        checkDocument.specialNumbersRequested,
        newNumber
      );
    }
    const {err, doc} = await User.updateOne(
      {userName: req.user.userName},
      {$push: {phoneNumbers: newNumber}}
    );
    if (!err) {
      // update counter
      await NumberCheck.updateOne({}, {$set: {counter}});
      res.status(200).json({
        status: 200,
        message: 'Congrats! You have been allotted a phone number',
        number: newNumber,
      });
    } else {
      res.status(500).send('Server Error');
    }
  }
}

function checkIfNumberExists(specialNumbersRequested, newNumber) {
  return specialNumbersRequested.indexOf(newNumber) !== -1;
}
module.exports = allotNumber;
