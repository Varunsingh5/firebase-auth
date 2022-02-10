import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Dashboard.css";
import { auth, db } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import StopWatch from './StopWatch';
import Dashboard1 from './Dashboard1';
import { Avatar } from "@material-ui/core";
import { FaStopwatch } from 'react-icons/fa';

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [onlinevalue, setOnlinevalue] = useState("");

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
      localStorage.setItem('users', JSON.stringify(user));
      sessionStorage.setItem('users', JSON.stringify(user));
      return ({ user })

    } catch (err) {
      console.error(err);
    }
  };

  const setInputValue = (value) => {
    setOnlinevalue(value)
  }

  useEffect(() => {
    if (loading) return;
    fetchUserName();
  }, [user, loading]);
  console.log(user);

  return (
    <div style={{ flexDirection: "row", display: "flex" }}>
      <div style={{ background: 'red', width: "20%", height: '100vh' }}>
        <div style={{ display: 'flex', marginLeft: '30px', alignItems: "center", marginTop: 50 }}>
          <Avatar>{name.substring(0, 1).toUpperCase()}</Avatar>
          <div style={{ marginLeft: '10px' }}>
            {name}
            <div style={{}}> 
              {"Available"}
           
              <FaStopwatch  style={{ fontSize: '25px', marginLeft: '50px', color: 'blanchedalmond' }} />
            </div>
          </div>
          <div style={{
            height: 10, width: 10, borderRadius: 10,
            background: "green",
            position: "absolute", left: 60, top: 80
          }} />

        </div>
        <StopWatch setInputValue={(e) => setInputValue(e)} />

        <div className="dashboard__container" style={{ marginTop: '40px' }}>
          Logged in as
          <div>{name}</div>
          <div >{user?.email}</div>
          {/* <button className="dashboard__btn" onClick={logout}>
          Logout
        </button> */}
        </div>
        {/* <StopWatch /> */}

      </div>



      <div style={{ background: "green", width: "80%", height: "100vh" }}>
        < Dashboard1 onlinevalue={onlinevalue} />
        {/* <StopWatch /> */}

      </div>

      {/* <Calender /> */}
      {/* < Dashboard1 /> */}

    </div>
  );
}

export default Dashboard;




