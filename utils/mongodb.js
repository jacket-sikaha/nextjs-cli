const { MongoClient } = require("mongodb");

// 使用环境变量
const uri = `mongodb://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/?authMechanism=DEFAULT`;

async function getFileList() {
  const client = new MongoClient(uri);
  try {
    const files = client.db("image-host").collection("file-store2");
    return await files.find().toArray();
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function addFiles(fileList) {
  const client = new MongoClient(uri);
  try {
    const files = client.db("image-host").collection("file-store2");
    return await files.insertMany(fileList);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = { getFileList, addFiles };
