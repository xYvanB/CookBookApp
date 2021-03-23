import React, { useContext, useState } from 'react';
import { Database, sqliteDatabase } from "../database/Database";
import { inMemoryDatabase } from "../database/InMemoryDatabase";
import { List } from '../types/List';

// Inizialize Database Context
const DatabaseContext = React.createContext<Database | undefined>(undefined);

// Store list state in Context
const ListsContext = React.createContext<List[] | undefined>(undefined);
type SetLists = ( list: List[] ) => void;
const SetListsContext = React.createContext<SetLists | undefined>(undefined);

// Let the provider enables the access of our list context from it's component tree
export const ListsContextProvider: React.FunctionComponent = function ({ children }) {
  const [ list, setLists ] = useState<List[]>([]); // Init with empty list of Lists

  return (
    <DatabaseContext.Provider value = { sqliteDatabase }>
      <ListsContext.Provider value = { list }>
        <SetListsContext.Provider value = { setLists }> { children } </SetListsContext.Provider>
      </ListsContext.Provider>
    </DatabaseContext.Provider>
  );
};

export function useDatabase(): Database {
  const database = useContext ( DatabaseContext );
  if ( database == undefined ) {
    throw new Error ('useDatabase must be used within a ListContextProvider');
  }
  return database;
}

export function useListContext(): List[] {
  const listsContext = useContext(ListContext);
  if (listsContext === undefined) {
    throw new Error ('useListsContext must be used within a ListContextProvider');
  }
  return listsContext;
}

export function useSetListContext(): SetLists {
  const listsUpdateContext = useContext(SetListsContext);
  if (listsUpdateContext === undefined) {
    throw new Error ('useSetListsContext must be used within a ListContextProvider');
  }
  return listsUpdateContext;
}