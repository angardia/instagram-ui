import { UserService } from "./user.service";
import environment from "../environment/index";

export class PostService {

static async getComments(postId){
    try{
        const res = await fetch(environment.apiUrl + `/post/${postId}/comment`, {
            headers: {
                Authorization: UserService.getToken()
            }
        });
        return res.json();
    }
    catch(e){
        console.log(e);
    }

}


    static feed() {
        return fetch(environment.apiUrl + "/post?sort=-1", {
            headers: {
                Authorization: UserService.getToken()
            }
        })
            .then(res => res.json());
    }

    static async get(id) {
        try {
            const res = await fetch(environment.apiUrl + "/post/" + id, {
                headers: {
                    Authorization: UserService.getToken()
                }
            });
            return res.json();
        }
        catch (e) {
            console.log(e);
        }
    }

    // static async likes(postId) {
    //     try {
    //         const res =await fetch(environment.apiUrl + `/posts/${postId}/likes`, {
    //             method: "POST",
    //             headers: {
    //                 Authorization: UserService.getToken()
    //             }
    //         });
    //         return res.json();

    //     }
    //     catch (e) {
    //         console.log(e);
    //     }
    // }

}