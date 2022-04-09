module.exports = (error, req, res, next) => {
  console.log('#####ERROR HANDLER#####');
  console.log(error);
  res.sendStatus(500);
}