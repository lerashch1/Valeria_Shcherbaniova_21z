import { Publication } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { publicationsApi } from "../../app/services/publications";
import { RootState } from "../../app/store";

interface InitialState {
  publications: Publication[] | null;
}

const initialState: InitialState = {
  publications: null,
};

const slice = createSlice({
  name: "publications",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(publicationsApi.endpoints.getAllPublications.matchFulfilled, (state, action) => {
        state.publications = action.payload;
      })
  },
});

export default slice.reducer;

export const selectPublications = (state: RootState) =>
  state.publications.publications;