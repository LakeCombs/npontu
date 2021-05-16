import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import app from "./firebase";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setArtist("");
    setSong(null);
  };

  const sendSongFile = async (e) => {
    const File = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(File.name);
    await fileRef.put(song);
    setSong(await fileRef.getDownloadURL());
  };

  const SuggestSong = async () => {
    await app
      .firestore()
      .collection("suggestedSong")
      .doc()
      .set({
        title: title,
        artist: artist,
        song: song,
      })
      .then((file) => console(file))
      .catch((err) => console.log(err));
    await sendSongFile();
    handleClose();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Suggest a song</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          style={{ marginTop: "10px" }}
          type="text"
          placeholder="song title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          style={{ marginTop: "10px" }}
          type="text"
          placeholder="song artist"
          value={artist}
          onChange={(e) => {
            setArtist(e.target.value);
          }}
        />
        <input
          style={{ marginTop: "10px" }}
          type="file"
          value={song}
          onChange={(e) => {
            setSong(e.target.value);
          }}
        />
        <Button
          style={{
            backgroundColor: "green",
            color: "white",
            marginTop: "10px",
          }}
          onClick={() => {
            SuggestSong();
          }}
        >
          Suggest
        </Button>
        <Button
          onClick={handleClose}
          style={{ backgroundColor: "red", color: "white", marginTop: "10px" }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Suggest a Song
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
