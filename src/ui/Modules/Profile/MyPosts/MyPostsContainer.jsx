import React from 'react';
import {addPost, updateNewPostText} from "../../../../redux/profilepage_reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        myPostsData: state.profilePage.profilePageData.myPostsData
    }
};

const MyPostsContainer = connect(mapStateToProps, {addPost, updateNewPostText})(MyPosts);

export default MyPostsContainer;