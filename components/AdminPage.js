import React, { useState, useEffect } from "react";

import {
  Container,
  Header,
  OptionSection,
  SongContent,
  SongList,
} from "./GeneralGroup";

const AdminPage = () => {
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
        <SongList>
          <label> All Song Collection</label>
          <li>
            <audio></audio>
            <p>hello lake ia m here aos fix me</p>
          </li>
        </SongList>
      </SongContent>
    </Container>
  );
};

export default AdminPage;
