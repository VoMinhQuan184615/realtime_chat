export const updateConversationAfterCreateMessage = (
  conversation,
  message,
  senderId
) => {
  // Reset seen
  conversation.seenBy = [];

  // Update last message
  conversation.lastMessageAt = {
    messageId: message._id,
    senderId,
    content: message.content,
    createdAt: message.timestamp,
  };

  // Update unread count
  conversation.participants.forEach((p) => {
    const id = p.userId.toString();
    if (id !== senderId.toString()) {
      const current = conversation.unreadCounts.get(id) || 0;
      conversation.unreadCounts.set(id, current + 1);
    }
  });
};
