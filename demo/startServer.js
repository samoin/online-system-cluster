/**
 * User: samoin
 * Date: 13-5-14
 * Time: 上午10:55
 * desc: start server with configuration
 */
var server = require("./index");
var onlineServers = server.servers;
onlineServers.createServer({logLv:0,port:443,slaveCount:2, 'transports': ["websocket", 'flashsocket' , "xhr-polling" , "jsonp-polling"],syncSec : 10});