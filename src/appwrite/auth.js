import conf from "../conf/conf.js";

import {Client, Account, ID } from "appwrite";
//from  Appwrite sevices

export class AuthService{
 
  client = new Client();
  account;


  //remember to take input or set things we use constructor
  constructor(){
  
    this.client
     .setEndpoint(conf.appwriteUrl)
     .setProject(conf.appwriteProjectId);
  this.account = new Account(this.client);

  }
  //take account i.e email and password input
  //this will only happen when account creation is done
  //create this method to call all the services from appwrite
  async createAccount({email, password, name}){

    try {
      const userAccount = await this.account.create(ID.unique(),email,password,name)
      if(userAccount){
        //call anothr method which will directly login the user
        //if user acc exits to login karado
        return this.login({email,password});
      }
      else{
        return userAccount
      }
    } catch (error) {
      throw error;
    }
  }

  async login({email,password}){
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  //checl whether user is login or not

  async getCurrentUser(){
  
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }
    
    return null;
  }

  async logout(){
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }
  }
}

//create class
//store in object
//export

const authService = new AuthService();

export default authService;