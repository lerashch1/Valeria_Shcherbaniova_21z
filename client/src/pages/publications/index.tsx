import React, { useEffect } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusCircleOutlined } from '@ant-design/icons';
import { CustomButton } from "../../components/custom-button";
import { Publication } from "@prisma/client";
import { Paths } from "../../paths";
import { useNavigate } from "react-router-dom";
import { useGetAllPublicationsQuery } from "../../app/services/publications";
import { Layout } from "../../components/layout";
import { selectUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";

const columns: ColumnsType<Publication> = [
  {
    title: "Категория",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Название",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Ингредиенты",
    dataIndex: "ingredients",
    key: "ingredients",
  },
  {
    title: "Время приготовления",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Описание",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Дополнение",
    dataIndex: "note",
    key: "note",
  },
];

export const Publications = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { data, isLoading } = useGetAllPublicationsQuery();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const gotToAddPublication = () => navigate(Paths.publicationAdd);

  return (
    <Layout>
      <CustomButton type="primary" onClick={gotToAddPublication} icon={ <PlusCircleOutlined /> }>
        Добавить публикацию
      </CustomButton>
      <Table
        loading={isLoading}
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data}
        pagination={false}
        onRow={(record) => {
          return {
            onClick: () => navigate(`${Paths.publication}/${record.id}`),
          };
        }}
      />
    </Layout>
  );
};