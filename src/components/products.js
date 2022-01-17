import React from "react";

import { List, Datagrid, TextField, DateField, ImageField } from "react-admin";

export const ProductList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="_id" />
        <TextField source="name" />
        <TextField source="CountInStock" />
        <TextField source="brand" />
        <TextField source="user" />
        <TextField source="reviews" />
        <TextField source="_v" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
        <TextField source="reviews" />
        <ImageField source="image" />
        <TextField source="price" />
        <TextField source="rating" />
        <TextField source="numReviews" />
      </Datagrid>
    </List>
  );
};
