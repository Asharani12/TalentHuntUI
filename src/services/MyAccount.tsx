import axiosInstance from "./axiosConfig";

export const getProfileRequest = (UserId: string) => {
  return axiosInstance
    .get('/user/profile/ViewProfile/' + UserId)
    .then(response => response.data);
};

export const updateProfileRequest = (UserId: string, Phone: number, ReminderTime: string) => {
  return axiosInstance
    .put('/user/profile/UpdateProfile/' + UserId, {
      Phone,
      ReminderTime
    })
    .then(response => response.data);
};

export const updateProfilePictureRequest = (UserId: string, ProfilePhoto: File) => {

  let formData = new FormData()
  formData.append('ProfilePhoto', ProfilePhoto)
  axiosInstance.defaults.headers['Content-Type'] = 'multipart/form-data';

  return axiosInstance
    .put('/user/profile/UpdateProfilePicture/' + UserId, formData)
    .then(response => response.data);
};

export const changePasswordRequest = (UserId: string, OldPassword: string, NewPassword: string) => {
  return axiosInstance
    .put('/user/profile/ChangePassword/' + UserId, {
      OldPassword,
      NewPassword
    })
    .then(response => response.data);
};