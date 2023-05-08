import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { loginUserReducer } from '../reducers/userReducer';
import { cartReducer } from '../reducers/cartReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
    loginUser: loginUserReducer,
    cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;