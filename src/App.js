// in src/App.js
import * as React from "react";
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import { ProductList } from "./components/products";

const App = () => (
    <Admin dataProvider={jsonServerProvider('http://localhost:5000/api')}>
        <Resource name="products" list={ProductList} />
    </Admin>
);

export default App;