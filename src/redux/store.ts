import { configureStore } from '@reduxjs/toolkit';
import guideApi from '@/entities/guide/api';
import expeditionApi from '@/entities/expedition/api';
import groqApi from '@/lib/api/groqApi';

const store = configureStore({
  reducer: {
    [guideApi.reducerPath]: guideApi.reducer,
    [expeditionApi.reducerPath]: expeditionApi.reducer,
    [groqApi.reducerPath]: groqApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      guideApi.middleware,
      expeditionApi.middleware,
      groqApi.middleware
    ),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: AppDispatch will include both your manual dispatch and those from RTK Query
export type AppDispatch = typeof store.dispatch;

export default store;
