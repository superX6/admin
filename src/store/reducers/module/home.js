import { SET_BANNER_TITLE, SET_BANNER_SUBTITLE } from "../../types";

const initState = {
    title: '',
    subTitle: '',
}

export function home(state = initState, action){
    switch(action.type) {
        case SET_BANNER_TITLE: 
        return {
            ...state,
            title: action.title,
        };
        case SET_BANNER_SUBTITLE: 
        return {
            ...state,
            subTitle: action.subTitle
        };
        default: 
            return state
    }
}