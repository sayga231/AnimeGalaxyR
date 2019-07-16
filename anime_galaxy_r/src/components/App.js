import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {ToastsContainer, ToastsStore} from "react-toasts";

import './sass/base.sass';

import Home from "./home/Home";
import Sidebar from "./sidebar/Sidebar";
import Topbar from "./topbar/Topbar";
import EpisodePage from "./episodepage/EpisodePage";
import LoginModal from "./login/LoginModal";
import RequestUtilities from "./../util/RequestUtilities";
import RegisterModal from "./register/RegisterModal";
import Profile from "./profile/Profile";
import Footer from "./footer/Footer";
import AnimeList from "./animelist/AnimeList";
import Search from "./search/Search";
import AnimePage from "./animepage/AnimePage";

export default class App extends React.Component {

    static app_instance;

    constructor(props) {
        super(props);

        this.state = {
            is_logged_in: App.isLoggedIn(),
            search: ""
        };
        App.app_instance = this;
        RequestUtilities.setAppInstance(this);

        document.addEventListener("scroll", this.handleScrollAndResize);
        window.addEventListener("resize", this.handleScrollAndResize);
    }

    componentDidMount() {
        this.handleScrollAndResize();
        this.handleKonamiCode();
    }

    static isLoggedIn() {
        return this.getAuthToken() !== undefined && this.getAuthToken() !== null && this.getAuthToken() !== "Token ";
    }

    static getAuthToken() {
        let token = localStorage.getItem("anime_galaxy_auth_token");

        if (token !== null) {
            return `JWT ${localStorage.getItem("anime_galaxy_auth_token")}`;
        } else {
            return null;
        }
    }

    static setAuthToken(value) {
        localStorage.setItem("anime_galaxy_auth_token", value);
    }

    static removeAuthToken() {
        localStorage.removeItem("anime_galaxy_auth_token");
    }

    static hideSidebar() {
        document.querySelector(".sidebar").classList.remove("open");
        document.querySelector(".content-wrapper").classList.remove("dimmed");

        let sidebar_items = document.querySelectorAll(".sidebar a");

        for (let i = 0; i < sidebar_items.length; i++) {
            sidebar_items[i].tabIndex = "-1";
        }
    }

    static loseFocus() {
        document.activeElement.blur();
    }

    static scrollToTop(animated = false) {
        let document_el = document.documentElement;
        if (animated) {
            if (document_el.scrollTop > 0) {
                console.log(Math.max(document_el.scrollTop - 25, 0));
                document_el.scrollTop = Math.max(document_el.scrollTop - Math.max(25, document_el.scrollTop * 0.05), 0);
                setTimeout(() => App.scrollToTop(), 10);
            }
        } else {
            document_el.scrollTop = 0;
        }
    }

    login = (username, password) => {
        return RequestUtilities.sendPostRequest("auth/login", {username: username, password: password}, false).then(res => {
            App.setAuthToken(res.data.token);
            this.setState({
                is_logged_in: true
            });
            return App.isLoggedIn();
        }).catch(error => {
            this.setState({is_logged_in: false});
            throw error;
        });
    };

    logout = () => {
        return RequestUtilities.sendPostRequest("auth/logout", {}, true).then(res => {
            App.removeAuthToken();
            this.setState({is_logged_in: false});
            return App.isLoggedIn();
        }).catch(res => {
            App.removeAuthToken();
            this.setState({is_logged_in: false});
            return App.isLoggedIn();
        });
    };

    register = (username, password, confirmPassword, email) => {
        console.log("------ Register function ------");
        return RequestUtilities.sendPostRequest("auth/register", {
            email: email,
            username: username,
            password1: password,
            password2: confirmPassword
        }).then(res => {
            return true;
        })
    };

    //Handles Enter key presses and clicks the target element
    keyToClick = event => {
        if (event.which === 13) {
            event.target.click();
        }
    };

    handleKonamiCode() {
        let code = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

        let count = 0;

        document.addEventListener("keydown", event => {
            if (event.key !== code[count]) {
                count = 0;
            }
            if (event.key === code[count]) {
                count++;
            }
            if (count === code.length) {
                document.querySelector("html").classList.toggle("filter-invert");
                count = 0;
            }
        });
    }

    //This function is responsible for adding the events needed to handle sticky-like behaviours in the website
    handleScrollAndResize = () => {
        let document_el = document.documentElement;
        let topbar_el = document.querySelector(".topbar");
        let sidebar_el = document.querySelector(".sidebar");
        let banner_el = document.querySelector(".banner-top");

        if (document_el.scrollTop > banner_el.scrollHeight) {
            topbar_el.classList.add("fixed");
            sidebar_el.classList.add("fixed");
        } else {
            topbar_el.classList.remove("fixed");
            sidebar_el.classList.remove("fixed");
        }
        sidebar_el.style.height = `calc(100vh - ${sidebar_el.getBoundingClientRect().top}px)`;
    };

    setSearch = search => {
        this.setState({search: search});
    };

    render() {
        return (
            <Router>
                <header className="page-header" onKeyPress={event => this.keyToClick(event)}>
                    <div className="banner-top">
                        <div className="breakpoint-container h-100 d-flex align-items-center">
                            <div className="banner-logo-container">
                                <img src="/images/banner_logo.webp" alt="Banner Logo" className="banner-logo"/>
                            </div>
                        </div>
                    </div>
                    <Topbar search={this.state.search} setSearch={this.setSearch} is_logged_in={this.state.is_logged_in} logout={this.logout}/>
                </header>
                <Sidebar/>
                <div className="container" onKeyPress={event => this.keyToClick(event)}>
                    <div className="content-wrapper" onClick={App.hideSidebar}>
                        <div className="overlay"/>
                        <div className={this.state.search.length >= 3 ? "d-none" : ""}>
                            <Switch>
                                <Route exact path="/" render={
                                    props =>
                                        <Home {...props} is_logged_in={this.state.is_logged_in}/>
                                }/>
                                <Route path="/v/:id" render={
                                    props =>
                                        <EpisodePage {...props} is_logged_in={this.state.is_logged_in}/>
                                }/>
                                <Route exact path="/anime" render={
                                    props =>
                                        <AnimeList {...props}/>
                                }/>
                                <Route exact path="/anime/:id" render={
                                    props =>
                                        <AnimePage {...props} is_logged_in={this.state.is_logged_in}/>
                                }/>
                                <Route exact path="/profile" render={
                                    props =>
                                        <Profile {...props} is_logged_in={this.state.is_logged_in} self={true}/>
                                }/>
                                <Route exact path="/user/:id" render={
                                    props =>
                                        <Profile {...props} is_logged_in={this.state.is_logged_in} self={false}/>
                                }/>
                            </Switch>
                        </div>
                        <div className={this.state.search.length >= 3 ? "" : "d-none"}>
                            <Search search={this.state.search} setSearch={this.setSearch}/>
                        </div>
                        <Footer/>
                    </div>
                </div>
                <ToastsContainer store={ToastsStore}/>
                {!this.state.is_logged_in ? <LoginModal element_id="login-modal" login={this.login}/> : ""}
                {!this.state.is_logged_in ? <RegisterModal element_id="register-modal" register={this.register}/> : ""}
            </Router>
        );
    }

}
