import { IProject } from "../../../shared/types/profileType";

export type ProjectFormValuesType = Omit<IProject, "_id">;
