import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";
//

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

   
    return post ? (
        <div className="p-6 min-h-screen">
            <Container>
                <div className="flex flex-col md:flex-row md:items-start mb-6">
                    {/* Image Section */}
                    <div className="flex mb-4 md:mb-0 md:w-1/3">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl w-full h-auto md:h-full object-cover" // Adjust the height if needed
                        />
                    </div>

                    {/* Content Section */}
                    <div className="md:w-2/3 flex flex-col md:pl-6">
                        <div className="flex flex-col mb-4">
                            <h1 className="text-2xl font-bold text-base-200">
                                {post.title}
                            </h1>
                            <div className="browser-css text-base-100 mt-2">
                                {parse(post.content)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit and Delete Buttons */}
                {isAuthor && (
                    <div className="flex flex-col md:flex-row md:space-x-2 mt-4">
                        <Link to={`/edit-post/${post.$id}`} className="w-full md:w-auto mb-2 md:mb-0">
                            <Button bgColor="bg-green-500" className="w-full md:w-auto">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletePost} className="w-full md:w-auto">
                            Delete
                        </Button>
                    </div>
                )}

                {/* Conditionally render Back to Home button */}
                {!isAuthor && (
                    <div className="flex justify-center mt-6">
                        <Button onClick={() => navigate("/")} bgColor="bg-base-200">
                            <span className="flex items-center">
                                <ArrowLeft className="mr-2" />
                                Back to Home
                            </span>
                        </Button>
                    </div>
                )}
            </Container>
        </div>
    ) : null;
}
