import { useSelector } from "react-redux";
import { IUserProfile } from "../../shared/types/profileType";
import styles from "./portfolioBlock.module.scss";
import { Heading, Text } from "@radix-ui/themes";
import { RootState } from "../../app/store/store";
import { ProjectForm } from "../../features/ProjectForm";
import { ProjectCard } from "../../entities";

interface IPortfolioBlock {
  profileData: IUserProfile;
}

export function PortfolioBlock({ profileData }: IPortfolioBlock) {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div className={styles.portfolio_block}>
      <div className={styles.portfolio_add_project}>
        <Heading as="h2">Проекты:</Heading>
        {user && user.id === profileData._id && (
          <ProjectForm typeForm="create" />
        )}
      </div>
      {profileData.portfolio.length > 0 ? (
        profileData.portfolio.map((project) => (
          <ProjectCard project={project} key={project._id} />
        ))
      ) : (
        <Text size="5">На данный момент проекты отсутствуют.</Text>
      )}
    </div>
  );
}
