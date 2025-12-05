/**
 * Lưu token vào localStorage
 */
export const saveToken = (token: string): void => {
  localStorage.setItem("authToken", token);
};

/**
 * Lấy token từ localStorage
 */
export const getToken = (): string | null => {
  return localStorage.getItem("authToken");
};

/**
 * Xóa token khỏi localStorage
 */
export const removeToken = (): void => {
  localStorage.removeItem("authToken");
};

/**
 * Kiểm tra có token hay không
 */
export const hasToken = (): boolean => {
  return !!getToken();
};
