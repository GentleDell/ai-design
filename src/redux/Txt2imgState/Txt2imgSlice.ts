'use client';

import { createSlice } from '@reduxjs/toolkit';
import { Txt2imgInterface } from '../../type/txt2img';

interface Txt2imgState {
  url: string;
  settings: Txt2imgInterface;
  status: string;
  result: any;
}

const initialState: Txt2imgState = {
  url: '',
  settings: {
    prompt: '',
    negative_prompt: '',
    seed: -1,
    steps: 1,
    width: 128,
    height: 128,
    sampler_index: 'Euler a',
  },
  status: 'idle',
  result: {},
};

export const txt2imgSlice = createSlice({
  name: 'txt2img',
  initialState,
  reducers: {
    setUrl: (state, action) => {
      state.url = action.payload;
    },
    setSettings: (state, action) => {
      state.settings = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setUrl, setSettings, setResult, setStatus } =
  txt2imgSlice.actions;

export default txt2imgSlice.reducer;
