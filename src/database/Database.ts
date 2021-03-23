import SQLite from 'react-native-sqlite-storage';
import { DatabaseInitialization } from './DatabaseInitialization';
import { List } from '../types/List';
import { ListItem } from '../types/ListItem';
import { DATABASE } from './Constants';
import { AppState, AppStateStatus } from 'react-native';

export interface Database {
  // Create
  createList(newListTitle: string): Promise<void>;
  addListItem(text: string, list: List): Promise<void>;
  // Read
  getAllLists(): Promise<List[]>;
  getListItems(list: List): Promise<ListItem[]>;
  // Update
  updateListItem(listItem: ListItem): Promise<void>;
  // Delete
  deleteList(list: List): Promise<void>;
}

let databaseInstance: SQLite.SQLiteDatabase | undefined;

// Insert a new list into the database
async function createList (newListTitle: String): Promise<void> {
  return getDatabase()
    .then ((db) => db.executeSql('INSERT INTO List (title) VALUES(?);', [newListTitle]))
    .then (([results]) => {
      const { insertId } = results;
      console.log (`[db] Added list with title: "${newListTitle}"! InsertId: ${insertId}`);
    })
}

// Get an array of all the lists in the database
async function getAllLists(): Promise<List[]> {
  console.log ('[db] Fetching lists from the db...');
  return getDatabase()
    .then((db) => 
      db.executeSql('SELECT list_id as id, title FROM List ORDER BY id DESC;'),
    )
    .then (([results]) => {
      if ( results === undefined ) {
        return [];
      }
      const count = results.rows.lenght;
      const lists: List[] = [];
      for ( let i = 0; i < count; i++ ) {
        const row = results.row.item(i);
        const { title, id } = row;
        console.log (`[db] List title: ${title}, id: ${id}`);
        lists.push({ id, title });
      }
      return lists;
    });
}

async function getListItems(list: List, orderByDone = false): Promise<ListItem[]> {
  if (list === undefined) {
    return Promise.resolve([]);
  }
  return getDatabase()
    .then((db) =>
      db.executeSql(
        `SELECT item_id as id, text, done FROM ListItem WHERE list_id = ? ${orderByDone ? "ORDER BY done" : ""};`,
        [list.id],
      ),
    )
    .then(([results]) => {
      if (results === undefined) {
        return [];
      }
      const count = results.rows.length;
      const listItems: ListItem[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const { text, done: doneNumber, id } = row;
        const done = doneNumber === 1 ? true : false;

        console.log(`[db] List item text: ${text}, done? ${done} id: ${id}`);
        listItems.push({ id, text, done });
      }
      console.log(`[db] List items for list "${list.title}":`, listItems);
      return listItems;
    });
}

async function updateListItem(listItem: ListItem): Promise<void> {
  const doneNumber = listItem.done ? 1 : 0;
  return getDatabase()
    .then((db) =>
      db.executeSql("UPDATE ListItem SET text = ?, done = ? WHERE item_id = ?;", [
        listItem.text,
        doneNumber,
        listItem.id,
      ]),
    )
    .then(([results]) => {
      console.log(`[db] List item with id: ${listItem.id} updated.`);
    });
}

async function deleteList(list: List): Promise<void> {
  console.log(`[db] Deleting list titled: "${list.title}" with id: ${list.id}`);
  return getDatabase()
    .then((db) => {
      // Delete list items first, then delete the list itself
      return db.executeSql("DELETE FROM ListItem WHERE list_id = ?;", [list.id]).then(() => db);
    })
    .then((db) => db.executeSql("DELETE FROM List WHERE list_id = ?;", [list.id]))
    .then(() => {
      console.log(`[db] Deleted list titled: "${list.title}"!`);
    });
}

// "Private" helpers

async function open(): Promise<SQLite.SQLiteDatabase> {
  SQLite.DEBUG (true);
  SQLite.enablePromise (true);

  if (databaseInstance) {
    return Promise.resolve(databaseInstance);
  }
  // In other case, open the database first
  return open();
}

// Open a connection to the database
async function open(): Promise<SQLite.SQLiteDatabase> {
  SQLite.DEBUG (true);
  SQLite.enablePromise (true);

  if (databaseInstance) {
    console.log("[db] Database is already open: returning the existing instance");
    return databaseInstance;
  }

  // In other case, create a new instance
  const db = await SQLite.openDatabase({
    name: DATABASE.FILE_NAME,
    location: 'default',
  });
  console.log("[db] Database open!");

  // Perform any database inizialization or updated, if needed
  const DatabaseInitialization = new DatabaseInitialization();
  await databaseInitialization.updateDatabaseTables(db);

  databaseInstance = db;
  return db;
}

// Close the connection to the database
async function close(): Promise<void> {
  if (databaseInstance === undefined) {
    console.log ("[db] No need to close DB again, it's already closed");
    return;
  }
  const status = await databaseInstance.close();
  databaseInstance = undefined;
}

// Listen to app state changes. Close the db when the app is put into bg
let AppState = 'Active';
console.log ('[db] Adding listener to handle the app state changes');
AppState.addEventListener('change', handleAppStateChange);

// Handle the app switching from foreground to bg and vice versa
function handleAppStateChange(nextAppState: AppStateStatus) {
  if (AppState === 'active' && nextAppState.match(/inactive|background/)) {
    // App become inactive or moved to bg
    console.log ('[db] App has gone to the background, closing DB connection');
    close();
  }
  AppState = nextAppState;
}

// Export functions which fulfill the Database interface
export const sqliteDatabase: Database = {
  createList,
  addListItem,
  getAllLists,
  getListItems,
  updateListItem,
  deleteList,
};