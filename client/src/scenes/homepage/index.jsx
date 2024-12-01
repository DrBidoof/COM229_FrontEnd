//will have react components for home page
import React from "react";
import {useSelector} from "react-redux";
import Navbar from "scenes/navbar"
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
    const isNonMobileScreens = window.matchMedia("(min-width: 1000px)").matches;
    const {_id, picturePath} = useSelector((state) => state.user);
    return (
        <div>
            <Navbar />
            <div className="navbar-container">
                <div className="widget-container">
                    <UserWidget userId={_id} picturePath={picturePath} />
                </div>
                    <div className="main-content">
                        <MyPostWidget picturePath={picturePath} />
                        <PostsWidget userId={_id}/>
                    </div>
                    {isNonMobileScreens && (
                        <div className="widget-container">
                            <AdvertWidget />
                            <div className="advert-container"/>
                            <FriendListWidget userId= {_id} />
                        </div>
                    )}
            </div>

        </div>
    );
};
export default HomePage;