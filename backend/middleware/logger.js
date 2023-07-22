const morgan = require('morgan');

const logger = morgan(function (tokens, req, res) {
  let log = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
  ].join(' ');
  if (tokens.method(req, res) === 'POST') {
    log = `${log} ${JSON.stringify(req.body)}`;
  }
  return log;
});

module.exports = logger;