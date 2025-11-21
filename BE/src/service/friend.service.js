import Friend from "../model/Friend.js";
import FriendRequest from "../model/FriendRequest.js";
import FriendRequestService from "./friendRequest.service.js";
import mongoose from "mongoose";

class FriendService {
  sendRequestFriend = async (from, to, message) => {
    const fromId = from.toString();
    const toId = to.toString();

    // Ensure consistent ordering (like pre-hook does)
    const [minId, maxId] = fromId < toId ? [fromId, toId] : [toId, fromId];

    // Kiểm tra đã là bạn bè chưa
    const alreadyFriends = await Friend.findOne({
      userId: minId,
      friendId: maxId,
    });

    if (alreadyFriends) {
      throw new Error("You are already friends.");
    }

    // Kiểm tra request còn pending giữa 2 user
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { from: fromId, to: toId },
        { from: toId, to: fromId },
      ],
      status: "pending",
    });

    if (existingRequest) {
      throw new Error(
        "A friend request is already pending between these users."
      );
    }

    // Tạo request
    const friendRequest = await FriendRequest.create({
      from: fromId,
      to: toId,
      message,
      status: "pending",
    });

    return friendRequest;
  };

  acceptedRequestFriend = async (requestId, to) => {
    if (!requestId || !to) throw new Error("Missing required parameters");

    const toId = to.toString();
    const request = await FriendRequest.findById(requestId);
    if (!request) throw new Error("Friend request not found.");
    if (request.to.toString() !== toId)
      throw new Error("You are not authorized to accept this friend request.");
    if (request.status !== "pending")
      throw new Error("This friend request has already been processed.");
    if (!request.from) throw new Error("Invalid friend request - missing from");

    const fromId = request.from.toString();
    const [minId, maxId] = fromId < toId ? [fromId, toId] : [toId, fromId];

    // Check exist BEFORE create
    const exist = await Friend.findOne({
      userId: minId,
      friendId: maxId,
    });
    if (exist) throw new Error("You are already friends.");

    // Update request status
    request.status = "accepted";
    await request.save();

    // Create friend, pre-hook sẽ swap nếu cần
    await Friend.create({ userId: fromId, friendId: toId });

    // Optional: delete request
    await FriendRequestService.deleteRequest(requestId);

    return { message: "Friend request accepted successfully" };
  };
}

export default new FriendService();
