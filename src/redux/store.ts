import { configureStore } from '@reduxjs/toolkit';
import guideApi from './api/guideApi';
import expeditionApi from './api/expeditionApi';

const store = configureStore({
  reducer: {
    [guideApi.reducerPath]: guideApi.reducer,
    [expeditionApi.reducerPath]: expeditionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      guideApi.middleware,
      expeditionApi.middleware
    ),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: AppDispatch will include both your manual dispatch and those from RTK Query
export type AppDispatch = typeof store.dispatch;

export default store;
