import mongoose from "mongoose";
export async function connectDB(mongoUri) {
    mongoose.connection.on("error", (error) => {
        console.error("MongoDB connection error:", error);
    });
    mongoose.connection.on("disconnected", () => {
        console.warn("MongoDB disconnected");
    });
    try {
        await mongoose.connect(mongoUri);
        console.log(`MongoDB connected: ${mongoose.connection.host}`);
    }
    catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
    }
}
export async function disconnectDB() {
    await mongoose.connection.close();
}
//# sourceMappingURL=db.js.map