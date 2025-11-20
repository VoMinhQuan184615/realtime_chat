import AuthService from "../service/auth.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import { MESSAGES } from "../constants/messages.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return ApiResponse.error(
        res,
        MESSAGES.VALIDATION.REQUIRED,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const result = await AuthService.login({ identifier, password });
    return ApiResponse.success(
      res,
      result,
      MESSAGES.SUCCESS.LOGIN,
      HTTP_STATUS.OK
    );
  } catch (err) {
    return ApiResponse.error(
      res,
      err.message || MESSAGES.ERROR.INTERNAL,
      HTTP_STATUS.UNAUTHORIZED
    );
  }
};

export const me = async (req, res) => {
  // req.user should be populated by middleware
  if (!req.user)
    return ApiResponse.error(
      res,
      MESSAGES.ERROR.UNAUTHORIZED,
      HTTP_STATUS.UNAUTHORIZED
    );
  return ApiResponse.success(
    res,
    req.user,
    MESSAGES.SUCCESS.DEFAULT,
    HTTP_STATUS.OK
  );
};

export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return ApiResponse.error(
        res,
        MESSAGES.VALIDATION.REQUIRED,
        HTTP_STATUS.BAD_REQUEST
      );
    }
    const result = await AuthService.refresh(refreshToken);
    return ApiResponse.success(res, result, "Token refreshed", HTTP_STATUS.OK);
  } catch (err) {
    return ApiResponse.error(
      res,
      err.message || MESSAGES.ERROR.INTERNAL,
      HTTP_STATUS.UNAUTHORIZED
    );
  }
};
