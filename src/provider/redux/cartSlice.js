// slices/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';


const initialState = {
    productsAdded: {
      clothing: [
        {
          _Id_OfProduct: "65b4982067f139e7770094b0",
          timeOfAddition: "2024-01-20T10:01:20.562Z",
          color: "RED",
          size: "XXL",
          quantity: 2,
        },
      ],
      electronics: [
        {
          _Id_OfProduct: "65b3a467e30b93baa3630335",
          timeOfAddition: "2024-01-20T10:01:20.562Z",
          quantity: 2,
        },
      ],
      misc: [
        {
          _Id_OfProduct: "65b3a475e30b93baa363033e",
          timeOfAddition: "2024-01-20T10:01:20.562Z",
          quantity: 2,
        },
      ],
    },
  };
  
export const addProductsToCart = createAsyncThunk('cart/addProductsToCart', async (cartParam, thunkAPI) => {
 

    const state = thunkAPI.getState();
  const cart = state.cart; // Accessing the cart state

  console.log(cart);
//   const state = thunkAPI.getState();
//   const cart = state.cart;
  console.log(cart)
 
  try {
    
  console.log("cart");
    const response = await fetch(`http://localhost:8000/api/v1/cart/addproducttocart`, {
      method: 'POST',
  credentials: 'include',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({productsAdded:cartParam}),
    });
    
    const addedToCart = await response.json();
    console.log(addedToCart);
      return addedToCart;
  } catch (error) {
    console.log("error occurredwhile registering user");
  }

  })


export const fetchCart = createAsyncThunk('cart/fetchCart', async (cartParam, thunkAPI) => {
 

    const state = thunkAPI.getState();
  const cart = state.cart; // Accessing the cart state

  console.log(cart);
//   const state = thunkAPI.getState();
//   const cart = state.cart;
  console.log(cart)
 
  try {
    
  console.log("cart");
    const response = await fetch(`http://localhost:8000/api/v1/cart/fetchcart`, {
      method: 'POST',
  credentials: 'include',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(),
    });
    
    const addedToCart = await response.json();
    console.log(addedToCart);
      return addedToCart;
  } catch (error) {
    console.log("error occurred while fetching cart");
  }

  })
//accessthe states in this state and do some research and do add the states 
// export const registerUserr = createAsyncThunk('user/registerUserr', async (_

export const deleteProductsToCart = createAsyncThunk('cart/deleteProductsToCart', async (cartParam, thunkAPI) => {
 

  const state = thunkAPI.getState();
const cart = state.cart; // Accessing the cart state

console.log(cart);
//   const state = thunkAPI.getState();
//   const cart = state.cart;
console.log(cart)

try {
  
console.log("cart");
  const response = await fetch(`http://localhost:8000/api/v1/cart/deleteproducttocart`, {
    method: 'POST',
credentials: 'include',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify({productsAdded:cartParam}),
  });
  
  const addedToCart = await response.json();
  console.log(addedToCart);
    return addedToCart;
} catch (error) {
  console.log("error occurred while deleting product from cart");
}

})


export const loginUser = createAsyncThunk('user/loginUser', async (_, thunkAPI) => {
 

  // const { username, email, password } = useSelector(state => state.user.login);
  // console.log("logininguser");
  const state = thunkAPI.getState();
  const { username, email, password } = state.user.login;
  console.log(username, email, password);

try {
  
  console.log("logininguser");

  const response = await fetch(`http://localhost:8000/api/v1/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, email, password}),
  });
  
  const userLogin = await response.json();
  console.log(userLogin);
  return userLogin;

} catch (error) {
  console.log("userlogin eoor");

}
})


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setClothingId: (state, action) => {
      state.productsAdded.clothing[0]._Id_OfProduct = action.payload;
    },
    setClothingColor: (state, action) => {
      state.productsAdded.clothing[0].color = action.payload;
    },
    setClothingSize: (state, action) => {
      state.productsAdded.clothing[0].size = action.payload;
    },
    setClothingQuantity: (state, action) => {
      state.productsAdded.clothing[0].quantity = action.payload;
    },
    // setRegisterEmail: (state, action) => {
    //   state.register.email = action.payload;
    // },
    // setRegisterFullName: (state, action) => {
    //   state.register.fullName = action.payload;
    // },
    // setRegisterPassword: (state, action) => {
    //   state.register.password = action.payload;
    // },


    // setLoginUserName: (state, action) => {
    //   state.login.username = action.payload;
    // },
    // setLoginEmail: (state, action) => {
    //   state.login.email = action.payload;
    // },
    // setLoginPassword: (state, action) => {
    //   state.login.password = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductsToCart.pending, (state) => {
        // state.pin.loading = true;
      })
      .addCase(addProductsToCart.fulfilled, (state, action) => {
        // state.pin.loading = false;
        // state.pin.pinsJson = action.payload;
        // state.pin.pinStatus = true;
      })
      .addCase(addProductsToCart.rejected, (state) => {
        // state.pin.loading = false;
      });
  },
});

export const { setClothingId, setClothingColor, setClothingSize, setClothingQuantity  } = cartSlice.actions;
export default cartSlice.reducer;
