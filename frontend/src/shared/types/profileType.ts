export interface IUserProfile {
  _id: string;
  name: string;
  surname: string;
  nickname: string;
  role:
    | "Frontend Developer"
    | "Backend Developer"
    | "QA Engineer"
    | "Designer"
    | "Manager"
    | "HR";
  description?: string;
  workplace?: string;
  portfolio: IProject[];
}

export interface IProject {
  _id: string;
  title: string;
  description?: string;
  links: string[];
  previewImage?: string | null;
}

export interface IGetProfileResponse {
  userProfile: IUserProfile;
}
