import { Publication } from "@prisma/client";
import { api } from "./api";

export const publicationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPublications: builder.query<Publication[], void>({
      query: () => ({
        url: "/publications",
        method: "GET",
      }),
    }),
    getPublication: builder.query<Publication, string>({
      query: (id) => ({
        url: `/publications/${id}`,
        method: "GET",
      }),
    }),
    editPublication: builder.mutation<string, Publication>({
      query: (publication) => ({
        url: `/publications/edit/${publication.id}`,
        method: "PUT",
        body: publication,
      }),
    }),
    removePublication: builder.mutation<string, string>({
      query: (id) => ({
        url: `publications/remove/${id}`,
        method: "POST",
        body: { id },
      }),
    }),
    addPublication: builder.mutation<Publication, Publication>({
      query: (publication) => ({
        url: "/publications/add",
        method: "POST",
        body: publication,
      }),
    }),
  }),
});

export const {
  useGetAllPublicationsQuery,
  useGetPublicationQuery,
  useEditPublicationMutation,
  useRemovePublicationMutation,
  useAddPublicationMutation,
} = publicationsApi;

export const {
  endpoints: {
    getAllPublications,
    getPublication,
    editPublication,
    removePublication,
    addPublication,
  },
} = publicationsApi;