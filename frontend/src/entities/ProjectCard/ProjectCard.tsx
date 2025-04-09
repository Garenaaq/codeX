import { useState } from "react";
import styles from "./projectCard.module.scss";
import { Button, Heading, Link } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import { IProject } from "../../shared/types/profileType";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store/store";
import { useParams } from "react-router-dom";
import { useDeleteProjectMutation } from "./hooks/useProjectCardMutations";
import { ProjectForm } from "../../features";
import { ModalCustom, TooltipCustom } from "../../shared/ui";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

const PREVIEW_TEXT_LENGTH: number = 500;

interface IProjectCardProps {
  project: IProject;
}

export function ProjectCard({ project }: IProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.user);
  const { userId } = useParams<{ userId: string }>();

  const deleteProjectMutation = useDeleteProjectMutation();

  const confirmDelete = () => {
    deleteProjectMutation.mutate(project._id);
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/users/${userId}/project/${project._id}`;
    navigator.clipboard.writeText(link).then(() => {
      toast.success("Ссылка скопирована");
    });
  };

  return (
    <div className={styles.card} id={project._id}>
      {project.previewImage && (
        <div className={styles.image_container}>
          <img
            src={project.previewImage}
            alt="previewImg"
            className={styles.image}
            loading="lazy"
          />
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.title_container}>
          <Link
            href={`/users/${userId}/project/${project._id}`}
            target="_blank"
          >
            <Heading as="h2">{project.title}</Heading>
          </Link>
        </div>
        <div className={styles.preview_text_block}>
          {project.description && project.description.length > 0 && (
            <>
              <Text as="div" size="4" className={styles.preview_text}>
                {project.description.length > PREVIEW_TEXT_LENGTH && !isExpanded
                  ? `${project.description.substring(
                      0,
                      PREVIEW_TEXT_LENGTH
                    )}...`
                  : project.description}
              </Text>
              {project.description.length > PREVIEW_TEXT_LENGTH && (
                <Button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={styles.toggleButton}
                >
                  {isExpanded ? "Скрыть" : "Показать ещё"}
                </Button>
              )}
            </>
          )}
        </div>

        {project.links.length > 0 && (
          <div className={styles.links_project_container}>
            <Heading as="h6">Ссылки на проект:</Heading>
            {project.links.map((link, index) => (
              <div className={styles.link_project} key={`link_${index}`}>
                <Link href={link} target="_blank">
                  {link}
                </Link>
              </div>
            ))}
          </div>
        )}
        <div className={styles.project_actions}>
          <div className={styles.edit_delete}>
            {/* Поделиться проектом */}
            <TooltipCustom content="Копировать ссылку">
              <Copy width="19" height="19" onClick={handleCopyLink} />
            </TooltipCustom>
            {user && userId === user.id ? (
              <>
                {/* Редактирование проекта */}
                <ProjectForm typeForm="edit" project={project} />

                {/* Удаление проекта */}
                <ModalCustom
                  itemType="проект"
                  confirmAction={confirmDelete}
                  typeModal="delete"
                  isLoading={deleteProjectMutation.isPending}
                />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
