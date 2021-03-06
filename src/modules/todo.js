import { handleActions, createAction } from "redux-actions";
import { Map, List } from "immutable";

const ADD_TODO = "todo/addTodo";
const REMOVE_TODO = "todo/removeTodo";
const TOGGLE_TODO = "todo/toggleTodo";
const REMOVE_ALL_TODOS = "todo/removeAllTodos";

export const addTodo = createAction(ADD_TODO);
export const removeTodo = createAction(REMOVE_TODO);
export const toggleTodo = createAction(TOGGLE_TODO);
export const removeAllTodos = createAction(REMOVE_ALL_TODOS);

const initialState = List([
  Map({
    id: 0,
    title: "hello",
    completed: false
  }),
  Map({
    id: 1,
    title: "world",
    completed: true
  })
]);

const reducer = handleActions({
  [ADD_TODO]: (state, action) => {
    const newId = state.size > 0
      ? state.maxBy(todo => todo.get("id")).get("id") + 1
      : 0;
    
    return state.push(Map({
      id: newId,
      title: action.payload,
      completed: false
    }));
  },
  [REMOVE_TODO]: (state, action) => {
    const index = state.findIndex(todo => todo.get("id") === action.payload);

    return state.delete(index);
  },
  [TOGGLE_TODO]: (state, action) => {
    const index = state.findIndex(todo => todo.get("id") === action.payload);

    return state.setIn([index, "completed"], !state.getIn([index, "completed"]));
  },
  [REMOVE_ALL_TODOS]: (state, action) => {
    return List([]);
  }
}, initialState);

export default reducer;