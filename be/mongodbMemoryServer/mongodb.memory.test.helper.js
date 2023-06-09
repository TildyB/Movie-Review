
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

let mongoDb;

export const connect = async ()=> {
  mongoDb = await MongoMemoryServer.create();
  const uri = mongoDb.getUri();
  mongoose.set('strictQuery', false);
  await mongoose.connect(uri);
};

export const cleanData = async () => {
  await mongoose.connection.db.dropDatabase();
};

export const disconnect = async () => {
  await mongoose.disconnect();
  await mongoDb.stop();
};