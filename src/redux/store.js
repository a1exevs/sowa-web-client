const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SEND_MESSAGE = 'SEND_MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT';

let store = {
    _state: {
        profilePage: {
            profilePageData: {
                myPostsData: {
                    myPostStateItems: [
                        {id: 1, text: 'How I learned Infra Hard', likeCount: 11},
                        {id: 2, text: 'How I learned Torba Black', likeCount: 22},
                        {id: 3, text: 'About Gimbarr in 2011', likeCount: 33}
                    ],
                    newPostText: ''
                }
            }
        },
        messagesPage: {
            messagesPageData: {
                dialogsData: {
                    dialogStateItems: [
                        {
                            name: 'Anna',
                            id: 1,
                            avatar: 'https://sun1-29.userapi.com/impg/Y9X9YzkWyEOVKaH2NVnmJrKylKzLRIfUB28JnQ/gXD5-qMHH0w.jpg?size=200x0&quality=96&crop=1,10,958,958&sign=71f65528b244b105da1fb5ecc7090381&ava=1'
                        },
                        {name: 'Valera', id: 2, avatar: ''},
                        {
                            name: 'Daniil',
                            id: 3,
                            avatar: 'https://sun1-23.userapi.com/impf/c849216/v849216145/1a1576/LrNK1E8o3fA.jpg?size=200x0&quality=96&crop=0,307,1201,1760&sign=0b6d760b4677bc3703c4c9fbf29fa8b3&ava=1\n'
                        },
                        {
                            name: 'Sergey',
                            id: 4,
                            avatar: 'https://sun1-25.userapi.com/impf/c847221/v847221620/31d22/oMZqbXCsv6w.jpg?size=200x0&quality=96&crop=0,0,852,864&sign=0e8b10795b5d86f97c7eaa35b7ef5999&ava=1'
                        },
                        {
                            name: 'Andrey',
                            id: 5,
                            avatar: 'https://sun1-17.userapi.com/impf/c630919/v630919478/2e6de/2n3IEqnIAoM.jpg?size=200x0&quality=96&crop=0,0,1435,2160&sign=b536f34d5d00b1a31da59dc593278cff&ava=1\n'
                        },
                        {
                            name: 'Kirill',
                            id: 6,
                            avatar: 'https://sun1-92.userapi.com/impf/c852120/v852120846/10c3d2/dFD_PGJcGgo.jpg?size=200x0&quality=96&crop=0,406,1218,1218&sign=4175943873740892fcaddb0c0f1a533c&ava=1'
                        }
                    ]
                },
                messagesData: {
                    messageStateItems: [
                        {message: 'Hello!'},
                        {message: 'Hi!'},
                        {message: 'How are you?'},
                        {message: 'Good!!!'}
                    ],
                    newMessageText: ''
                }
            }
        },
        newsPage: {},
        musicPage: {},
        settingsPage: {},
        sideBar: {}
    },
    getState()
    {
        return this._state;
    },
    dispatch(action)
    {
        if(action.type === UPDATE_NEW_POST_TEXT)
        {
            this._state.profilePage.profilePageData.myPostsData.newPostText = action.newPostTextValue;
            this.rerenderEntireTree(this._state);
        }
        else if(action.type === ADD_POST)
        {
            let newPost = {
                id: 4,
                text: this._state.profilePage.profilePageData.myPostsData.newPostText,
                likeCount: 0
            };

            this._state.profilePage.profilePageData.myPostsData.myPostStateItems.push(newPost);
            this._state.profilePage.profilePageData.myPostsData.newPostText = '';
            this.rerenderEntireTree(this._state);
        }
        else if(action.type === UPDATE_NEW_MESSAGE_TEXT)
        {
            this._state.messagesPage.messagesPageData.messagesData.newMessageText = action.newMessageTextValue;
            this.rerenderEntireTree(this._state);
        }
        else if(action.type === SEND_MESSAGE)
        {
            let newMessage = {message: this._state.messagesPage.messagesPageData.messagesData.newMessageText};

            this._state.messagesPage.messagesPageData.messagesData.messageStateItems.push(newMessage);
            this._state.messagesPage.messagesPageData.messagesData.newMessageText = '';
            this.rerenderEntireTree(this._state);
        }
    },
    rerenderEntireTree()
    {
        console.log("State changed!");
    },
    subscribe(observer)
    {
        this.rerenderEntireTree = observer;
    }
};

export const addPostActionCreator = () => ({ type: ADD_POST })
export const updateNewPostTextActionCreator = (newText) => ({ type: UPDATE_NEW_POST_TEXT, newPostTextValue: newText })
export const sendMessageActionCreator = () => ({ type: SEND_MESSAGE })
export const updateNewMessageTextActionCreator = (newText) => ({ type: UPDATE_NEW_MESSAGE_TEXT, newMessageTextValue: newText })

export default store;
