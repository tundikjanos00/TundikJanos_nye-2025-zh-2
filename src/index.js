import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Chat } from './Chat.js';
import { Provider } from 'react-redux';
import { actions, store } from './store/store.js';

const router = createBrowserRouter([
  {
      path: '/',
      element:  <App />,
      children: [
          {
              path: '',
              element: <Chat />
          },
          {
            path: '*',
            element: <div style={{ width: '400px', margin: '36px auto', fontSize: '36px', textAlign: 'center' }}>:(</div>
          }
      ]
  },
]);

store.dispatch(actions.createNewConversation());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

window['_state'] = () => store.getState();

// process.env.OPENAI_API_KEY

