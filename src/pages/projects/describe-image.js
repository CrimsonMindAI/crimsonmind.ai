import * as React from "react";
import { useState } from "react";
import axios from 'axios';
import Cookies from "js-cookie";

import Layout from "../../components/layout";
import DragAndDropForm from "../../components/patterns/DragAndDropForm/DragAndDropForm";
import Breadcrumb from "../../components/patterns/Breadcrumb/Breadcrumb";

export default function DescribeImagePage() {
    const crumbs = [
        { label: "Home", path: "/" },
        { label: "Describe Image" }
    ];

    const GATSBY_IMAGES_API_URL = process.env.GATSBY_IMAGES_API_URL;
    const GATSBY_IMAGES_API_KEY = process.env.GATSBY_IMAGES_API_KEY;

    const [description, setDescription] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);

    const access = () => {
        const cookieName = "crmsnmnd-imgdsc-rq";
        let requests = parseInt(Cookies.get(cookieName) || "0", 10);

        if (requests >= 3) {
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
            const response = await axios.post(`${GATSBY_IMAGES_API_URL}image/describe`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-Api-Key": GATSBY_IMAGES_API_KEY
                }
            });

            const { message } = response.data;
            setDescription(message.content);
        } catch (error) {
            console.error("Error uploading file:", error);
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
            <Breadcrumb crumbs={crumbs} />
            <div className="grid gap-4 mb-4 w-full">
                <div className="w-full">
                    <h1 className="text-4xl inline-block mb-4">
                        <b>Project:</b> Describe Image<br/>
                    </h1>

                    <p className="text-2xl mb-6">
                        A simple project that uses the&nbsp;
                        <a href="https://openai.com" target="_blank">
                            OpenAI
                        </a>
                        &nbsp;API to describe an uploaded image.
                    </p>
                </div>
            </div>

            <div className="grid gap-4 mb-4 w-full">
                <DragAndDropForm
                    processing={processing}
                    onFileAction={onGetDescription}
                    onClear={onClear}
                />
            </div>

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
        </Layout>
    )
}