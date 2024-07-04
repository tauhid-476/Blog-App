//databases
import conf from "../conf/conf.js";
import {Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{

   client = new Client()
   databases;
   bucket;//bucket  or storage same hai

  //  create account when constructor is called
  constructor(){

    this.client
     .setEndpoint(conf.appwriteUrl)
     .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client)
    this.bucket = new Storage(this.client)


  }
  //pass all the attributes in articles(collection)

  async createPost({title, slug, content, featuredImage, status, userId}){

    try {

      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,//u can use ID.unique()
        {
         title,
         content,
         featuredImage,
         status,
         userId
        }
        //pass all the further information as it is
        //all the attributees
      )
      
    } catch (error) {
     console.log("Appwrite service :: createPost:: error",error);
    }

  }

  //update post
  //same params
  //for update of post take his id separately it will be good
  async updatePost(slug,{title, content, featuredImage, status, userId}){

    try {
      
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }

      )
    } catch (error) {
     console.log("Appwrite service :: updatePost :: error",error)
    }
  }

  //delete post
  async deletePost(slug){
    try {
      
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
      return true
    } catch (error) {
      
     console.log("Appwrite service :: deletePost :: error",error)
      return false
    }

  }

  //get one post
  async getPost(slug){

    try {
      
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
      
    } catch (error) {
     console.log("Appwrite service :: getPost :: error",error)
      return false
    }
  }

  //get all posts
  // concept of queries
  // to get only those doc which is active
  //status should be equal to active
  async getPosts(queries = [Query.equal("status","active")]){
    try {
      return this.databases.listDocuments(

        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries,

      )
    } catch (error) {
     console.log("Appwrite service :: getPosts :: error",error);
     return false
    }

  }

  

  //**  File Services **/

  //file upload service
  async uploadFile(file){
    try {

      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      )
      
    } catch (error) {
     console.log("Appwrite service :: uploadFile :: error",error)
      return false
    }
  }


  //delete file service
  async deleteFile(fileId){
    try {
      return await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId

      )
     return true
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error",error);
      return false
    }
  }

  //get file preview
  //response is fast so we dont use await

  getFilePreview(fileId){
    return this.bucket.getFilePreview(
      conf.appwriteBucketId,
      fileId
    )
  }


   
  }


const service = new Service();
export default service