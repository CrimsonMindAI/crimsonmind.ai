import * as React from "react";
import { useState } from "react";
import axios from 'axios';
import Cookies from "js-cookie";

import Layout from "../../components/layout";
import DragAndDropForm from "../../components/patterns/DragAndDropForm/DragAndDropForm";
import Breadcrumb from "../../components/patterns/Breadcrumb/Breadcrumb";
import GithubIcon from "../../components/patterns/GithubIcon/GithubIcon";

export default function DescribeImagePage() {
    const crumbs = [
        { label: "Home", path: "/" },
        { label: "Describe Image" }
    ];

    const requestLimit = 5;

    const GATSBY_API_GATEWAY_URL = process.env.GATSBY_API_GATEWAY_URL;
    const GATSBY_IMAGES_API_URL = process.env.GATSBY_IMAGES_API_URL;

    const [description, setDescription] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);

    const access = () => {
        const cookieName = "crmsnmnd-imgdsc-rq";
        let requests = parseInt(Cookies.get(cookieName) || "0", 10);

        if (requests >= requestLimit) {
            return false;
        }

        Cookies.set(cookieName, requests + 1);
        return true;
    }

    const onGetDescription = async(file) => {
        setProcessing(true);
        setError(null); // Clear any previous error

        if(!access()) {
            setError("You have reached the maximum number of requests. Please try again later.");
            setProcessing(false);
            setDescription(null);
            return false;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(`${GATSBY_API_GATEWAY_URL}api-gateway`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Api-Url": `${GATSBY_IMAGES_API_URL}image/describe`,
                    "Api-Method": "POST"
                }
            });

            const { message } = response.data.body;
            setDescription(message.content);
        } catch (error) {
            setError("Error uploading file. Please try again.");
        } finally {
            setProcessing(false);
        }
    }

    const onClear = () => {
        setDescription(null);
        setError(null);
    }

    return (
        <Layout>
            <Breadcrumb crumbs={crumbs}/>
            <div className="grid gap-4 mb-4 w-full">
                <div className="w-full">
                    <h1 className="text-3xl sm:text-4xl font-bold inline-block mb-4 break-words">
                        <b>Project:</b> Describe Image
                        <br/>
                    </h1>

                    <p className="text-1xl sm:text-2xl mb-6">
                        A simple project that uses the&nbsp;
                        <a href="https://openai.com" target="_blank">
                            OpenAI
                        </a>
                        &nbsp;API to describe an uploaded image.
                    </p>
                </div>
            </div>

            <div className="grid gap-4 mb-8 w-full">
                <div className="w-full">
                    <h3 className="text-2xl sm:text-3xl inline-block mb-4">
                        Try it out
                    </h3>
                    <DragAndDropForm
                        processing={processing}
                        onFileAction={onGetDescription}
                        onClear={onClear}
                    />

                    {error && (
                        <div className="mt-4 p-4 border rounded bg-red-100 text-red-700">
                            <h2 className="text-2xl mb-2">Error</h2>
                            <p className="mb-0">{error}</p>
                        </div>
                    )}

                    {description && (
                        <div className="mt-4 p-4 border rounded">
                            <h2 className="text-2xl mb-2">Image Description</h2>
                            <p className="mb-0">{description}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid gap-4 mb-4 w-full">
                <div className="w-full">
                    <h3 className="text-2xl sm:text-3xl inline-block mb-4">
                        Use cases
                    </h3>

                    <ul>
                        <li className="text-1xl sm:text-2xl ">Generate alternative text for web images.</li>
                        <li className="text-1xl sm:text-2xl ">Create image descriptions for visually impaired users.
                        </li>
                        <li className="text-1xl sm:text-2xl ">Automate image tagging for SEO purposes.</li>
                    </ul>
                </div>
            </div>

            <div className="grid gap-4 mb-4 w-full">
                <div className="w-full">
                    <h3 className="text-2xl sm:text-3xl inline-block mb-4">
                        Links
                    </h3>
                    <p className="text-1xl sm:text-2xl">
                        <GithubIcon url={"https://github.com/CrimsonMindAI/api.crimsonmind.io"} text="GitHub"/>
                    </p>
                </div>
            </div>
        </Layout>
    )
}