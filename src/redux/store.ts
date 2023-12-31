'use client';

import { configureStore } from '@reduxjs/toolkit';
import Txt2imgSlice from './Txt2imgState/Txt2imgSlice';
import Img2imgSlice from './Img2imgState/Img2imgSlice';
import ExtraSlice from './ExtraState/ExtraSlice';

export const store = configureStore({
  reducer: {
    txt2img: Txt2imgSlice,
    img2img: Img2imgSlice,
    extra: ExtraSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
