import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select,RTE } from ".."
import appwriteService from "../../appwrite/config";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PostForm({ post }) {

  const { register, handleSubmit, watch, setValue,
    control, getValues } = useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",


      }
    })


  const navigate = useNavigate()
 const userData = useSelector((state)=>state.auth.userData)

  //if user submits the form
  //if post exist => update the post  . handle file first
  //if not=> create a new post

  const submit = async (data) => {
    //in react hook form  we can create forms which accept datas. It gives access to images
    if (post) {
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

      //delete the previous file
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      //all data remains same except featured images cuz a new images is been uploaded

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    }
    else {
      const file = await appwriteService.uploadFile(data.image[0])
      if (file) {
        const fileId = file.$id
        data.featuredImage = fileId
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        })
        //uplaoding thats why user id
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }

  }

  //method to replace space to dash '-'
  const slugTransform = useCallback((value) => {

    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, '-')

    return ''

  }, [])
  //method on how to use it

  //how to optimis a function inside useEffect ==> store method in a variable and return it in a call back with .unsubscribe()
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {

      if (name === 'title') {
        setValue('slug', slugTransform(value.title, { shouldValidate: true }))
        //setValue slug pe karni hai . Input feild mai name denge. Value hame wo deni hai jo method hamne above banaya hai. ye "slug" wahi unique name hai jo hamlog ...register ke saath lagate hai
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-full lg:w-2/3 px-2 mb-4">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4 text-base-100"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          disabled
          className="mb-4"
          
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className="w-full lg:w-1/3 px-2 mb-4">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
          style={{ width: '100%' }}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg w-full"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
          style={{ width: '100%' }}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
  

}
