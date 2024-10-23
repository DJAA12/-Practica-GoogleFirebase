var db = firebase.apps[0].firestore();

const tabla = document.querySelector('#tabla');

db.collection("datosZodiaco").orderBy('posic', 'asc').get().then(function(query) {
    tabla.innerHTML = "";
    var salida = "";
    query.forEach(function(doc) {
        const data = doc.data();
        salida += '<div class="divAnuncio m-3">';
        salida += '<div class="imgBlock"><img src="' + data.url + '" width="100%" /></div>';
        salida += '<div>' + data.signo + '<br/>' + data.rango + '<br/>';
        salida += 'Elemento: ' + (data.elemento || 'N/A') + '<br/>';
        salida += 'Astro: ' + (data.astro || 'N/A') + '<br/>';
        salida += 'Piedra: ' + (data.piedra || 'N/A') + '</div><br/>';

        salida += '<button onclick="editarSigno(\'' + doc.id + '\')">Editar Signo</button>';
        salida += '</div>';
    });
    tabla.innerHTML = salida;
}).catch(function(error) {
    alert("Error al recuperar los signos zodiacales: " + error);
});

function editarSigno(id) {
    window.location.href = `editar.html?id=${id}`;
}
