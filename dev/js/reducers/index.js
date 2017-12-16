import {combineReducers} from 'redux';

const adv_list_reducer = (state={adv_list:[]}, action) => {
    let current_adventures = state.adv_list.slice(0)
    let adventure_index
    switch(action.type) {
        case "ADD_ADVENTURE":
            current_adventures.push(action.payload)
            return {...state, adv_list:current_adventures}
        case "REMOVE_ADVENTURE":
            adventure_index = current_adventures.indexOf(action.adventure)
            current_adventures.splice(adventure_index, 1)
            return {...state, adv_list:current_adventures}
        case "GET_ADVENTURES":
            return {...state, adv_list:action.adventures}
        case "FOLLOW_ADVENTURE":
            let to_replace = current_adventures.find((adventure) => adventure.title == action.adventure.title)
            adventure_index = current_adventures.indexOf(to_replace)
            current_adventures[adventure_index] = action.adventure
            console.log("Action Adventure: ")
            console.log(action.adventure)
            console.log(current_adventures)
            return {...state, adv_list: current_adventures}
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
