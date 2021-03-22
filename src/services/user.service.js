import Cookies from "js-cookie";
import environment from "../environment/index";

export class UserService {


  static async search(username) {
    const res = await fetch(environment.apiUrl + "/user?username=" + username, {
      headers: {
        Authorization: UserService.getToken()
      }
    });
    return res.json(res);
  }

  static getToken() {
    return Cookies.get("insta-user");
  }

  static async getPosts(username) {

    const res = await fetch(environment.apiUrl + "/user/" + username + "/posts", {
      headers: {
        Authorization: UserService.getToken()
      }
    });
    return res.json();
  }

  static async get(username) {

    const res = await fetch(environment.apiUrl + "/user/" + username, {
      headers: {
        Authorization: UserService.getToken()
      }
    });
    return res.json();
  }


  static me() {
    return fetch(environment.apiUrl + "/user/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: UserService.getToken()
      }
    }).then(res => {
      if (res.status !== 200) {
        return null;
      }
      return res.json();
    });
  }

  static login(creds) {
    return fetch(environment.apiUrl + "/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    });
  }

  static register(values) {

    return fetch(environment.apiUrl + "/user", {
      method: "PUT",
      //header to inform backend we use json
      headers: {
        "Content-Type": "application/json"
      },
      //turn body info into json
      body: JSON.stringify(values)
    });

  }

  // static editUser(values){
  //   return fetch(environment.apiUrl + "/user/edit/:id",{
  //     method: "POST",
  //     headers:{
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(values)
  //   })
  // }
}