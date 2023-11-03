document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("results");
  const errorAlert = document.getElementById("alert-error");

  const urlGetAllUsers = "https://65418069f0b8287df1fe6cf3.mockapi.io/users";

  // funcion para mostrar la alerta de error
  function showErrorAlert(response) {
    if (!response.ok) {
      errorAlert.style.display = "block";
    }
  }

  // funcion para usar en el resto del codigo, muestra todo el array
  async function displayAllUsers() {
    try {
      const response = await fetch(urlGetAllUsers);
      const data = await response.json();

      container.innerHTML = "";
      for (let i = 0; i < data.length; i++) {
        container.innerHTML += `
          <p> ID: ${data[i].id} <br>
          NAME: ${data[i].name} <br>
          LASTNAME: ${data[i].lastname} </p>`;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // get (search) users

  const searchInput = document.getElementById("inputGet1Id");
  const searchButton = document.getElementById("btnGet1");

  searchButton.addEventListener("click", async () => {
    try {
      const response = await fetch(urlGetAllUsers);
      const data = await response.json();

      if (searchInput.value === "") {
        displayAllUsers(); // si el input esta vacio muestra todos los usuarios
      } else {
        const searchId = parseInt(searchInput.value);

        // validacion - si el input es un numero
        if (!isNaN(searchId)) {
          const user = data.find((item) => parseInt(item.id) === searchId);

          if (user) {
            container.innerHTML = `
            <p> ID: ${user.id} <br>
            NAME: ${user.name} <br>
            LASTNAME: ${user.lastname} </p>`;

            errorAlert.style.display = "none";

            searchInput.value = "";
          } else {
            // Muestra alerta de error y no muestra nada en el container
            errorAlert.style.display = "block";
            container.innerHTML = "";
            searchInput.value = "";
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  // post users

  const inputName = document.getElementById("inputPostNombre");
  const inputLastname = document.getElementById("inputPostApellido");
  const addBtn = document.getElementById("btnPost");

  // funcion y event listener para activar el boton
  function changeAddButton() {
    addBtn.disabled = !(inputName.value && inputLastname.value);
  }

  inputName.addEventListener("input", changeAddButton);
  inputLastname.addEventListener("input", changeAddButton);

  // evento y funcion asincronica para el fetch

  addBtn.addEventListener("click", async () => {
    try {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        name: inputName.value,
        lastname: inputLastname.value,
      });

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(urlGetAllUsers, requestOptions);

      inputName.value = "";
      inputLastname.value = "";

      // muestra todos los elementos con el nuevo agregado y limpia los campos
      displayAllUsers();
    } catch (error) {
      console.error("Error:", error);
    }
  });

  // put (modify) users

  const modifyButton = document.getElementById("btnPut");
  const modifyInput = document.getElementById("inputPutId");
  const modalName = document.getElementById("inputPutNombre");
  const modalLastname = document.getElementById("inputPutApellido");
  const saveButton = document.getElementById("btnSendChanges");

  // activar el boton de modificar
  function changeModifyButton() {
    modifyButton.disabled = !modifyInput.value;
  }

  modifyInput.addEventListener("input", changeModifyButton);

  // activar el boton de guardar
  function changeSaveButton() {
    saveButton.disabled = !(modalName.value && modalLastname.value);
  }

  modalName.addEventListener("input", changeSaveButton);
  modalLastname.addEventListener("input", changeSaveButton);

  saveButton.addEventListener("click", async () => {
    const userIdToModify = modifyInput.value;

    try {
      const modifyUserURL = `${urlGetAllUsers}/${userIdToModify}`;

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        name: modalName.value,
        lastname: modalLastname.value,
        id: userIdToModify,
      });

      let requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      let response = await fetch(modifyUserURL, requestOptions);

      if (!response.ok) {
        saveButton.setAttribute("data-bs-dismiss", "modal");
        showErrorAlert(response);
      } else {
        displayAllUsers();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  // delete users

  const deleteButton = document.getElementById("btnDelete");
  const deleteInput = document.getElementById("inputDelete");

  // funcion y event listener para activar el boton
  function changeDeleteButton() {
    deleteButton.disabled = !deleteInput.value;
  }

  deleteInput.addEventListener("input", changeDeleteButton);

  // funcion para accionar el boton y eliminar un elemento segun su ID
  deleteButton.addEventListener("click", async () => {
    const userIdToDelete = deleteInput.value;
    if (userIdToDelete) {
      try {
        const deleteUserURL = `${urlGetAllUsers}/${userIdToDelete}`;
        const requestOptions = {
          method: "DELETE",
        };

        let response = await fetch(deleteUserURL, requestOptions);
        showErrorAlert(response);

        displayAllUsers();

        deleteInput.value = "";
      } catch (error) {
        console.error("Error:", error);
      }
    }
  });
});
