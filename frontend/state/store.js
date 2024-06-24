import { configureStore } from '@reduxjs/toolkit'
import { pizzaApi } from './pizzaApi'
import filterReducer from './filterSlice'

export const resetStore = () => configureStore({
  reducer: {
    [pizzaApi.reducerPath]: pizzaApi.reducer,
    filter: filterReducer
  },
  middleware: getDefault => getDefault().concat(
  (pizzaApi.middleware),
  ),
})

export const store = resetStore()
