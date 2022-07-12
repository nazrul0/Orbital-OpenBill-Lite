import React, { useState } from "react";
import "./UserSettings.css";
import PageTitle from "../components/PageTitle";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { useAuthContext } from "../hooks/useAuthContext";
import { projFirestore, projAuth } from "../config/firebase";
import Input from "../components/InputField";
import Button from "../components/Button";

function UserSettings() {
  const { user } = useAuthContext(); // importing user
  const id = user.uid;
  const disp = user.displayName;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function isFilled() {
    if (oldPassword !== "" && newPassword !== "" && confirmPassword !== "") {
      return true;
    } else {
      return false;
    }
  }

  function samePassword() {
    if (newPassword === confirmPassword) {
      return true;
    } else {
      return false;
    }
  }

  function submitPasswordHandler(event) {
    event.preventDefault();

    if (samePassword()) {
      const credential = EmailAuthProvider.credential(user.email, oldPassword);

      reauthenticateWithCredential(user, credential)
        .then((result) => {
          user.updatePassword(newPassword);
          console.log("updated");

          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");

          alert("Your password has been updated!");
        })
        .catch((error) => {
          console.log("Error: " + error.message);
          if (error.code === "auth/wrong-password") {
            alert("Old password is not correct or does not exist.");
          }
        });
    } else if (!samePassword()) {
      console.log("New password and Confirm password do not match!");
      alert("New password and Confirm password do not match!");
    }
  }

  return (
    <div className="settingsMainContainer">
      <div className="userSettingsContainer">
        <PageTitle title="Profile Settings" />
        <h1 className="userDisplayName">{disp}</h1>

        <section className="passwordSettings">
          <form>
            <Input
              className="oldPassword"
              type="password"
              label="Old Password"
              value={oldPassword}
              required
              onChange={(event) => {
                setOldPassword(event.target.value);
                console.log(event.target.value);
                console.log(oldPassword);
              }}
            ></Input>

            <Input
              className="newPassword"
              type="password"
              label="New Password"
              value={newPassword}
              required
              onChange={(event) => {
                setNewPassword(event.target.value);
              }}
            ></Input>

            <Input
              className="confirmPassword"
              type="password"
              label="Confirm New Password"
              value={confirmPassword}
              required
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            ></Input>

            {!isFilled() && <Button text="Confirm" />}
            {isFilled() && (
              <Button
                text="Confirm"
                type="submit"
                onClick={submitPasswordHandler}
              />
            )}
          </form>
        </section>
      </div>
    </div>
  );
}

export default UserSettings;
