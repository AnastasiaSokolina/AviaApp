import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './components/App/App'
import { Online, Offline } from 'react-detect-offline'
import { Alert } from 'antd';

import { Provider } from 'react-redux';
import store from './redux/store/store'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={ store }>
    <>
      <Online>
        <React.StrictMode>
            <App />
        </React.StrictMode>
      </Online>
      <Offline>
        <div className='offline'>
          <Alert type='error'
          message='Кажется, кто-то не оплатил Интернет? Проверьте Ваше интернет-соединение и попробуйте обновить страницу' />
        </div>
      </Offline>
    </>
  </Provider>
);

