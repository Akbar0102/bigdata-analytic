const express = require('express');
const path = require('path');
const hbs = require('hbs');
const web = require('./routes/web');

//kafka
const kafka = require('kafka-node');
const socketIO = require('socket.io')(8080)
const Consumer = kafka.Consumer;
const io = socketIO;

const client = new kafka.KafkaClient();
const consumer = new Consumer(
	client,
	[
		{topic: 'sensorudara', partitions:0},{topic: 'parking', partitions:1}, {topic: 'waste1', partitions:2}, {topic: 'vehicle', partitions:3}
	],
	{
		autoCommit: false,
		encoding: 'utf8',
	},
	{
		groupId: 'group1'
	}
);

const app = express();

hbs.registerPartials("./views/partials");

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static("./public"));
app.use('/', web);

consumer.on('message', function(message){
	console.log('Received message from kafka:'+message.value+' Topic :'+message.topic);
	io.json.send(message);  
});

app.listen(1337, () => {
	console.log('serving on port 1337');
});