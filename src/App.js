import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { publicRoutes } from '@/routes';
import DefaultLayout from './layouts/Default/LayoutDefault'
import { Fragment } from 'react';
import Provider from './store/Provider';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAf75pA3N3xglLFb_ovURbTtPhLkMJ4LJY",
  authDomain: "tiktok-clone-a1eae.firebaseapp.com",
  databaseURL: "https://tiktok-clone-a1eae-default-rtdb.firebaseio.com",
  projectId: "tiktok-clone-a1eae",
  storageBucket: "tiktok-clone-a1eae.appspot.com",
  messagingSenderId: "87074462286",
  appId: "1:87074462286:web:a4ebbf28dcc778f639411f",
  measurementId: "G-MXN0M75RZW"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



function App() {
  return (
    <Provider>
      <div className="App">
        <Routes>
          {
            publicRoutes.map((route, index) => {
              let Page = route.component
              let Layout = DefaultLayout;
              if (route.Layout) {
                Layout = route.Layout;
              } else if (route.Layout === null) {
                Layout = Fragment;
              }
              return <Route key={index} exact path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            })
          }
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
