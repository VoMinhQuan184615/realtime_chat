import UserService from "../service/user.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import { MESSAGES } from "../constants/messages.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const registerUser = async (req, res) => {
  try {
    const result = await UserService.registerUser(req.body);
    return ApiResponse.success(
      res,
      result.data,
      MESSAGES.SUCCESS.REGISTER,
      HTTP_STATUS.CREATED
    );
  } catch (error) {
    return ApiResponse.error(
      res,
      error.message || MESSAGES.ERROR.INTERNAL,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    return ApiResponse.success(
      res,
      user,
      MESSAGES.SUCCESS.DEFAULT,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return ApiResponse.error(
      res,
      error.message || MESSAGES.ERROR.INTERNAL,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const result = await UserService.getAllUsers(page, limit);
    return ApiResponse.success(
      res,
      result,
      MESSAGES.SUCCESS.DEFAULT,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return ApiResponse.error(
      res,
      error.message || MESSAGES.ERROR.INTERNAL,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await UserService.updateUser(req.params.id, req.body);
    return ApiResponse.success(
      res,
      user,
      MESSAGES.SUCCESS.UPDATED,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return ApiResponse.error(
      res,
      error.message || MESSAGES.ERROR.INTERNAL,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

export const deleteUser = async (req, res) => {
  try {
    const result = await UserService.deleteUser(req.params.id);
    return ApiResponse.success(
      res,
      null,
      MESSAGES.SUCCESS.DELETED,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return ApiResponse.error(
      res,
      error.message || MESSAGES.ERROR.INTERNAL,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

export const searchUsers = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return ApiResponse.error(
        res,
        MESSAGES.VALIDATION.REQUIRED,
        HTTP_STATUS.BAD_REQUEST
      );
    }
    const users = await UserService.searchUsers(query);
    return ApiResponse.success(
      res,
      users,
      MESSAGES.SUCCESS.DEFAULT,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return ApiResponse.error(
      res,
      error.message || MESSAGES.ERROR.INTERNAL,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};
