import { useSelector } from "react-redux";
import { IUserProfile } from "../../shared/types/profileType";
import styles from "./profileHeader.module.scss";
import { Heading, Text } from "@radix-ui/themes";
import { RootState } from "../../app/store/store";
import { EditProfileForm } from "../../features";

interface IProfileHedaerProps {
  profileData: IUserProfile;
}

export function ProfileHeader({ profileData }: IProfileHedaerProps) {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div className={styles.profile_header}>
      <div className={styles.profile_header_top}>
        <div className={styles.profile_header_data}>
          <Heading as="h2">
            {profileData.name} {profileData.surname}
          </Heading>
          <Text as="p" size="4">
            <b>Никнейм:</b> @{profileData.nickname}
          </Text>
          <Text as="p" size="4">
            <b>Направление:</b> {profileData.role}
          </Text>
          <Text as="p" size="4">
            <b>Место работы:</b> {profileData.workplace || "Не указано"}
          </Text>
          <div>
            <Heading as="h2">О себе: </Heading>
            <Text as="p" size="4" className={styles.description_text}>
              {profileData.description || "Не указано"}
            </Text>
          </div>
        </div>
        {user && user.id === profileData._id && (
          <div>
            <EditProfileForm profileData={profileData} />
          </div>
        )}
      </div>
    </div>
  );
}
