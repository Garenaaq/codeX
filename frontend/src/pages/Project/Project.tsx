import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProject } from "../../services/profileService";
import { IProject } from "../../shared/types/profileType";
import { Loader } from "../../shared/ui";
import styles from "./project.module.scss";
import { Heading, Link, Text } from "@radix-ui/themes";

interface IProjectData {
  project: IProject;
  author: string;
}

export function Project() {
  const { userId, projectId } = useParams<{
    userId: string;
    projectId: string;
  }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [project, setProject] = useState<IProjectData | null>(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setIsLoading(true);
        const data = await getProject(userId, projectId);
        setProject(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectData();
  }, [userId, projectId]);

  if (isLoading) {
    return <Loader />;
  }

  if (!project) {
    return <div>Проект не найден</div>;
  }

  return (
    <div className={styles.container} id={project.project._id}>
      <div className={styles.card}>
        <div className={styles.author}>
          Автор:&nbsp;
          <Link href={`/users/${userId}`} target="_blank">
            @{project.author}
          </Link>
        </div>
        {project.project.previewImage && (
          <div className={styles.image_container}>
            <img
              src={project.project.previewImage}
              alt="preview"
              className={styles.image}
              loading="lazy"
            />
          </div>
        )}
        <div className={styles.content}>
          <Heading as="h2" className={styles.title}>
            {project.project.title}
          </Heading>
          {project.project.description && (
            <Text as="p" size="4" className={styles.description}>
              {project.project.description}
            </Text>
          )}
          {project.project.links.length > 0 && (
            <div className={styles.links_container}>
              <Heading as="h6" className={styles.links_title}>
                Ссылки на проект:
              </Heading>
              {project.project.links.map((link, index) => (
                <Link
                  href={link}
                  target="_blank"
                  key={`link_${index}`}
                  className={styles.link}
                >
                  {link}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
