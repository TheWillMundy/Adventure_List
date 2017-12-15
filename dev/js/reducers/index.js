import {combineReducers} from 'redux';

const adv_list_reducer = (state={adv_list:[]}, action) => {
    let current_adventures = state.adv_list.slice(0)
    switch(action.type) {
        case "ADD_ADVENTURE":
            current_adventures.push(action.payload)
            return {...state, adv_list:current_adventures}
        case "REMOVE_ADVENTURE":
            let adventure_index = current_adventures.indexOf(action.adventure)
            current_adventures.splice(adventure_index, 1)
            return {...state, adv_list:current_adventures}
        case "GET_ADVENTURES":
            return {...state, adv_list:action.adventures}
        default:
            return state
    }
}

const active_user_reducer = (state={active_user:{}, token: ''}, action) => {
    switch(action.type) {
        case "SWITCH_USER":
            return {...state, active_user:action.user, token: action.token}
        default:
            return state
    }
}

const allReducers = combineReducers({
  adv_list_reducer, active_user_reducer
});

export default allReducers;
