import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

const Context = createContext({});

 const Provider = props => {
  // Initial values are obtained from the props
  const {
    categories: initialCategories,
    //selectedUser: initialSelectedUsers,
    children
  } = props;

  const boy ="yes"

  // Use State to keep the values
  const [categories, setCategories] = useState(initialCategories);
  //const [selectedUser, setSelectedUser] = useState(initialSelectedUsers);

  // Make the context object:
  const categoriesContext = {
    categories,
    setCategories,
    boy
  };

  // pass the value in provider and return
  return <Context.Provider value={categoriesContext}>{children}</Context.Provider>;
};

const PgCatProvider= {
    Provider,
    Context
};

PgCatProvider.propTypes = {
  categories: PropTypes.array,
};

PgCatProvider.defaultProps = {
  categories: ["monday"],
};


export default PgCatProvider