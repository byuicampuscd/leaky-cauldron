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
}

function initApp() {

    firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
        } else {
//            console.log('token null');
        }
        var user = result.user;
        $('#loginDependentArea').show();
        $('#signInLoader').hide();
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

            database.ref('users/' + uid).update({
                displayName: displayName,
                email: email,
                photoURL: photoURL,
            });

            $("#signInWrapper").hide();
            $("#fireOptions, #signOutBtn").show();
        } else {
            $("#signInWrapper").show();
            $("#fireOptions, #signOutBtn").hide();
        }
    });
    $('#signInWrapper button, #signOutBtn').click(toggleSignIn);
}

window.onload = function () {
    initApp();
};
