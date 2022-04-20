import axiosInstance from "./axiosConfig";
import { ICandidate, IRegisterUser, IUpdateUser } from "../classes/IUser";

// -------------------------- Common Services -------------------------- //

export const getReportingManagersRequest = () => {
  return axiosInstance
    .get("/admin/user/GetReportingManagers")
    .then((response) => response.data);
};

export const getUsersForDropDownRequest = () => {
  return axiosInstance
    .get("/admin/user/GetUsersForDropDown")
    .then((response) => response.data);
};

export const getUsersByReportingManagerRequest = (
  ReportingManagerId: string
) => {
  return axiosInstance
    .get("/admin/user/GetUsersByReportingManager/" + ReportingManagerId)
    .then((response) => response.data);
};

// -------------------------- Services For Role -------------------------- //

export const insertRoleRequest = (RoleName: string, CreatedBy: string) => {
  return axiosInstance
    .post("/admin/role/InsertRole", {
      RoleName,
      CreatedBy,
    })
    .then((response) => response.data);
};

export const updateRoleRequest = (
  RoleId: string,
  RoleName: string,
  ModifiedBy: string
) => {
  return axiosInstance
    .put("/admin/role/UpdateRole/" + RoleId, {
      RoleName,
      ModifiedBy,
    })
    .then((response) => response.data);
};

export const deleteRoleRequest = (RoleId: string) => {
  return axiosInstance
    .delete("/admin/role/DeleteRole/" + RoleId)
    .then((response) => response.data);
};

export const getRoleByIdRequest = (RoleId: string) => {
  return axiosInstance
    .get("/admin/role/GetRoleById/" + RoleId)
    .then((response) => response.data);
};

export const getRolesRequest = () => {
  return axiosInstance
    .get("/admin/role/GetRoles")
    .then((response) => response.data);
};

// -------------------------- Services For User -------------------------- //

export const registerUserRequest = (User: IRegisterUser) => {
  return axiosInstance
    .post("/admin/user/RegisterUser", User)
    .then((response) => response.data);
};

export const updateUserRequest = (UserId: string, User: IUpdateUser) => {
  return axiosInstance
    .put("/admin/user/UpdateUser/" + UserId, User)
    .then((response) => response.data);
};

export const deleteUserRequest = (UserId: string) => {
  return axiosInstance
    .delete("/admin/user/DeleteUser/" + UserId)
    .then((response) => response.data);
};

export const getUserByIdRequest = (UserId: string) => {
  return axiosInstance
    .get("/admin/user/GetUserById/" + UserId)
    .then((response) => response.data);
};

export const getUsersRequest = () => {
  return axiosInstance
    .get("/admin/user/GetUsers")
    .then((response) => response.data);
};

// -------------------------- Services For Candidate -------------------------- //

export const getCandidateRequest = () => {
  return axiosInstance
    .get("/admin/candidate/GetAllCandidates")
    .then((response) => response.data);
};

export const uploadCandidateDataRequest = (file: File) => {
  const data = new FormData();
  data.append("excel", file);
  return axiosInstance
    .post("/admin/candidate/upload", data)
    .then((response) => response.data);
};

export const getCandidateByIdRequest = (CandidateId: string) => {
  return axiosInstance
    .get("/admin/candidate/GetCandidateById/" + CandidateId)
    .then((response) => response.data);
};

export const addCandidateByIdRequest = (Candidate: ICandidate) => {
  return axiosInstance
    .post("/admin/candidate/AddCandidate", Candidate)
    .then((response) => response.data);
};

export const updateCandidateByIdRequest = (
  CandidateId: string,
  Candidate: ICandidate
) => {
  return axiosInstance
    .put("/admin/candidate/UpdateCandidate/" + CandidateId, Candidate)
    .then((response) => response.data);
};
