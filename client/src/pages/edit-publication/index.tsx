import { Publication } from "@prisma/client";
import { Row } from "antd";
import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useEditPublicationMutation, useGetPublicationQuery } from "../../app/services/publications";
import { PublicationForm } from "../../components/publication-form";
import { Layout } from "../../components/layout";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-error-with-message";

export const EditPublication = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [error, setError] = useState("");
  const { data, isLoading } = useGetPublicationQuery(params.id || "");
  const [editPublication] = useEditPublicationMutation();

  if (isLoading) {
    return <span>Загрузка</span>
  }

  const handleEditPublication = async (publication: Publication) => {
    try {
      const editedPublication = {
        ...data,
        ...publication
      };

      await editPublication(editedPublication).unwrap();

      navigate(`${Paths.status}/updated`);
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <PublicationForm 
          onFinish={handleEditPublication}
          title="Редактировать публикацию"
          publication={data}
          btnText="Редактировать"
          error={ error }
        />
      </Row>
    </Layout>
  );
};