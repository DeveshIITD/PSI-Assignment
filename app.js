let users = [];

function fetchUsers(callback) {
  setTimeout(() => {
    callback(users);
  }, 1000);
}

function displayUsers(usersToDisplay) {
  const userListDiv = document.querySelector('#usersList');
  userListDiv.innerHTML = '';

  usersToDisplay.forEach((user) => {
    const userDiv = document.createElement('div');
    userDiv.innerHTML = `${user.name} <button class="delete-btn" data-id="${user.id}">Delete</button> `;
    userListDiv.appendChild(userDiv);
  });
}

document.getElementById('usersList').addEventListener('click', function (event) {
  if (event.target.classList.contains('delete-btn')) {
    const userId = event.target.getAttribute('data-id');
    confirmAndDeleteUser(parseInt(userId, 10));
  }
});

// function confirmAndDeleteUser(userId) {
//   const confirmDelete = confirm('Are you sure you want to delete this user?');

//   if (confirmDelete) {
//     users = users.filter((user) => user.id !== userId);
//     displayUsers(users);
//   }
// }

function confirmAndDeleteUser(userId) {
  const confirmDelete = confirm('Are you sure you want to delete this user?');

  if (confirmDelete) {
    console.log('Before deletion:', users);

    users = users.filter((user) => user.id !== userId);

    console.log('After deletion:', users);

    displayUsers(users);
  }
}


function addUser() {
  const userNameInput = document.getElementById('userName');
  const userName = userNameInput.value.trim();

  if (userName) {
    const newUser = { id: Date.now(), name: userName };
    users.push(newUser);
    displayUsers(users);

    userNameInput.value = '';
  }
}

function searchUsers() {
  const searchTermInput = document.getElementById('userName');
  const searchTerm = searchTermInput.value.trim();

  if (searchTerm) {
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    displayUsers(filteredUsers);
  } else {
    displayUsers(users);
  }
}

fetchUsers((fetchedUsers) => {
  users = fetchedUsers;
  displayUsers(users);
});
