import React, { useEffect, useState } from "react";
import { db, auth, storage } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  QuerySnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import User from "../components/User";
import MessageForm from "../components/MessageForm";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Message from "../components/Message";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [msgs, setMsgs] = useState([]);

  const user1 = auth.currentUser.uid; //currently logged in user

  useEffect(() => {
    const usersRef = collection(db, "users");
    //creating query object

    const q = query(usersRef, where("uid", "not-in", [user1])); //all users except the current user
    //execute query
    const unsub = onSnapshot(q, (QuerySnapshot) => {
      //onsnapshot for status check--->realtime listener
      let users = [];
      QuerySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);

  const selectUser = async(user) => {
    setChat(user);
    console.log(user);

    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgRef = collection(db, "messages", id, "chat");
    const q = query(msgRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (QuerySnapshot) => {
      let msgs = [];
      QuerySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });

    //get last message b/w logged in and selected user
    const docSnap=await getDoc(doc(db,'lastMsg',id))
    //if last message exists and message is from selected user
    if(docSnap.data() && docSnap.data()?.from!==user1)
    {
      await updateDoc(doc(db,'lastMsg',id),{unread:false})
    }
  };

  console.log(msgs);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user2 = chat.uid;

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlurl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlurl;
      console.log(url);
    }
    // cant use adddoc on id itself thats why we need a subcollection
    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });
    // last messages
    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread: true,
    });

    setText("");
  };
  return (
    <div className="home_container">
      <div className="users_container">
        {users.map((user) => (
          <User
            key={user.uid}
            user={user}
            selectUser={selectUser}
            user1={user1}
            chat={chat}
          />
        ))}
      </div>
      <div className="messages_container">
        {chat ? (
          <>
            <div className="messages_user">
              <h3>{chat.name}</h3>
            </div>
            <div className="messages">
              {msgs.length
                ? msgs.map((msg, i) => (
                    <Message key={i} msg={msg} user1={user1} />
                  ))
                : null}
            </div>
            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              setImg={setImg}
            />
          </>
        ) : (
          <h3 className="no_conv">Select a user to start a conversation</h3>
        )}
      </div>
    </div>
  );
};

export default Home;
