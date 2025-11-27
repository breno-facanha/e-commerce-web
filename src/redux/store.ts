import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import sidebarValueSlice from "./reducers/sidebarValueSlice";
import { persistStore } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["sidebarValue"]
};

const rootReducer = combineReducers({
    sidebarValue: sidebarValueSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }),
});

export const persistor = persistStore(store);
export default store;