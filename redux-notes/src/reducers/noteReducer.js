import { createSlice } from '@reduxjs/toolkit'

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    createNote(state, action) {
      state.push(action.payload)
    },
    toggleImportanceOf(state, action) {
      const id = action.payload.id

      return state.map((note) => (note.id !== id ? note : action.payload))
    },
    setNotes(state, action) {
      return action.payload
    },
  },
})

export const { createNote, toggleImportanceOf, setNotes } = noteSlice.actions

export default noteSlice.reducer
