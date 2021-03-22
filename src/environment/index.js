import { development } from "./development";
import { production } from "./production";

let environment = development;
if( process.env.NODE_ENV === "production"){
    environment = production;
}

export default environment;