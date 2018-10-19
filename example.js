const mongo = require('./mongo.js');
async function go() {
	const db = await mongo.start(); //or you can do db = mongo.getDb()
	mongo.blacklist = db.collection('blacklist');
	await mongo.blacklist.find({}).toArray();
}
go();
