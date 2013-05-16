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
onlineServers.createServer({logLv:0,port:443,slaveCount:1, 'transports': ["websocket", 'flashsocket' , "xhr-polling" , "jsonp-polling"],syncSec : 10});
// Attention : if you are using linux(like red hat),please site "slaveCount" to 1, i tried this value more(as 2) ,but something error when i'm using ie8 to connect socket.io, it send too much "disconnect and connect event" even this socket is none.
// i don't know why ,so i tried to change time in linux ,but it doesn't work ; then i tried to change this value to 1,then this problem disappeared , maybe it cause by node.js ,maybe not.i hope node.js will find this problem and solve it ...
// but if you're using linux ,this is a bad project ,because it can't provide service using more cpu ,i'm sorry about this.
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
					//alert(data.type + "-" + data.uqKey + " say :" + data.msg);
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

