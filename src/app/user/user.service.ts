import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {User} from "./user";
import {GlobalConstants} from "../shared/constants/globals";

@Injectable()
export class UserService {
  private baseApiUrl = GlobalConstants.BASE_API_URL;
  constructor(private http: Http) {}

  public getUsers() : Observable<User[]>{
    let usersPath = this.baseApiUrl + 'users';
    let users = this.http.get(usersPath, {headers: this.getHeaders()})
      .map(res => <User[]> res.json())
      .catch(this.handleError);
    return users;
  }

  public getUser(id) {
    var getUserPath = this.baseApiUrl + 'user/'+id;
    return this.http.get(getUserPath,{headers: this.getHeaders()})
      .map(res => <User> res.json())
      .catch(this.handleError);
  }

  public addUser(newUser) {
    var addUserPath = this.baseApiUrl + 'user/add';
    return this.http.post(addUserPath, newUser,{headers: this.getHeaders()})
      .map((res:Response) => res.json())
      .catch(this.handleError);
  }

  public updateUser(id, updatedUser) {
    var addUserPath = this.baseApiUrl + 'user/update/'+id;
    return this.http.put(addUserPath, updatedUser,{headers: this.getHeaders()})
      .map((res:Response) => res.json())
      .catch(this.handleError);
  }

  public deleteUser(id) {
    var deleteUserPath = this.baseApiUrl + 'user/delete/'+id;
    return this.http.delete(deleteUserPath,{headers: this.getHeaders()})
      .catch(this.handleError);
  }

  public isEmailExists(email){
    var isEmailExistsPath = this.baseApiUrl + 'user/isExists';
    return this.http.post(isEmailExistsPath,{email:email},{headers: this.getHeaders()})
      .map((res:Response) => res.json())
      .catch(this.handleError);
  }

  public isUsernameExists(username){
    var isUsernameExistsPath = this.baseApiUrl + 'user/isUsernameExists';
    return this.http.post(isUsernameExistsPath,{username:username},{headers: this.getHeaders()})
      .map((res:Response) => res.json())
      .catch(this.handleError);
  }

  public login(user:User){
    var loginPath = this.baseApiUrl + 'user/login';
    return this.http.post(loginPath,{username:user.username,password:user.password},{headers: this.getHeaders()})
      .map((res:Response) => res.json())
      .catch(this.handleError);
  }

  public updatePassword(user:User){
    var updatePasswordPath = this.baseApiUrl + 'user/updatePassword';
    return this.http.post(updatePasswordPath,{email:user.email,password:user.password},{headers: this.getHeaders()})
      .map((res:Response) => res.json())
      .catch(this.handleError);
  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
  private handleError (error: any) {
    let errorMsg = error.message || ` Problem in retrieving`
    console.error(errorMsg);
    return Observable.throw(errorMsg);
  }

}
