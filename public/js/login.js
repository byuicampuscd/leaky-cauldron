var displayName,
    email,
    emailVerified,
    photoURL,
    isAnonymous,
    uid,
    refreshToken,
    providerData;

function makeUserTodo() {
    database.ref('users_todos/' + uid).update({
        "todos": "",
        "archive": ""
    });
}

function toggleSignIn() {
    if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GoogleAuthProvider();

        provider.addScope('https://www.googleapis.com/auth/plus.login');
        provider.addScope('profile');
        provider.addScope('email');
        firebase.auth().signInWithRedirect(provider);

    } else {
        firebase.auth().signOut();
        localStorage.removeItem("leakyCauldronUID");
        localStorage.removeItem("leakyCauldronDisplayName");
        localStorage.removeItem("leakyCauldronPhoto");
    }
    document.getElementById('quickstart-sign-in').disabled = true;
}

function initApp() {

    firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            location.reload();
            console.log(token);
        } else {
//            console.log('token null');
        }
        var user = result.user;
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
        } else {
            console.error(error);
        }
    });
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            displayName = user.displayName;
            email = user.email;
            emailVerified = user.emailVerified;
            photoURL = user.photoURL;
            isAnonymous = user.isAnonymous;
            uid = user.uid;
            refreshToken = user.refreshToken;
            providerData = user.providerData;

            localStorage["leakyCauldronUID"] = uid;
            localStorage["leakyCauldronDisplayName"] = displayName;
            localStorage["leakyCauldronPhoto"] = photoURL;

            document.getElementById('quickstart-sign-in').textContent = 'Sign out';
            database.ref('users/' + uid).update({
                displayName: displayName,
                email: email,
                photoURL: photoURL,
            });
            $("#loadError").html("");
        } else {
            document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
            $("#loadError").html("");
            $("#loadError").append("You must be signed in to see and modify templates!");
        }
        document.getElementById('quickstart-sign-in').disabled = false;
    });
    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
}

window.onload = function () {
    initApp();
};
