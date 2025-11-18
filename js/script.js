//Acceder a la API y ver que datos nos devuelven
//Listar los datos
//Agregar edad aleatoria a los usuarios
//Mostrar todos los datos de los usuarios
//Address tiene que tener los siguientes datos:  usuario.address.street, usuario.address.suite, usuario.address.city

const url = `https://jsonplaceholder.typicode.com/users`;

function getUsers() {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Error a la hora de realizar la consulta. Error: ${response.status}`
        );
      } else {
        return response.json();
      }
    })
    .then((datos) => {
      let template = "";

      const nuevosUsuarios = datos.map((dato, i) => {
        const { age, img, address, ...resto } = dato;
        const { street, suite, city } = address;

        return {
          ...resto,
          address: {
            usuario_address_street: `${street}`,
            usuario_addres_suite: `${suite}`,
            usuario_addres_city: `${city}`,
          },
          age: Math.floor(Math.random() * (55 - 18 + 1)) + 18,
          img: `assets/img/${i + 1}.jpeg`,
        };
      });

      nuevosUsuarios.forEach((elemento, i) => {
        template += `
        <li>
        <img src="${elemento.img}" alt="Imagen" />
         <h2><strong>Nombre:</strong> ${elemento.name}</h2>
            <p><strong>Nombre de usuario:</strong> ${elemento.username}</p>
            <p><strong>Edad:</strong> ${elemento.age}</p>
            <p><strong>Telefono:</strong> ${elemento.phone}</p>
            <p><strong>Compañia:</strong> ${elemento.company.name}</p>
            <p><strong>Website:</strong> ${elemento.website}</p>
            <p><strong>Direccion:</strong> ${elemento.address.usuario_address_street}, ${elemento.address.usuario_addres_suite}, ${elemento.address.usuario_addres_city}</p>
        </li>
        `;
      });

      document.getElementById("listaUsuarios").innerHTML = template;
    })
    .catch((err) => console.log(err));
}

getUsers();
