import Message from "../model/message.js";
import Conversation from "../model/Conversation.js";
import { MessagesError } from "../constants/messagesError.js";

class MessageService {
  sendDirectMessage = async (
    senderId,
    recipientId,
    content,
    conversationId
  ) => {
    try {
      let conversation;
      if (conversationId) {
        conversation = await Conversation.findById(conversationId);
      }
      if (!conversation) {
        conversation = await Conversation.create({
          type: "direct",
          participants: [
            { userId: senderId, joinedAt: new Date() },
            { userId: recipientId, joinedAt: new Date() },
          ],
          lastMessageAt: new Date(),
          unreadCounts: new Map(),
        });
      }
      const newMessage = await Message.create({
        conversationId: conversation._id,
        senderId,
        content,
        timestamp: new Date(),
      });
      await conversation.save();
      return newMessage;
    } catch (error) {
      throw new Error(error.message || MessagesError.ERROR.INTERNAL);
    }
  };
}
export default new MessageService();
