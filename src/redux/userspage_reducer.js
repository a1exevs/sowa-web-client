const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_CURRENT_USERS_PAGE = 'SET_CURRENT_USERS_PAGE';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentUsersPage: 1,
    pagesRange: 20,
    isFetching: false
};

const usersPage_reducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW: {
            return  {
                ...state,
                users: state.users.map( u => {
                    if(u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            };
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map( u => {
                    if(u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            };
        }
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.count
            }
        }
        case SET_CURRENT_USERS_PAGE: {
            return {
                ...state,
                currentUsersPage: action.page
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        default:
            return state;
    }
};

export const followAC = (userID) => ({ type: FOLLOW, userID: userID });
export const unfollowAC = (userID) => ({ type: UNFOLLOW, userID: userID });
export const setUsersAC = (users) => ({ type: SET_USERS, users: users });
export const setTotalUsersCountAC = (count) => ({ type: SET_TOTAL_USERS_COUNT, count: count});
export const setCurrentUsersPageAC = (page) => ({ type: SET_CURRENT_USERS_PAGE, page: page});
export const setFetchingModeAC = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching: isFetching});

export default usersPage_reducer;