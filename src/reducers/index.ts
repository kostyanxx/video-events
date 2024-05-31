import { PostsActions } from "../actions";

const initialState = {
    data: null,
    error: null,
};

export const dataReducer = (state = initialState, action: PostsActions) => {
    switch (action.type) {
        case "FETCH_DATA_SUCCESS":
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        default:
            return state;
    }
}
