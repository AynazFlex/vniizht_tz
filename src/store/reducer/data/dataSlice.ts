import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  UnknownAction,
} from "@reduxjs/toolkit";
import { ICharacteristic, IData, IInitialState } from "./dataSlice.types";
import axios from "axios";

const initialState: IInitialState = {
  data: [],
  isLoading: false,
  error: "",
  trainName: "",
  characteristics: [],
};

export const getData = createAsyncThunk<
  IData[],
  void,
  {
    rejectValue: string;
  }
>("data/getData", async (_, thunkAPI) => {
  const url =
    "https://gist.githubusercontent.com/allbel/ae2f8ead09baf7bb66d281e3a6050261/raw/4c898f101913cd7918ab1dbfce008fa12c6d4838/mock.json";

  const result = await axios.get<IData[]>(url);

  if (result.status === 200) {
    return result.data;
  }

  return thunkAPI.rejectWithValue("server error");
});

const isError = (action: UnknownAction) => action.type.endsWith("rejected");

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setTrainName(
      state,
      {
        payload,
      }: PayloadAction<{
        trainName: string;
        characteristics: ICharacteristic[];
      }>
    ) {
      state.trainName = payload.trainName;
      state.characteristics = payload.characteristics;
    },
    setCharacteristics(state, { payload }: PayloadAction<ICharacteristic[]>) {
      const train = state.data.find(({ name }) => name === state.trainName);
      if (train) {
        train.characteristics = payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.isLoading = false;
      })
      .addCase(getData.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addMatcher(isError, (state, { payload }: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const { setTrainName, setCharacteristics } = dataSlice.actions;

export default dataSlice.reducer;
