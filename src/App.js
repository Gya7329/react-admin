import React, { useState, useEffect } from "react";
//admin exports
import { Resource, Admin } from "react-admin";

import buildHasuraProvider from "ra-data-hasura";

import "./App.css";
//client import
import { ApolloClient, InMemoryCache } from "@apollo/client";

import { createBrowserHistory as createHistory } from "history";
//auth0
import authProvider, { auth0 } from "./utils/authProvider";
//components
import Dashboard from "./components/Dashboard";
//pages
import Loginpage from "./pages/Loginpage";
import postsList, { PostCreate, PostsList, ProductCreate, ProductList } from "./components/posts";

const history = createHistory();

const createApolloClient = async (token) => {
  return new ApolloClient({
    uri: "https://charmed-mullet-68.hasura.app/v1/graphql",
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const App = () => {
  const [dataProvider, setDataProvider] = useState({});
  useEffect(() => {
    const buildDataProvider = async () => {
      console.log(auth0);
      const isAuthenticated = await auth0.isAuthenticated();
      if (!isAuthenticated) {
        return;
      }
      const token = await auth0.getIdTokenClaims();
      console.log(token);
      const idToken = token.__raw;
      const apolloClient = await createApolloClient(idToken);
      const dataProvider = await buildHasuraProvider({
        client: apolloClient,
      });
      setDataProvider(() => dataProvider);
    };
    buildDataProvider();
  }, []);

  return (
    <>
      <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
        title="Hasura Dashboard"
        dashboard={Dashboard}
        history={history}
        loginPage={Loginpage}
      >
        <Resource name="posts" list={PostsList} create={PostCreate} />
      </Admin>
    </>
  );
};

export default App;

// import { fetchUtils, Admin, Resource } from "react-admin";
// import simpleRestProvider from "ra-data-simple-rest";
// import postContainer from "./components/postContainer";

// const fetchJson = (url, options = {}) => {
//   if (!options.headers) {
//     options.headers = new Headers({
//       Accept: "application/json",
//     });
//   }
//   // add your own headers here
//   options.headers.set("Content-Range", "posts 0-24/319");
//   options.headers.set(
//     "x-hasura-admin-secret",
//     "10mjE9RPm0fJ5JD0qwG8RP90uzkQLO5Jel1TeeHTERC0LIqigqvl723C47kECAZa"
//   );
//   options.headers.set(
//    " Access-Control-Expose-Headers","Content-Range"
//   );
//   return fetchUtils.fetchJson(url, options);
// };
// const dataProvider = simpleRestProvider(
//   "https://charmed-mullet-68.hasura.app/api/rest",
//   fetchJson
// );

// const App = () => (
//   <Admin dataProvider={dataProvider}>
//     <Resource name="posts" list={postContainer} />
//   </Admin>
// );

// export default App;
