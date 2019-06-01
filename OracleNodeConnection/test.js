const http = require('http');
const oracledb = require('oracledb');
let error;
let user;
 
oracledb.getConnection(
    {
      user: "system", 
      password: "Root123123",
      connectString: "@localhost:orcl"
    }, 
    function(err, connection) {
		console.log("in get Connection");
		console.log(err);
      if (err) {error = err; return;}
	  console.log("No Error");
      
      connection.execute('select * from test', [], function(err, result) {
		  console.log("in execute method");
        if (err) {error = err; return;}
 
        user = result.rows[0][0];
        error = null;
 
        connection.close(function(err) {
          if (err) {console.log(err);}
        });
      })
    }
);
 
http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
 
  if (error === null) {
    response.end('Connection test succeeded. You connected to Exadata Express as ' + user + '!');
  } else if (error instanceof Error) {
    response.write('Connection test failed. Check the settings and redeploy app!\n');
    response.end(error.message);
  } else {
    response.end('Connection test pending. Refresh after a few seconds...');
  }
}).listen(4044);