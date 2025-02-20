import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { queryClient } from "./lib/react-query";
import store from "./store/index";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/apolloClient";

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
