import { createSlice } from "@reduxjs/toolkit";

export const ChangeColor = createSlice({
    name: 'ChangeColor',
    initialState: {
        color: '#000'
    },
    reducers: {
        ChangeColorToColor(state, action) {
            state.color = action.payload;
        }
    }
});

// Export the reducer directly
// export default ChangeColor.reducer;
export const {ChangeColorToColor} = ChangeColor.actions
