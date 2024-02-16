// slices/productSlice.js
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
  





export const fetchSingleClothingProducts = createAsyncThunk('cart/fetchSingleClothingProducts', async (productId, thunkAPI) => {
 

try {
  
console.log("cart");
  const response = await fetch(`http://localhost:8000/api/v1/products/clothing/fetchsingleclothingproduct`, {
    method: 'POST',
credentials: 'include',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify({_id: productId}),
  });
  
  const fetchedClothingProducts = await response.json();
  console.log(fetchedClothingProducts);
    return fetchedClothingProducts;
} catch (error) {
  console.log("error occurredwhile registering user");
}

})


export const fetchAllClothingProducts = createAsyncThunk('cart/fetchAllClothingProducts', async (_, thunkAPI) => {
 

    const state = thunkAPI.getState();
  const cart = state.cart; // Accessing the cart state

  console.log(cart);
//   const state = thunkAPI.getState();
//   const cart = state.cart;
  console.log(cart)
  try {
    
  console.log("cart");
    const response = await fetch(`http://localhost:8000/api/v1/products/clothing/fetchallclothingproducts?page=3`, {
      method: 'POST',
  credentials: 'include',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({}),
    });
    
    const fetchedClothingProducts = await response.json();
    console.log(fetchedClothingProducts);
      return fetchedClothingProducts;
  } catch (error) {
    console.log("error occurredwhile registering user");
  }

  })

  export const fetchSingleElectronicsProducts = createAsyncThunk('cart/fetchSingleElectronicsProducts', async (productId, thunkAPI) => {
 

    try {
      
    console.log("cart");
      const response = await fetch(`http://localhost:8000/api/v1/products/electronics/fetchsingleelectronicsproduct`, {
        method: 'POST',
    credentials: 'include',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({_id: productId}),
      });
      
      const fetchedClothingProducts = await response.json();
      console.log(fetchedClothingProducts);
        return fetchedClothingProducts;
    } catch (error) {
      console.log("error occurredwhile registering user");
    }
    
    })
    
    
    export const fetchAllElectronicsProducts = createAsyncThunk('cart/fetchAllElectronicsProducts', async (_, thunkAPI) => {
     
    
        const state = thunkAPI.getState();
      const cart = state.cart; // Accessing the cart state
    
      console.log(cart);
    //   const state = thunkAPI.getState();
    //   const cart = state.cart;
      console.log(cart)
      try {
        
      console.log("cart");
        const response = await fetch(`http://localhost:8000/api/v1/products/electronics/fetchallelectronicsproducts?page=3`, {
          method: 'POST',
      credentials: 'include',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({}),
        });
        
        const fetchedClothingProducts = await response.json();
        console.log(fetchedClothingProducts);
          return fetchedClothingProducts;
      } catch (error) {
        console.log("error occurredwhile registering user");
      }
    
      })

      export const fetchSingleMiscProducts = createAsyncThunk('cart/fetchSingleMiscProducts', async (productId, thunkAPI) => {
 

        try {
          
        console.log("cart");
          const response = await fetch(`http://localhost:8000/api/v1/products/misc/fetchsinglemiscproduct`, {
            method: 'POST',
        credentials: 'include',
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify({_id: productId}),
          });
          
          const fetchedClothingProducts = await response.json();
          console.log(fetchedClothingProducts);
            return fetchedClothingProducts;
        } catch (error) {
          console.log("error occurredwhile registering user");
        }
        
        })
        
        
        export const fetchAllMiscProducts = createAsyncThunk('cart/fetchAllMiscProducts', async (_, thunkAPI) => {
         
        
            const state = thunkAPI.getState();
          const cart = state.cart; // Accessing the cart state
        
          console.log(cart);
        //   const state = thunkAPI.getState();
        //   const cart = state.cart;
          console.log(cart)
          try {
            
          console.log("cart");
            const response = await fetch(`http://localhost:8000/api/v1/products/misc/fetchallmiscproducts?page=3`, {
              method: 'POST',
          credentials: 'include',
              headers: {
                'Content-Type': 'application/json', 
              },
              body: JSON.stringify({}),
            });
            
            const fetchedClothingProducts = await response.json();
            console.log(fetchedClothingProducts);
              return fetchedClothingProducts;
          } catch (error) {
            console.log("error occurredwhile registering user");
          }
        
          })


//accessthe states in this state and do some research and do add the states 
// export const registerUserr = createAsyncThunk('user/registerUserr', async (_


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


const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // setRegisterUserName: (state, action) => {
    //   state.register.username = action.payload;
    // },
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
      .addCase(fetchAllClothingProducts.pending, (state) => {
        // state.pin.loading = true;
      })
      .addCase(fetchAllClothingProducts.fulfilled, (state, action) => {
        // state.pin.loading = false;
        // state.pin.pinsJson = action.payload;
        // state.pin.pinStatus = true;
      })
      .addCase(fetchAllClothingProducts.rejected, (state) => {
        // state.pin.loading = false;
      });
  },
});

export const {  } = productSlice.actions;
export default productSlice.reducer;
