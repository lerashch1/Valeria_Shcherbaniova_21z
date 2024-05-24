import { Publication } from "@prisma/client";
import { Form, Card, Space } from "antd";
import { CustomButton } from "../custom-button";
import { CustomInput } from "../custom-input";
import { ErrorMessage } from "../error-message";

type Props<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  title: string;
  error?: string;
  publication?: T;
};

export const PublicationForm = ({
  onFinish,
  title,
  publication,
  btnText,
  error,
}: Props<Publication>) => {
  return (
    <Card title={title} style={{ width: "30rem" }}>
      <Form name="add-publication" onFinish={onFinish} initialValues={publication}>
        <CustomInput type="text" name="category" placeholder="Категория" />
        <CustomInput type="text" name="name" placeholder="Название" />
        <CustomInput type="text" name="ingredients" placeholder="Ингредиенты" />
        <CustomInput type="number" name="time" placeholder="Время приготовления (мин)" />
        <CustomInput type="text" name="description" placeholder="Описание" />
        <CustomInput type="text" name="note" placeholder="Дополнение" />
        <Space direction="vertical" size="large">
          <ErrorMessage message={ error } />
          <CustomButton htmlType="submit">{btnText}</CustomButton>
        </Space>
      </Form>
    </Card>
  );
};