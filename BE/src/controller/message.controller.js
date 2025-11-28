import ApiResponse from "../utils/ApiResponse.js";
import { MessagesError } from "../constants/messagesError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import MessageService from "../service/message.service.js";
import Conversation from "../model/Conversation.js";

export const sendDirectMessage = async (req, res) => {
  try {
    const { recipientId, content, conversationId } = req.body;
    const senderId = req.user._id;
    if (!content || !recipientId) {
      return ApiResponse.error(
        res,
        MessagesError.VALIDATION.REQUIRED,
        HTTP_STATUS.BAD_REQUEST
      );
    }
    const result = await MessageService.sendDirectMessage(
      senderId,
      recipientId,
      content,
      conversationId
    );
    return ApiResponse.success(
      res,
      result,
      MessagesError.SUCCESS.MESSAGE_SENT,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return ApiResponse.error(
      res,
      error.message || MessagesError.ERROR.INTERNAL,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};
