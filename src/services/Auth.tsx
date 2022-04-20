import axiosInstance from "./axiosConfig";

export const loginRequest = (Email: string, Password: string) => {
  return axiosInstance
    .post('/auth/Login', {
      Email,
      Password
    })
    .then(response => response.data);
};

export const sendResetPasswordLinkRequest = (Email: string, ResetPasswordUrl: string) => {
  return axiosInstance
    .post('/auth/SendResetPasswordLink', {
      Email,
      ResetPasswordUrl
    })
    .then(response => response.data);
};

export const resetPasswordRequest = (UserId: string, NewPassword: string) => {
  return axiosInstance
    .post('/auth/ResetPassword', {
      UserId,
      NewPassword
    })
    .then(response => response.data);
};