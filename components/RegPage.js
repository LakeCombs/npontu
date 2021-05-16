import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import app from "./firebase";

const RegPage = () => {
  const hist = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [flip, setFlip] = useState(true);

  const choirMembers = app.firestore().collection("user");

  const Turn = () => {
    setFlip(!flip);
  };

  const Register = async () => {
    // const res =
    await app.auth().createUserWithEmailAndPassword(email, password);
    console.log("signin");
    hist.push("/home");
    const res = await choirMembers.doc(res.user.uid).set({
      name,
      email,
      password,
    });
  };

  const Login = async () => {
    const res = await app.auth().signInWithEmailAndPassword(email, password);
    console.log(res.user.uid);
    hist.push("/home");
  };

  useEffect(() => {}, []);

  return (
    <Reg>
      <RegForm>
        {flip ? (
          <>
            <label>Login to choir music collection</label>
            <input
              placeholder="email@email.com"
              type="email"
              value={email}
              required={true}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              type="submit"
              onClick={() => {
                Login();
              }}
            >
              Login
            </button>
            <p>
              not a choir member{" "}
              <Link
                onClick={() => {
                  Turn();
                }}
              >
                Join the Group
              </Link>
            </p>
          </>
        ) : (
          <>
            <label>Sign In as a new member</label>
            <input
              placeholder="user name"
              type="text"
              value={name}
              required={true}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="email@email.com"
              type="email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="password"
              type="password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              placeholder="comfirm password"
              type="password"
              value={confirmPassword}
              required={true}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="submit"
              onClick={() => {
                Register();
              }}
            >
              {" "}
              Register
            </button>
            <p>
              already a choir member{" "}
              <a
                onClick={() => {
                  Turn();
                }}
              >
                Sign in
              </a>
            </p>
          </>
        )}
      </RegForm>
    </Reg>
  );
};

const Reg = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: coral;
`;

const RegForm = styled.form`
  max-width: 420px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  label {
    width: 100%;
    justify-content: center;
    display: flex;
    font-weight: 500;
    font-size: 30px;
  }

  input {
    width: 100%;
    height: 30px;
    margin-top: 20px;
    outline: none;
    border: 1px solid white;
    border-radius: 5px;
    padding-left: 10px;
  }
  button {
    width: 100%;
    height: 30px;
    margin-top: 20px;
    border: none;
    outline: black;
    border-radius: 5px;
    justify-self: center;
    color: white;
    background-color: brown;
  }
  p {
    color: white;
    margin-top: 15px;
    font-weight: normal;
    font-size: 15px;
    text-align: center;
  }
`;

export default RegPage;
