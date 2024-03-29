import Cookies from "js-cookie";
import environment from "../environment/index";

export class UserService {

  static async editUser(userId, data) {
    try {
      const res = await fetch(environment.apiUrl + `/user/edit/${userId}`, {
        method: "POST",
        body: data,
        headers: {
          Authorization: UserService.getToken()
        }
      });
      const editedUser = await res.json();
      return editedUser;
    }
    catch (e) {
      console.log(e);
    }
  }


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



  static async handleFollow(userId) {
    const updatedUser = await fetch(environment.apiUrl + `/user/${userId}/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: UserService.getToken()
      }
    });
    return updatedUser.json();
  }
}