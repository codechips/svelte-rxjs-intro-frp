// users.ts

import { combineLatest, mergeAll, map, mergeMap, startWith, share, tap, take, toArray } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Subject, BehaviorSubject } from 'rxjs';

const usersEndpoint = 'https://api.github.com/users';
const randomOffset = () => Math.floor(Math.random() * 100000);

// Rx Subject that we use only to trigger reloads
const reload = new Subject();

// instead of exposing subject directly we wrap it in a function
const refresh = () => reload.next();

// replace users with a function instead so that we return
// a new stream on every 'refresh' click
const fetchUsers = () => ajax.getJSON(`${usersEndpoint}?since=${randomOffset()}`);

// call fetchUsers function when we click the refresh button
const userPool = reload.pipe(tap(console.log), startWith(null), mergeMap(fetchUsers), share());

// helper function to get a random user from
// the user list we got from Github
const randomUser = (users: any[]) => users[Math.floor(Math.random() * users.length)];

const users = userPool.pipe(mergeAll(), take(5), toArray());

const replaceUser = (users: any[], pool: any[], login: string) => {
  console.log(users, pool, login);
  const getIndex = (username: string) => users.findIndex(user => user.login === username);
  const idx = getIndex(login);

  while (true || idx !== -1) {
    let newUser = randomUser(pool);
    if (getIndex(newUser.login) === -1) {
      users.splice(idx, 1, newUser);
      break;
    }
  }
  return users;
};

// the suggest 'x' button stream
// we initialize it with an empty string as starting state
const suggest = new BehaviorSubject('');

// wrap the suggest stream in the helper function that we export
const replace = (username: string) => suggest.next(username);

// our main suggestions stream
const suggestions = reload.pipe(
  // emulate the first click to trigger the chain
  startWith(null),
  // replace `null` with `users` stream
  mergeMap(() => users),
  // log to console. useful for debugging
  tap(console.log),
  // this is where we handle new user suggestions
  combineLatest(userPool, suggest, replaceUser),
  // start with an empty array to keep Svelte store happy
  startWith([])
);

export { users, replace, refresh, suggestions };
