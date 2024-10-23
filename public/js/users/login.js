// JavaScript Document
			// create local database firestore variable
			var db = firebase.apps[0].firestore();
			var auth = firebase.apps[0].auth();

			// create local from webpage inputs
			const txtEmail = document.querySelector('#txtEmail');
			const txtContra = document.querySelector('#txtContra');

			// create local insert button
			const btnLogin = document.querySelector('#btnLogin');

			// assign button listener
			btnLogin.addEventListener('click', function () {
				const fechaActual = new Date();
				auth.signInWithEmailAndPassword(txtEmail.value, txtContra.value)
					.then((userCredential) => {
						const user = userCredential.user;
						db.collection("datosUsuarios").where('idemp', '==', user.uid).get()
							.then(function (docRef) {
								docRef.forEach(function (doc){
									doc.ref.update({ultAcceso: fechaActual}).then(function (){
										document.location.href = 'index.html';
									});
								});
							})
							.catch(function (FirebaseError) {
								alert("Error updating document: " + FirebaseError);
							});
					})
					.catch((error) => {
						alert("Error user access: " + error.message);
					});
			});

