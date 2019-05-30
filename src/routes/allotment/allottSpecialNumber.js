const NumberCheck = require('../../../models/numbercheck');
const User = require('../../../models/user');

async function allotSpecialNumber(req, res) {
  const inRange =
    req.body.requestedNumber >= 1111111111 &&
    req.body.requestedNumber <= 9999999999;
  if (!inRange) {
    res.status(400).send('Requested Number not in acceptable range');
  } else {
    const checkDocument = await NumberCheck.findOne({});
    if (!checkDocument) {
      const numberCheckObj = {
        counter: 0,
        specialNumbersRequested: [req.body.requestedNumber],
      };
      const numberCheckInstance = new NumberCheck(numberCheckObj);

      await numberCheckInstance.save();
      await User.updateOne(
        {userName: req.user.userName},
        {$push: {phoneNumbers: req.body.requestedNumber}}
      );
      res.status(200).json({
        status: 200,
        message: 'Congrats! You have been allotted your requested phone number',
        number: req.body.requestedNumber,
      });
    } else {
      const found = checkIfNumberExists(
        checkDocument.specialNumbersRequested,
        req.body.requestedNumber
      );
      if (found) {
        res
          .status(409)
          .send(
            'Oops! Requested phone number is already taken.' +
            ' Please choose another number or let system assign you a number'
          );
      } else {
        await User.updateOne(
          {userName: req.user.userName},
          {$push: {phoneNumbers: req.body.requestedNumber}}
        );
        await NumberCheck.updateOne(
          {},
          {$push: {specialNumbersRequested: req.body.requestedNumber}}
        );
        res.status(200).json({
          status: 200,
          message:
            'Congrats! You have been allotted your requested phone number',
          number: req.body.requestedNumber,
        });
      }
    }
  }
}
function checkIfNumberExists(specialNumbersRequestedArr, requestedNumber) {
  return specialNumbersRequestedArr.indexOf(requestedNumber) !== -1;
}

module.exports = allotSpecialNumber;
