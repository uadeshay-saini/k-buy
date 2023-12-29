import { configureStore } from '@reduxjs/toolkit';
import { ChangeColor } from './ColorChange';
import pinReducer, { fetchPins} from './pinSlice'

// Export the store instance, not a function
export const store = configureStore({
    reducer: {
        'ChangeColor': ChangeColor.reducer,
        pin: pinReducer,

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
