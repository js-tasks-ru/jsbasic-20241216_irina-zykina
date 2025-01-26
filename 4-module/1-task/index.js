function makeFriendsList(friends) {
  const ul = document.createElement("ul");
  for (let i = 0; i < friends.length; i++) {
    const li = document.createElement("li");
    const friend = friends[i];
    ul.appendChild(li);
    li.innerHTML = `${friend.firstName} ${friend.lastName}`;
  }

  return ul;
}