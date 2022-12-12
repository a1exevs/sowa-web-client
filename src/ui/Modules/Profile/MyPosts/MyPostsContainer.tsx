import {addPost} from "../../../../redux/reducers/profiles/profiles.action-creators";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state: any) => {
    return {
        myPostsData: state.profilePage.profilePageData.myPostsData
    }
};

const MyPostsContainer = connect(mapStateToProps, {addPost})(MyPosts);

export default MyPostsContainer;
