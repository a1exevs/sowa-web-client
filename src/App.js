import './App.css';
import HeaderContainer from "./ui/Header/HeaderContainer";
import NavBar from "./ui/NavBar/NavBar";
import News from "./ui/Modules/News/News";
import Music from "./ui/Modules/Music/Music";
import Settings from "./ui/Modules/Settings/Settings";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import React from "react";
import UsersContainer from "./ui/Modules/Users/UsersContainer";
import LoginDialog from "./ui/LoginDialog/LoginDialog";
import Preloader from "./ui/common/widgets/Preloader/Preloader";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {initializeApp, resetGlobalError} from "./redux/reducers/app_reducer";
import store from "./redux/redux-store";
import {withSuspense} from "./ui/common/hoc/withSuspense";

let ProfileContainer = React.lazy(() => import('./ui/Modules/Profile/ProfileContainer'));
let Messages = React.lazy(() => import('./ui/Modules/Messages/Messages'));
let ProfileContainerWithSuspense = withSuspense(ProfileContainer)
let MessagesWithSuspense = withSuspense(Messages)

class App extends React.Component {
    catchAllUnhandledErrors = (reason, promise) => {
        alert("Some error occured");
        //console.error(promiseRejectionEvent);
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.globalError !== '')
            setTimeout(() => {
                this.props.resetGlobalError()
            }, 5000);
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer errorMessage={this.props.globalError}/>
                <NavBar/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route exact path='/' element={<Navigate to={"/profile"}/>}/>
                        <Route path='/login' element={<LoginDialog/>}/>
                        <Route path='/profile' element={<ProfileContainerWithSuspense/>}/>
                        <Route path='/profile/:userID' element={<ProfileContainerWithSuspense/>}/>
                        <Route path='/messages' element={<MessagesWithSuspense/>}/>
                        <Route path='/news' element={<News/>}/>
                        <Route path='/music' element={<Music/>}/>
                        <Route path='/settings' element={<Settings/>}/>
                        <Route path='/users' element={<UsersContainer/>}/>
                        <Route path='*' element={<div>404 NOT FOUND</div>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    globalError: state.app.globalError
});

let AppContainer = compose(
    connect(mapStateToProps, {initializeApp, resetGlobalError}))
(App);

let SocialNetworkApp = (props) => {
    return <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
};

export default SocialNetworkApp;