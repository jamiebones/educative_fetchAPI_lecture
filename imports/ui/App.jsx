import React, { useEffect, useState } from "react";
import { fetch } from "meteor/fetch";

export const App = () => {
  const [data, setData] = useState(null);
  const [username, setUsername] = useState("");
  const [getData, setGetData] = useState(false);

  const retrieveData = async () => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    setData(data);
    setGetData(false);
  };

  useEffect(() => {
    if (getData) {
      retrieveData();
    }
  }, [getData]);

  const changeUserName = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const getProfile = () => {
    if (username.length > 3) {
      setGetData(true);
      console.log("i was called");
    }
  };

  return (
    <div>
      <h1>API CALL WITH FETCH</h1>

      <input
        type="text"
        placeholder="github username"
        onChange={changeUserName}
        value={username}
        style={{padding: "10px"}}
      />
      <button style={{padding: "10px", fontSize: "14px"}}
      onClick={getProfile}
      >retrieve profile</button>

      { getData && <p>Loading data from Github.....</p>}

      {data && (
        <div>
          <img
            src={data.avatar_url}
            style={{ width: "200px", marginTop: "10px" }}
          />
          <p>Name : {data.login}</p>
          <p>Bio: {data.bio}</p>

          <p>followers : {data.followers}</p>
        </div>
      )}
    </div>
  );
};
