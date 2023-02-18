import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';

import { publicRoutes } from '@/routes';
import DefaultLayout from './layouts/Default/LayoutDefault'
import { Fragment } from 'react';
import Provider from './store/Provider';
import config from './config';
import VideoDetail from './pages/Video/Videodetail';

function App() {
  const location = useLocation();
  let { state } = useLocation();
  const videoDetail = location.state && location.state.data;

  return (
    <Provider>
      <div className="App">
        {videoDetail && (
          <Routes>
            <Route exact path={config.routes.video} element={<VideoDetail />} />
          </Routes>
        )}
        <Routes location={videoDetail || location}>
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
