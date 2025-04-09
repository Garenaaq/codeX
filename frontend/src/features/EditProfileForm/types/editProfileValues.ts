import { IUserProfile } from "../../../shared/types/profileType";

export type EditProfileValuesType = Omit<IUserProfile, "portfolio" | "_id">;
