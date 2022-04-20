import IRole from "./IRole";
import { IUserShort } from "./IUserShort";

export interface IUser {
  _id: string;
  FirstName: string;
  LastName: string;
  Password: string;
  Phone: number;
  Email: string;
  EmployeeCode: string;
  Designation: string;
  Role: IRole;
  ReportingManager: IUserShort;
  ProfilePhoto: string;
  ReminderTime: string;
  IsSuperAdmin: boolean;
  CreatedBy: string;
  CreatedDate: Date;
}

export interface IRegisterUser {
  FirstName: string;
  LastName: string;
  Phone: number;
  Email: string;
  Password: string;
  EmployeeCode: string;
  Designation: string;
  RoleId: string;
  ReportingManagerId: string;
  CreatedBy: string;
}

export interface IUpdateUser {
  FirstName: string;
  LastName: string;
  Phone: number;
  // Password: string;
  Email: string;
  EmployeeCode: string;
  Designation: string;
  RoleId: string;
  ReportingManagerId: string;
  ModifiedBy: string;
}

export interface ICandidate {
  _id: string;
  Name: String;
  DOB: String;
  Email: String;
  Skills: String;
  Contact: String;
  Designation: String;
  ModifiedBy: String;
  Profile: String;
  Experience: String;
  Reason_For_Leaving: String;
  Source: String;
  Interview_Schedule: String;
  Date_Of_Joining: String;
  Hiring_Status: String;
  Comment: String;
  Notice_Period: String;
  Ready_To_Relocate: String;
  Communication: String;
  Current_CTC: String;
  Current_Location: String;
  Expected_CTC: String;
  College_Name: String;
  Resume: String;
}
