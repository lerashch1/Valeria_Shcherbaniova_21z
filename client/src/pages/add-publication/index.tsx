import { Row } from "antd";
import { useState } from "react";
import { PublicationForm } from "../../components/publication-form";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/layout";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { useAddPublicationMutation } from "../../app/services/publications";
import { Publication } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { Paths } from "../../paths";

export const AddPublication = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [addPublication] = useAddPublicationMutation();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleAddPublication = async (data: Publication) => {
    try {
      await addPublication(data).unwrap();

      navigate(`${Paths.status}/created`);
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
          onFinish={handleAddPublication}
          title="Добавить публикацию"
          btnText="Добавить"
          error={ error }
        />
      </Row>
    </Layout>
  );
};