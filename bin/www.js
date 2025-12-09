var app = require("../server");
var http = require("http");
var properties = require("../config/properties");
var port = normalizePort(process.env.PORT || properties.PORT || "3332");
app.set("port", port);
var server = http.createServer(app);
server.listen(port);
server.on('error', function (error) {
  if (!error || error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use. Kill the process using the port (e.g. on Windows: use "netstat -ano | findstr :${port}" then "taskkill /PID <pid> /F", or run "npx kill-port ${port}") or set a different PORT environment variable.`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
