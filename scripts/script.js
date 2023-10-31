document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("inputGet1Id");
  const searchButton = document.getElementById("btnGet1");
  const container = document.getElementById("results");
  const inputName = document.getElementById("inputPostNombre");
  const inputLastname = document.getElementById("inputPostApellido");
  const addBtn = document.getElementById("btnPost");

  const urlGetAllUsers = "https://65418069f0b8287df1fe6cf3.mockapi.io/users";

  async function getAllUsers(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();

      function displayUsers(users) {
        container.innerHTML = "";
        for (let i = 0; i < users.length; i++) {
          container.innerHTML += `
            <p>ID: ${users[i].id}<br>
            Name: ${users[i].name}<br>
            Last name: ${users[i].lastname}</p>`;
        }
      }

      // get users

      searchButton.addEventListener("click", () => {
        if (searchInput.value === "") {
          displayUsers(data);
        } else {
          container.innerHTML = `
            <p> ID: ${data[searchInput.value - 1].id} <br>
            Name: ${data[searchInput.value - 1].name} <br>
            Last name: ${data[searchInput.value - 1].lastname} </p>`;
        }



      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  getAllUsers(urlGetAllUsers);

  // post users

  addBtn.addEventListener("click", () => {
    const name = inputName.value;
    const lastname = inputLastname.value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: name,
      lastname: lastname,
      id: data.length
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://65418069f0b8287df1fe6cf3.mockapi.io/users", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        getAllUsers(urlGetAllUsers);
      })
      .catch((error) => console.log("Error:", error));
  });
})
