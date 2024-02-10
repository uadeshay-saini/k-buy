// slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';


const initialState = {
  register: {
    username: "",
    email: "", 
    fullName: "",
    password: ""
  },
  login: {
    username: "",
    email: "", 
    password: ""
  },
};

// Async thunk for fetching pins
// export const fetchPins = createAsyncThunk('pin/fetchPins', async (_, thunkAPI) => {
//   try {
//     const response = await fetch("http://localhost:8000/api/v1/users/register")
//     const registerJson = await response.json();

//     thunkAPI.dispatch(setPinsJson(pinsJson));

//     return pinsJson;
//   } catch (error) {
//     console.error("Error fetching pins:", error);
//     throw error;
//   }
// });


export const fetchPins = createAsyncThunk('user/fetchPins', async (_, thunkAPI) => {
  const response = await fetch("http://localhost:3000/api/pin");
const pinsJson = await response.json();
await thunkAPI.dispatch(setPinsJson(pinsJson));
// console.log(state.pinsJson)

return pinsJson;
});

export const registerUser = createAsyncThunk('user/registerUser', async (_, thunkAPI) => {
 

  
  const state = thunkAPI.getState();
  const { username, email, fullName, password } = state.user.register;
  try {
    
  console.log("userregistering");
    const response = await fetch(`http://localhost:8000/api/v1/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, email, fullName, password}),
    });
    
    const userRegister = await response.json();
    console.log(userRegister);
      return userRegister;
  } catch (error) {
    console.log("error occurredwhile registering user", error);
  }

  })

 
//accessthe states in this state and do some research and do add the states 
// export const registerUserr = createAsyncThunk('user/registerUserr', async (_


export const loginUser = createAsyncThunk('user/loginUser', async (_, thunkAPI) => {
 

  const state = thunkAPI.getState();
  const { username, email, password } = state.user.login;
  console.log(username, email, password);

try {
  
  console.log("logininguser");

  const response = await fetch(`http://localhost:8000/api/v1/users/login`, {
    method: 'POST',
    credentials: 'include',
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


export const checkIfUserLoggedIn = createAsyncThunk('user/checkIfUserLoggedIn', async (_, thunkAPI) => {
 

try {
  

  const response = await fetch(`http://localhost:8000/api/v1/users/checkifuserloggedin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}), 
  });
  
  const userLoggedIn = await response.json();
  console.log(userLoggedIn);
  return userLoggedIn;

} catch (error) {
  console.log("user is not Logged in");

}
})

export const logoutUser = createAsyncThunk('user/logoutUser', async (_, thunkAPI) => {
 

  try {
    
  
    const response = await fetch(`http://localhost:8000/api/v1/users/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}), 
    });
    
    const userLoggedIn = await response.json();
    console.log(userLoggedIn);
    return userLoggedIn;
  
  } catch (error) {
    console.log("user is not Logged Out");
  
  }
  })


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRegisterUserName: (state, action) => {
      state.register.username = action.payload;
    },
    setRegisterEmail: (state, action) => {
      state.register.email = action.payload;
    },
    setRegisterFullName: (state, action) => {
      state.register.fullName = action.payload;
    },
    setRegisterPassword: (state, action) => {
      state.register.password = action.payload;
    },


    setLoginUserName: (state, action) => {
      state.login.username = action.payload;
    },
    setLoginEmail: (state, action) => {
      state.login.email = action.payload;
    },
    setLoginPassword: (state, action) => {
      state.login.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        // state.pin.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        // state.pin.loading = false;
        // state.pin.pinsJson = action.payload;
        // state.pin.pinStatus = true;
      })
      .addCase(registerUser.rejected, (state) => {
        // state.pin.loading = false;
      });
  },
});

export const { setRegisterUserName, setRegisterEmail, setRegisterFullName, setRegisterPassword, setLoginUserName, setLoginEmail, setLoginPassword } = userSlice.actions;
export default userSlice.reducer;
