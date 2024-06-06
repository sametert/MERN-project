import merp from "../../images/merp1.png";
import { User } from "../../models/user";
import React, { useEffect, useState } from "react";
import SignUpModal from "../SignUpModal";
import LoginModal from "../LoginModal";
import * as NotesApi from "../../network/notes_api";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Admin() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />
      <div
        className="flex items-center justify-center h-screen"
        style={{ backgroundColor: "rgb(22,72,196)" }}
      >
        <img src={merp} alt="" />
        {showSignUpModal && (
          <SignUpModal
            onDismiss={() => setShowSignUpModal(false)}
            onSignUpSuccessful={(user) => {
              setLoggedInUser(user);
              setShowSignUpModal(false);
            }}
          />
        )}

        {showLoginModal && (
          <LoginModal
            onDismiss={() => setShowLoginModal(false)}
            onLoginSuccessful={(user) => {
              setLoggedInUser(user);
              setShowLoginModal(false);
            }}
          />
        )}
        {loggedInUser && (
          <button>
            <Link
              to="/homes"
              className="bg-green-600 p-4 hover:font-medium hover:text-sm text-base rounded-lg"
            >
              Ana Ekrana Gidin
            </Link>
          </button>
        )}
      </div>
    </>
  );
}

export default Admin;
