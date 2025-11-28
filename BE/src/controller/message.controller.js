import ApiResponse from "../utils/ApiResponse.js";
import { MessagesError } from "../constants/messagesError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import MessageService from "../service/message.service.js";

export const sendDirectMessage = async (req, res) => {
  try {
    const { recipientId, content, conversationId } = req.body;
    const senderId = req.user._id;
    const result = await MessageService.sendDirectMessage(
      senderId,
      recipientId,
      content,
      conversationId
    );
    return ApiResponse.success(
      res,
      result,
      "Message sent successfully",
      HTTP_STATUS.CREATED
    );
  } catch (error) {
    return ApiResponse.error(
      res,
      error.message || MessagesError.ERROR.INTERNAL,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};
