// users.ts

import { combineLatest, map, mergeMap, startWith, share } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Subject, Observable } from 'rxjs';

const usersEndpoint = 'https://api.github.com/users';
const randomOffset = () => Math.floor(Math.random() * 100000);

// Rx Subject that we use only to trigger reloads
const reload = new Subject();

// instead of exposing subject directly we wrap it in a function
const refresh = () => reload.next();

// replace users with a function instead so that we return
// a new stream on every 'refresh' click
const fetchUsers = () => {
  return ajax.getJSON(`${usersEndpoint}?since=${randomOffset()}`);
};

// call fetchUsers function when we click the refresh button
const users = reload.pipe(startWith(null), mergeMap(fetchUsers), share());

// helper function to get a random user from
// the user list we got from Github
const randomUser = (users: any[]) => users[Math.floor(Math.random() * users.length)];

const refreshOne = new Subject();
const refreshTwo = new Subject();
const refreshThree = new Subject();

const createSuggestion = (refresh: Observable<any>) =>
  refresh.pipe(
    startWith(null),
    // name variable as _ to show that we don't care about it
    combineLatest(users, (_, users) => randomUser(users))
  );

const suggestionOne = createSuggestion(refreshOne);
const suggestionTwo = createSuggestion(refreshTwo);
const suggestionThree = createSuggestion(refreshThree);

export { refresh, refreshOne, refreshTwo, refreshThree, suggestionOne, suggestionTwo, suggestionThree };
