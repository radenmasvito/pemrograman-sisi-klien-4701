// Default Parameters & Template Literals
const greet = (name = 'Visitor') => `Hello, ${name}! Welcome to the ES6 Demo.`;
document.getElementById('greeting').innerHTML = greet();

// Promise for fetching data (simulating)
const fetchUsers = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { name: "John Doe", age: 30 },
                { name: "Jane Doe", age: 25 }
            ]);
        }, 1000);
    });
};

// Async/Await for using the Promise
const displayUsers = async () => {
    const users = await fetchUsers();
    const userListElement = document.getElementById('userList');

    // Destructuring & Template Literals
    users.forEach(user => {
        const { name, age } = user;
        userListElement.innerHTML += `<li>${name}, Age: ${age}</li>`;
    });
};

// Arrow Functions & Spread Operator
document.getElementById('addUser').addEventListener('click', async () => {
    const newUser = { name: "New User", age: 22 };
    const users = await fetchUsers();
    const allUsers = [...users, newUser]; // Using spread to add new user

    document.getElementById('userList').innerHTML = ''; // Clear current list
    allUsers.forEach(user => {
        const { name, age } = user; // Destructuring
        document.getElementById('userList').innerHTML += `<li>${name}, Age: ${age}</li>`;
    });
});

// Initial display
displayUsers();