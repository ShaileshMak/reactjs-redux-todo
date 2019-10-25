import {GET_TODOS, GET_TODOS_STATUS_COUNT, SHOW_TODOS_STATUS_COUNT, NEW_TODO, ADD_TODO, DELETE_TODO, MARK_DONE_TODO} from '../actions/types';
import uuid from 'uuid';
import { utilities } from '../utilities/utils';

const initialToDoList = [
    {name: 'Todo 1', id: uuid(), targetDate: '2019-10-30', checked: false},
    {name: 'Todo 2', id: uuid(), targetDate: '2019-10-31', checked: true},
    {name: 'Todo 3', id: uuid(), targetDate: '2019-10-28', checked: true},
    {name: 'Movie Show', id: uuid(), targetDate: '2019-11-2', checked: false}
];
const initialState = {
    toDoList: initialToDoList,
    showNewToDo: false,
    toDoStatusCount: getToDosStatusCount(),
    showStatus: false
}

function getToDosStatusCount(toDoList = initialToDoList) {
    const totalToDos = toDoList.length;
    const completedToDos = toDoList.filter(toDo => toDo.checked).length;
    const pendingToDos = toDoList.filter(toDo => !toDo.checked).length;
    const overDueToDos = toDoList.filter(toDo => utilities.isPastDueToDo(toDo)).length;
    return {
        totalToDos, completedToDos, pendingToDos, overDueToDos
    }
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_TODOS: 
            return {
                ...state
            }
        case GET_TODOS_STATUS_COUNT: 
            return {
                ...state,
                toDoStatusCount: getToDosStatusCount(state.toDoList)
            }
        case SHOW_TODOS_STATUS_COUNT: 
            return {
                ...state,
                showStatus: !state.showStatus
            }
        case NEW_TODO: 
            return {
                ...state,
                showNewToDo: true
            }
        case ADD_TODO: 
            const newToDo = [{
                name: action.payLoad.toDoValue,
                targetDate: action.payLoad.targetDate,
                id: uuid(),
                checked: false,
            }];
            return {
                ...state,
                toDoList: [...state.toDoList, ...newToDo],
                showNewToDo: false
            }
        case DELETE_TODO:
            return {
                ...state,
                toDoList: state.toDoList.filter(toDo => toDo.id !== action.payLoad)
            }
        case MARK_DONE_TODO: 
            return {
                ...state,
                toDoList: state.toDoList.map((todo, id) => ({
                    ...todo, 
                    checked: action.payLoad === todo.id ? !todo.checked : todo.checked 
                }))
            }
        default:
            return state
    }
}