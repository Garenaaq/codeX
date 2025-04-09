import styles from "./main.module.scss";
import { getPosts } from "../../services/postService";
import IPost, { IGetPostsResponse } from "../../shared/types/postType";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useFilterContext } from "../../app/context/FilterContext";
import { Loader } from "../../shared/ui";
import { RootState } from "../../app/store/store";
import { Filter, PostForm } from "../../features";
import { PostCard } from "../../entities";

export function Main() {
  const { user } = useSelector((state: RootState) => state.user);
  const { filters } = useFilterContext();

  const { data, isError, isFetching } = useQuery<IGetPostsResponse, Error>({
    queryKey: ["posts", filters],
    queryFn: async () => {
      const data = await getPosts(filters);
      return data;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <Filter />
      </div>
      <div className={styles.posts}>
        {/* Модалка для создания постов */}
        {user && <PostForm typeForm={"create"} />}

        {/* Отображение постов */}
        <div className={styles.container_posts}>
          {isFetching ? (
            <Loader />
          ) : isError ? (
            <p>
              Произошла ошибка при загрузке постов. Пожалуйста, перезагрузите
              страницу
            </p>
          ) : data?.posts && data.posts.length > 0 ? (
            data.posts.map((post: IPost) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <p>Нет доступных постов</p>
          )}
        </div>
      </div>
    </div>
  );
}
