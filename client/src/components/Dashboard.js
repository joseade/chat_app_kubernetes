import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import ConversationsSection from "./Sections/ConversationsSection";
import ChatSection from "./Sections/ChatSection";
import FriendsSection from "./Sections/FriendsSection";
import Navbar from "./Sections/Navbar";
import { useTranslation } from "react-i18next";

import * as actionsConversations from "../actions/conversations";

const Dashboard = () => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  useEffect(() => {
    dispatch(actionsConversations.conversationsRequest(user));
  }, []);

  useEffect(() => {
    i18n.changeLanguage(user.language);
  }, []);

  if (!user.signin) {
    return <Redirect to={"/login"} />;
  }

  return (
    <div className="container-fluid vh-100">
      <Navbar />
      <div className="row vh-90">
        <ConversationsSection />
        <ChatSection />

        <FriendsSection />
      </div>
    </div>
  );
};

export default Dashboard;
