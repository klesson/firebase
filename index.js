const firebaseConfig = {
    apiKey: "AIzaSyDBuyioqSGkWua9yf5Erd_JzplV1Y24_Uw",
    authDomain: "klessontodo.firebaseapp.com",
    databaseURL: "https://klessontodo-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "klessontodo",
    storageBucket: "klessontodo.appspot.com",
    messagingSenderId: "464682819379",
    appId: "1:464682819379:web:0b08f6cc295e69ba2fe846"
};

var list = document.getElementById('list');
var text = document.getElementById('text');
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var collection = firebase.firestore().collection('list');

function addItem(value, id) {
    const item = document.createElement('li');
    const itemText = document.createElement('span');
    itemText.textContent = value;
    const itemClose = document.createElement('span');
    itemClose.textContent = 'x';
    itemClose.setAttribute('index', id);
    itemClose.addEventListener('click', remove);
    item.appendChild(itemText);
    item.appendChild(itemClose);
    list.appendChild(item);
}

collection.get().then(snapshot => {
    snapshot.forEach(doc => {
        addItem(doc.data().title, doc.id);
    });
});

function add(event) {
    event.preventDefault();
    if (text.value) {
        collection.add({title: text.value}).then(res => {
            addItem(text.value, res.id);
        });
    }
}

function remove(event) {
    var index = event.target.getAttribute('index')
    event.target.parentElement.remove();
    collection.doc(index).delete();
}