import React from "react";
import { Outlet } from "react-router-dom"; 
import UserChat from "../layouts/userlayout/userChat";

function UserChatRoutes() {
    return <>
        <UserChat /> <Outlet />
    </>
};


export default UserChatRoutes;