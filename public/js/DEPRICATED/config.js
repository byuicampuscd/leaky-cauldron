/*
Firebase configuration in order to setup the hosting environment
*/

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBjfsSzb_ZZx0Lyy7UsNeOkdCRTXwTMy5M",
    authDomain: "leaky-cauldron-4d025.firebaseapp.com",
    databaseURL: "https://leaky-cauldron-4d025.firebaseio.com",
    storageBucket: "",
};
firebase.initializeApp(config);

//Get the database
var database = firebase.database();
