import styles from "./filter.module.scss";
import { roles } from "../../shared/data/roles";
import { typePost } from "../../shared/data/typePost";
import { Button, Heading } from "@radix-ui/themes";
import { useFilterContext } from "../../app/context/FilterContext";
import { InputSelect } from "../../shared/ui";
import { Formik, Form } from "formik";

interface IFilters {
  direction: string;
  type: string;
}

export function Filter() {
  const { filters, setFilters } = useFilterContext();

  const initialValues: IFilters = {
    direction: filters.direction || "",
    type: filters.type || "",
  };

  const handleSubmit = (values: IFilters) => {
    setFilters(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ resetForm }) => (
        <Form className={styles.filter_container}>
          <Heading as="h3">Фильтрация</Heading>
          <InputSelect
            options={roles}
            id="direction"
            label="Направление"
            name="direction"
            placeholder="Направление"
          />
          <InputSelect
            options={typePost}
            id="type"
            label="Тип поста"
            name="type"
            placeholder="Тип поста"
          />
          <div className={styles.btn_filters}>
            <Button type="submit">Применить</Button>
            <Button type="submit" color="crimson" onClick={() => resetForm()}>
              Сбросить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
