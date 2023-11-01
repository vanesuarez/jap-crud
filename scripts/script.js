document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("inputGet1Id");
  const searchButton = document.getElementById("btnGet1");
  const container = document.getElementById("results");

  const urlGetAllUsers = "https://65418069f0b8287df1fe6cf3.mockapi.io/users";

  // get users
  async function getAllUsers(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();

      searchButton.addEventListener("click", () => {
        if (searchInput.value === "") {
          container.innerHTML = "";
          for (let i = 0; i < data.length; i++) {
            container.innerHTML += `
                  <p> ID: ${data[i].id} <br>
                  NAME: ${data[i].name} <br>
                  LASTNAME: ${data[i].lastname} </p>`;
          }
        } else {
          container.innerHTML = `
                  <p> ID: ${data[searchInput.value - 1].id} <br>
                  NAME: ${data[searchInput.value - 1].name} <br>
                  LASTNAME: ${data[searchInput.value - 1].lastname} </p>`;
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  getAllUsers(urlGetAllUsers);

  // funcion para mostrar los usuarios y usar en las otras solicitudes
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

  ///////////////////////////////////////

  // post users

  const inputName = document.getElementById("inputPostNombre");
  const inputLastname = document.getElementById("inputPostApellido");
  const addBtn = document.getElementById("btnPost");

  // funcion y event listener para activar el boton
  function changeAddButton() {
    if (inputName.value && inputLastname.value) {
      addBtn.disabled = false;
    } else {
      addBtn.disabled = true;
    }
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

      // Después de agregar el elemento, vuelva a mostrar la lista actualizada
      displayAllUsers();
    } catch (error) {
      console.error("Error:", error);
    }
  });

  ////////////////////////////////////

  // put users


  const modifyButton = document.getElementById("btnPut");
  const modifyInput = document.getElementById("inputPutId");
  const modalName = document.getElementById("inputPutNombre");
  const modalLastname = document.getElementById("inputPutApellido");
  const saveButton = document.getElementById("btnSendChanges");
  const modifyUserUrl = `https://65418069f0b8287df1fe6cf3.mockapi.io/users/${modifyInput.value}`; 


  // activar el boton
  function changeModifyButton() {
    if (modifyInput.value) {
      modifyButton.disabled = false;
    } else {
      modifyButton.disabled = true;
    }
  }

  modifyInput.addEventListener("input", changeModifyButton);

  
  // PENDIENTE A PARTIR DE ESTA LINEA: HACER FUNCIONAR CODIGO PARA QUE MODIFIQUE UN ELEMENTO, 
  // MOSTRAR EN PANTALLA YA FUNCIONA

  saveButton.addEventListener("click", async () => {
    try {
      const data = await response.json();
      console.log(data);
      
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        name: modalName.value,
        lastname: modalLastname.value,
        id: modifyInput.value
      });

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      await fetch(modifyUserUrl, requestOptions);

      // Después de agregar el elemento, vuelva a mostrar la lista actualizada
      displayAllUsers();


    } catch (error) {
      console.error("Error:", error);
    }
  });

  ////////////////////////////////////

  // delete users





});
