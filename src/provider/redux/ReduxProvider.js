'use client';
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'

export default function ReduxProvider({ children }) {
  // const storeRef = useRef()
  // if (!storeRef.current) {
  //   // Create the store instance the first time this renders
  //   storeRef.current = makeStore()
  // }

  return <Provider store={store}>{children}</Provider>
}