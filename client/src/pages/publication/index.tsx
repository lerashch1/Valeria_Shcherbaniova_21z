import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Descriptions, Space, Divider, Modal } from "antd";
import { CustomButton } from "../../components/custom-button";
import { useState } from "react";
import { Paths } from "../../paths";
import { useNavigate, Link, useParams, Navigate } from "react-router-dom";
import {
    editPublication,
  useGetPublicationQuery,
  useRemovePublicationMutation,
} from "../../app/services/publications";
import { Layout } from "../../components/layout";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { ErrorMessage } from "../../components/error-message";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";

export const Publication = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const params = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetPublicationQuery(params.id || "");
  const [removePublication] = useRemovePublicationMutation();
  const user = useSelector(selectUser);

  if (isLoading) {
    return <span>Загрузка</span>;
  }

  if (!data) {
    return <Navigate to="/" />;
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const handleDeletePublication = async () => {
    hideModal();

    try {
      await removePublication(data.id).unwrap();

      navigate(`${Paths.status}/deleted`);
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
        <Divider orientation="left">Публикация</Divider>
      <Descriptions bordered>
        <Descriptions.Item label="Категория" span={3}>
          {data.category}
        </Descriptions.Item>
        <Descriptions.Item label="Название" span={3}>
          {data.name}
        </Descriptions.Item>
        <Descriptions.Item label="Ингредиенты" span={3}>
          {data.ingredients}
        </Descriptions.Item>
        <Descriptions.Item label="Время" span={3}>
          {data.time}
        </Descriptions.Item>
        <Descriptions.Item label="Описание" span={3}>
          {data.description}
        </Descriptions.Item>
        <Descriptions.Item label="Дополнение" span={3}>
          {data.note}
        </Descriptions.Item>
      </Descriptions>
      {user?.id === data.userId && (
        <>
          <Divider orientation="left">Действия</Divider>
          <Space>
            <Link to={`/publication/edit/${data.id}`}>
              <CustomButton
                shape="round"
                icon={<EditOutlined />}
                type="ghost"
              >
                Редактировать
              </CustomButton>
            </Link>
            <CustomButton
              shape="round"
              onClick={showModal}
              icon={<DeleteOutlined />}
              type="ghost"
            >
              Удалить
            </CustomButton>
          </Space>
        </>
      )}
      <ErrorMessage message={error} />
      <Modal
        title="Подтвердите удаление"
        open={isModalOpen}
        onOk={handleDeletePublication}
        onCancel={hideModal}
        okText="Подтвердить"
        cancelText="Отменить"
      >
        Вы действительно хотите удалить публикацию?
      </Modal>
    </Layout>
  );
};