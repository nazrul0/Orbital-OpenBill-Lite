import React, { useState } from "react";
import "./UserSettings.css";
import PageTitle from "../components/PageTitle";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { useAuthContext } from "../hooks/useAuthContext";
import Input from "../components/InputField";
import Button from "../components/Button";

function UserSettings() {
  const { user } = useAuthContext(); // importing user
  const disp = user.displayName;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function passwordIsFilled() {
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

  const [namePassword, setNamePassword] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");

  function nameIsFilled() {
    if (namePassword !== "" && newDisplayName !== "") {
      return true;
    } else {
      return false;
    }
  }

  function submitNameHandler(event) {
    event.preventDefault();

    const credential = EmailAuthProvider.credential(user.email, namePassword);

    reauthenticateWithCredential(user, credential)
      .then((result) => {
        user.updateProfile({
          displayName: newDisplayName,
        });
        console.log("updated");

        setNamePassword("");
        setNewDisplayName("");

        alert("Your display name has been updated!");

        window.location.reload(false);
      })
      .catch((error) => {
        console.log("Error: " + error.message);
        if (error.code === "auth/wrong-password") {
          alert("Password is not correct or does not exist.");
        }
      });
  }

  return (
    <div className="settingsMainContainer bg-slate-100">
      <div className="userSettingsContainer">
        <PageTitle title="Profile Settings" />
        <h2 className="userDisplayName">{disp}</h2>

        <section className="settingsSubContainer">
          <h3 className="settingsSectionHeader">Reset Password</h3>
          <form className="changeForm">
            <Input
              className="oldPassword"
              type="password"
              label="Old Password"
              value={oldPassword}
              required
              onChange={(event) => {
                setOldPassword(event.target.value);
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

            {!passwordIsFilled() && (
              <Button text="Confirm" className="bg-indigo-500 text-white" />
            )}
            {passwordIsFilled() && (
              <Button
                text="Confirm"
                className="bg-indigo-500 text-white"
                type="submit"
                onClick={submitPasswordHandler}
              />
            )}
          </form>
        </section>

        <section className="settingsSubContainer">
          <h3 className="settingsSectionHeader">Change Display Name</h3>
          <form className="changeForm">
            <Input
              className="password"
              type="password"
              label="Password"
              value={namePassword}
              required
              onChange={(event) => {
                setNamePassword(event.target.value);
              }}
            ></Input>

            <Input
              className="newDisplayName"
              type="text"
              label="New Display Name"
              value={newDisplayName}
              required
              onChange={(event) => {
                setNewDisplayName(event.target.value);
              }}
            ></Input>

            {!nameIsFilled() && (
              <Button text="Confirm" className="bg-indigo-500 text-white" />
            )}
            {nameIsFilled() && (
              <Button
                text="Confirm"
                className="bg-indigo-500 text-white"
                type="submit"
                onClick={submitNameHandler}
              />
            )}
          </form>
        </section>
      </div>
    </div>
  );
}

export default UserSettings;
