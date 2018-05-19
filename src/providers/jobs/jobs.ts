import { User } from './../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JobsProvider {
  usersList: AngularFireList<User[]>;

  constructor(private db: AngularFireDatabase) {
    console.log('Hello JobsProvider Provider');
    this.usersList = db.list('users');
  }

  getUsersList(): AngularFireList<User[]> {
    return this.usersList = this.db.list('/users');
  }

}
