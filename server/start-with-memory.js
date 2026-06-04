const { MongoMemoryServer } = require("mongodb-memory-server");
MongoMemoryServer.create().then(m => {
  process.env.MONGO_URI = m.getUri();
  require("./server");
}).catch(e => { console.error(e); process.exit(1); });
