import { useParams } from "react-router-dom";
import styles from "./profile.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/profileService";
import { Loader } from "../../shared/ui";
import { ProfileHeader } from "../../entities";
import { PortfolioBlock } from "../../widgets";
import { IGetProfileResponse } from "../../shared/types/profileType";

export function Profile() {
  const { userId } = useParams<{ userId: string }>();

  const { data, isError, isFetching } = useQuery<IGetProfileResponse, Error>({
    queryKey: ["userProfile", userId],
    queryFn: async () => {
      const data = await getProfile(userId);
      return data;
    },
    refetchOnWindowFocus: false,
    enabled: !!userId,
  });

  return (
    <div className={styles.container}>
      {isFetching ? (
        <Loader />
      ) : isError ? (
        <p>Ошибка при загрузке профиля, попробуйте перезагрузить страницу</p>
      ) : (
        <>
          {data?.userProfile ? (
            <>
              <ProfileHeader profileData={data.userProfile} />
              <PortfolioBlock profileData={data.userProfile} />
            </>
          ) : (
            <p>Профиль не найден</p>
          )}
        </>
      )}
    </div>
  );
}
