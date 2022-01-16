import React from "react";

import {
  List,
  Datagrid,
  TextField,
  Create,
  SimpleForm,
  TextInput,
  DateField,
} from "react-admin";

export const PostsList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="body" />
      </Datagrid>
    </List>
  );
};

export const PostCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Enter post name" source="title" />
        <TextInput label="Enter desciption" source="body" />
        <DateField label="Choose date" source="date" />
      </SimpleForm>
    </Create>
  );
};
