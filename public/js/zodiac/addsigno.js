// JavaScript Document
var db = firebase.apps[0].firestore();
var container = firebase.apps[0].storage().ref();

const txtPosic = document.querySelector('#txtPosic');
const txtSigno = document.querySelector('#txtSigno');
const txtRango = document.querySelector('#txtRango');
const txtArchi = document.querySelector('#txtArchi');
const btnLoad  = document.querySelector('#btnLoad');

const txtElemento = document.querySelector('#txtElemento');
const txtAstro = document.querySelector('#txtAstro');
const txtPiedra = document.querySelector('#txtPiedra');

btnLoad.addEventListener('click', function() {
    const archivo = txtArchi.files[0];
    const nomarch = archivo.name;
    if (archivo == null) {
        alert('Debe seleccionar una imagen');
    } else {
        const metadata = {
            contentType: archivo.type
        };
        const subir = container.child('zodiaco/' + nomarch).put(archivo, metadata);
        subir
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                db.collection("datosZodiaco").add({
                    "posic": parseInt(txtPosic.value),
                    "signo": txtSigno.value,
                    "rango": txtRango.value,
                    "url": url,
                    "elemento": txtElemento.value,
                    "astro": txtAstro.value,
                    "piedra": txtPiedra.value
                }).then(function(docRef) {
                    alert("ID del registro: " + docRef.id);
                    limpiar();
                }).catch(function(FirebaseError) {
                    alert("Error al subir la imagen: " + FirebaseError);
                });
                
            });
    }
});

function limpiar(){
    txtPosic.value = ''
    txtSigno.value = '';
    txtRango.value = '';
    txtArchi.value = '';
    txtPosic.focus();
}
