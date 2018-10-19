const { MongoClient } = require('mongodb');
let db;
module.exports = {

	start: async() => {
		const client = await MongoClient.connect("mongodb://localhost", {useNewUrlParser:true});
		db = client.db('js-bot');
		return db;
	},
	getDb: () => db
}
