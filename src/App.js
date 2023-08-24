import "./index.css";
import { useState } from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setfriends] = useState(initialFriends);
  const [selectFriend, setSelectFriend] = useState(null);

  function handleAddFriend() {
    setShowAddFriend((show) => !show);
    // console.log(showAddFriend);
    setSelectFriend(null);
  }

  function handleSelection(friend) {
    setSelectFriend((curr) => (curr?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleFriend(friend) {
    setfriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSplitBill(updateFriend, expense) {
    // selectFriend.balance = expense;
    setfriends((prevFriends) =>
      prevFriends.map((friend) =>
        friend.id === updateFriend?.id ? updateFriend : friend
      )
    );

    setSelectFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSelection={handleSelection}
          selectFriend={selectFriend}
        />

        {showAddFriend && (
          <FriendForm friends={friends} handleFriend={handleFriend} />
        )}

        <Button onClick={handleAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>

      {selectFriend && (
        <FriendSplitBill
          selectFriend={selectFriend}
          handleSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function FriendList({ friends, onSelection, selectFriend }) {
  // const friends = initialFriends;
  return (
    <ul>
      {friends.map((frnd) => (
        <Friend
          frnd={frnd}
          key={frnd.id}
          onSelection={onSelection}
          selectFriend={selectFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ frnd, onSelection, selectFriend }) {
  const isSelected = selectFriend?.id === frnd.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={frnd.image} alt="friend-image" />
      <h3>{frnd.name}</h3>
      {frnd.balance < 0 && (
        <p className="red">
          You owe {frnd.name} ₹ {Math.abs(frnd.balance)}
        </p>
      )}

      {frnd.balance > 0 && (
        <p className="green">
          {frnd.name} owes you ₹ {Math.abs(frnd.balance)}
        </p>
      )}

      {frnd.balance === 0 && <p>You and {frnd.name} are even.</p>}
      <Button onClick={() => onSelection(frnd)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FriendForm({ friends, handleFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFrnd = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    handleFriend(newFrnd);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>

      <label>🎆 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>
      <Button>Add</Button>
    </form>
  );
}

function FriendSplitBill({ selectFriend, handleSplitBill }) {
  const [billvalue, setBillValue] = useState("");
  const [expense, setExpense] = useState("");
  const [whoPays, setwhoPays] = useState("user");
  const expenseFriend = billvalue - expense;
  function handleSplit(e) {
    e.preventDefault();
    if (whoPays === "user") {
      selectFriend.balance += expense;
    } else {
      selectFriend.balance -= expense;
    }
    const updateFriend = { ...selectFriend };
    updateFriend.balance = selectFriend.balance;
    handleSplitBill(updateFriend, expenseFriend);
  }

  return (
    <form className="form-split-bill ">
      <h2>SPLIT A BILL WITH {selectFriend.name}</h2>
      <label>💰 Bill value</label>
      <input
        type="text"
        value={billvalue}
        onChange={(e) => setBillValue(Number(e.target.value))}
      ></input>

      <label>🤵🏻 Your Expense</label>
      <input
        type="text"
        value={expense}
        onChange={(e) => setExpense(Number(e.target.value))}
      ></input>

      <label>🧑🏻‍🍼 {selectFriend.name} Expense</label>
      <input type="text" disabled placeholder={expenseFriend}></input>

      <label>🤑 Who is paying the bill ?</label>
      <select value={whoPays} onChange={(e) => setwhoPays(e.target.value)}>
        <option value="user">You</option>
        <option value={selectFriend.name}>{selectFriend.name}</option>
      </select>

      <Button onClick={handleSplit}>Split bill</Button>
    </form>
  );
}
