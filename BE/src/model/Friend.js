import mongoose from "mongoose";

const friendSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    friendId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

friendSchema.pre("save", function (next) {
  const a = this.userId.toString();
  const b = this.friendId.toString();

  // Nếu a > b thì hoán đổi → đảm bảo luôn friendA < friendB
  if (a > b) {
    const temp = this.userId;
    this.userId = this.friendId;
    this.friendId = temp;
  }
  next();
});
friendSchema.index({ userId: 1, friendId: 1 }, { unique: true });

export default mongoose.model("Friend", friendSchema);
