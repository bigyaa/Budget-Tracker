import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { ApolloProvider } from '@apollo/client';
import { QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import client from './graphql/apolloClient';
import { queryClient } from './lib/react-query';
import store from './store/index';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </QueryClientProvider>
    </ApolloProvider>
  </React.StrictMode>
);
