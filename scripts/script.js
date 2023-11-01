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
  
        // get users
  
        searchButton.addEventListener("click", () => {
          if (searchInput.value === "") {
            container.innerHTML = "";
  
            for (let i = 0; i < data.length; i++) {
              container.innerHTML += `
                  <p> ID: ${data[i].id} <br>
                  NAME: ${data[i].name} <br>
                  Last name: ${data[i].lastname} </p>`;
            }
          } else {
            container.innerHTML = `
                  <p> ID: ${data[searchInput.value - 1].id} <br>
                  NAME: ${data[searchInput.value - 1].name} <br>
                  Last name: ${data[searchInput.value - 1].lastname} </p>`;
          }
        });
      } catch (error) {
        console.error("Error:", error);
      }
    }
  
    getAllUsers(urlGetAllUsers);
  
    // post users
  
    addBtn.addEventListener("click", async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
          name: inputName.value,
          lastname: inputLastname.value,
        });
    
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
    
        try {
          const response = await fetch(urlGetAllUsers, requestOptions);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          // Después de agregar un usuario, volvemos a cargar la lista completa
          getAllUsers(urlGetAllUsers);
        } catch (error) {
          console.log("error", error);
        }
      });
    });    
    
    
    
    
    
  
