import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import styled from "styled-components";
import firebase from "firebase";
import app from "./firebase";
import SimpleModal from "./moder";

function GeneralGroup({ handleOpen }) {
  const [changeTray, setChangeTray] = useState(true);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [file, setFile] = useState(null);

  const musicStore = app.firestore().collection("suggestedSong");

  const SendingSong = async () => {
    musicStore.settings({ timestampsInSnapshots: true });

    await musicStore.add({
      title,
      artist,
      file,
    });
  };

  const ChangingTray = () => {
    setChangeTray(!changeTray);
  };

  return (
    <Container>
      <Header>
        <h2>Listen to Songs for Choir Rehersals</h2>
      </Header>
      <OptionSection>
        <button
          onClick={() => {
            ChangingTray();
          }}
        >
          All song
        </button>

        <button
          onClick={() => {
            ChangingTray();
          }}
        >
          Newly Verified
        </button>
        <SimpleModal handleOpen={handleOpen} />
      </OptionSection>
      <SongContent>
        {changeTray ? (
          <SongList>
            <label> All Song Collection</label>
            <li>
              <audio></audio>
              <p>hello lake ia m here aos fix me</p>
            </li>
          </SongList>
        ) : (
          <SongList>
            <label>Newly Verified</label>
            <li>
              <audio></audio>
            </li>
            <li>
              <audio></audio>
            </li>{" "}
            <li>
              <audio></audio>
            </li>
            <li>
              <audio></audio>
            </li>
          </SongList>
        )}
      </SongContent>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgb(242, 242, 242);
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  text-transform: upper-case;
`;

const OptionSection = styled.div`
  width: 100%;
  height: auto;
  justify-content: center;
  display: flex;
  margin-top: 40px;
  button {
    width: 200px;
    background-color: rgb(46, 70, 210);
    border: none;
    outline: none;
    margin: 30px;
    height: 50px;
    border-bottom: 3px solid gray;
    color: white;
    font-size: 20px;
    font-weight: bold;
  }
`;

const SongContent = styled.div`
  width: 60%;
  // height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
`;

const SongList = styled.ol`
  max-width: 420px;
  display: flex;

  label {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    width: 100%;
  }
  li {
    max-width: 700px;
    margin-top: 15px;
  }
`;

export const Styles = {
  Container,
  Header,
  OptionSection,
  SongContent,
  SongList,
};

export default GeneralGroup;
