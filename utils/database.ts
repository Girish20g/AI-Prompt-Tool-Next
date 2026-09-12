import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var mongooseConnection: Promise<typeof mongoose> | undefined;
}

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);

  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (mongoose.connection.readyState === 0) {
    global.mongooseConnection = undefined;
  }

  if (!global.mongooseConnection) {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI is not configured");

    global.mongooseConnection = mongoose.connect(uri, {
      dbName: "share_prompt",
    });
  }

  try {
    return await global.mongooseConnection;
  } catch (error) {
    global.mongooseConnection = undefined;
    throw error;
  }
};
