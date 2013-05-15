# online-system-cluster

online-system-cluster is a Node.JS project that used socket.io , by cluster ,it can provide more connections

## How to Install

```bash
npm install online-system-cluster
```

## How to use

var server = require("./online-system-cluster");
var onlineServers = server.servers;
onlineServers.createServer();//if you want change configuration , site a proObject here

#### Server side

```js
var server = require("./online-system-cluster");
var onlineServers = server.servers;
onlineServers.createServer({logLv:0,port:443,slaveCount:2, 'transports': ["websocket", 'flashsocket' , "xhr-polling" , "jsonp-polling"],syncSec : 10});
```

#### Client side

```html
<script>
	var socket = io.connect('http://127.0.0.1:443');
	if (io) {
		var now = new Date().getTime();
		socket.on('connect', function() {
			//alert("connect");
			socket.emit("msgs", {
				cmd : 1,
				msg : {
					uqKey : "gigily180" + now,
					uName : "samoin" + now,
					module : "test",
					type : "connect"
				}
			});
		});
		socket.on('news', function(data) {
			data = eval("(" + data + ")");
			if (data.type == "connect") {
				//TODO solve someone connect event
				//alert(data.type + "-" + data.uqKey + " connect");
			}
			if (data.type == "disconnect") {
				//TODO solve someone disconnect event
				//alert(data.type + "-" + data.uqKey + " disconnect");
			}
			if (data.type == "msg") {
				if (data.msg) {
					alert(data.type + "-" + data.uqKey + " say :" + data.msg);
				}
			}
			if (data.type == "func") {
				if (data.msg) {
					eval(data.msg);
				}
			}
			
		});
		socket.on('reconnect', function() {
			//TODO
		});
		socket.on('disconnect', function() {
			// in flash mode ,this may trigger twice,so ....
			// server disconnected , will refresh current page in 5 sec...
			//setTimeout(function(){location.reload();} , 5 * 1000);
		});
	}
</script>
```

