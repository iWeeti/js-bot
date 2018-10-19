let { MongoClient } = require('mongodb'),
    db = null,
    prefixes = null,
    settings = null,
    blacklist = null;
module.exports = {
    start: async() => {
        const client = await MongoClient.connect("mongodb://localhost", {useNewUrlParser:true});
        db = client.db('js-bot');
        prefixes = db.collection("prefixes");
        settings = db.collection("settings");
        blacklist = db.collection("blacklist");
    },
    prefixes: prefixes,
    settings: settings,
    blacklist: blacklist
}