import { configureStore } from '@reduxjs/toolkit';
import { ChangeColor } from './ColorChange';
import pinReducer, { fetchPins} from './pinSlice'
import userReducer from './userSlice'
import cartReducer from './cartSlice'

// Export the store instance, not a function
export const store = configureStore({
    reducer: {
        'ChangeColor': ChangeColor.reducer,
        pin: pinReducer,
        user: userReducer,
        cart: cartReducer

    }
});
// store.js

// const store = configureStore({
//   reducer: {
//     pin: pinReducer,
//   },
// });

// store.dispatch(fetchPins()); // Optionally, dispatch the fetchPins action to load pins initially

// export default store;
