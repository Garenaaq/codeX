import { useState } from "react";
import styles from "./postCard.module.scss";
import { Button, Heading, Link } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import { Heart } from "lucide-react";
import { useSelector } from "react-redux";
import IPost from "../../shared/types/postType";
import {
  useDeletePostMutation,
  useLikePostMutation,
} from "./hooks/usePostCardMutations";
import classnames from "classnames";
import ReactMarkdown from "react-markdown";
import { RootState } from "../../app/store/store";
import { PostForm } from "../../features";
import { DialogCustom, ModalCustom } from "../../shared/ui";

const PREVIEW_TEXT_LENGTH: number = 500;

interface IPostCardProps {
  post: IPost;
}

export function PostCard({ post }: IPostCardProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.user);

  const deleteMutation = useDeletePostMutation();
  const likeMutation = useLikePostMutation();

  const confirmDelete = () => {
    deleteMutation.mutate(post.id);
  };

  const handleLikePost = () => {
    if (user) {
      likeMutation.mutate({ idPost: post.id, userId: user.id });
    }
  };

  return (
    <div className={styles.card} id={post.id}>
      <div className={styles.image_container}>
        <img
          src={post.previewImage ? post.previewImage : "no_image.jpeg"}
          alt="previewImg"
          className={styles.image}
          loading="lazy"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.title_container}>
          <Heading as="h2">{post.title}</Heading>
          <Text as="div" size="2" color="gray">
            {post.type}
          </Text>
        </div>
        <div>
          {user ? (
            <Link size="3" href={`/users/${post.authorId}`} color="indigo">
              Автор: @{post.nickname}
            </Link>
          ) : (
            <DialogCustom
              typeDialog="login"
              content="Для просмотра профиля пользователя необходимо авторизоваться."
            >
              <div className={styles.link_author}>Автор: @{post.nickname}</div>
            </DialogCustom>
          )}
        </div>
        <div className={styles.preview_text_block}>
          <Text as="div" size="3" className={styles.preview_text}>
            <ReactMarkdown>
              {post.content.length > PREVIEW_TEXT_LENGTH && !isExpanded
                ? `${post.content.substring(0, PREVIEW_TEXT_LENGTH)}...`
                : post.content}
            </ReactMarkdown>
          </Text>
          {post.content.length > PREVIEW_TEXT_LENGTH && (
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              className={styles.toggleButton}
            >
              {isExpanded ? "Скрыть" : "Показать ещё"}
            </Button>
          )}
        </div>
        <div className={styles.post_actions}>
          <div
            className={classnames(styles.likes, {
              [styles.user_liked]: post.userLiked && user,
            })}
          >
            <Heart width="20" height="20" onClick={handleLikePost} />
            {post.likes} {post.userLiked}
          </div>
          {post.nickname === user?.nickname ? (
            <div className={styles.edit_delete}>
              {/* Редактирование поста */}
              <PostForm typeForm="edit" post={post} />
              {/* Удаление поста */}
              <ModalCustom
                itemType="пост"
                confirmAction={confirmDelete}
                typeModal="delete"
                isLoading={deleteMutation.isPending}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
