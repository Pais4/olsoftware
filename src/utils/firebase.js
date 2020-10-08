import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC9xQwMJ_2diql_lRRx8nU6LyfH7DU0uRs",
  authDomain: "olsoft-196cf.firebaseapp.com",
  databaseURL: "https://olsoft-196cf.firebaseio.com",
  projectId: "olsoft-196cf",
  storageBucket: "olsoft-196cf.appspot.com",
  messagingSenderId: "473523054538",
  appId: "1:473523054538:web:a09a4d36fbccbabc9f1133"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

  // const firebaseConfig = {
  //     apiKey: "AIzaSyCEuNdekQE5XiDJ2AqeEiQP_3njWS2YXA8",
  //     authDomain: "olsoftware-b9276.firebaseapp.com",
  //     databaseURL: "https://olsoftware-b9276.firebaseio.com",
  //     projectId: "olsoftware-b9276",
  //     storageBucket: "olsoftware-b9276.appspot.com",
  //     messagingSenderId: "78989904458",
  //     appId: "1:78989904458:web:dc8ba1833345220b2774b3"
  //   };