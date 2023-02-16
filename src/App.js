import React from 'react'
import { Routes, Route } from 'react-router-dom';

import { publicRoutes } from '@/routes';
import DefaultLayout from './layouts/Default/LayoutDefault'
import { Fragment } from 'react';
import Provider from './store/Provider';







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
