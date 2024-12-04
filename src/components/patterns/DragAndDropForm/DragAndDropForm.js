import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Loader from "../Loader/Loader";

const DragAndDropForm = props => {
    const { onFileAction, processing, onClear } = props;

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file.size > 10 * 1024 * 1024) { // 10MB in bytes
            setError("File size exceeds 10MB. Please upload a smaller file.");
            return;
        }
        setFile(file);
        try {
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
            setError(null); // Clear any previous error
        } catch (e) {
            console.error("Error creating object URL:", e);
            setError("Error creating object URL. Please try again.");
        }
    }, []);

    const onDropRejected = useCallback((fileRejections) => {
        if (fileRejections.length > 0) {
            const errorMessage = fileRejections[0].errors[0].message;
            setError(`Error: ${errorMessage}`);
        }
    }, []);

    const clearPreview = (event) => {
        event.stopPropagation();
        setPreview(null);
        setError(null); // Clear any error when clearing the preview
        onClear(true);
    };

    const createDescription = (event) => {
        event.stopPropagation();
        // Add logic to create a description for the image
        onFileAction(file);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        onDropRejected,
        accept: 'image/*',
        multiple: false
    });

    return (
        <div
            {...getRootProps()}
            className={`border-2 border-dashed p-6 rounded-md ${
                isDragActive ? "border-blue-500" : "border-gray-300"
            }`}
        >
            <input {...getInputProps()} />
            {!preview ?
                isDragActive ? (
                    <p className="text-blue-500">Drop the files here... (Max 10MB)</p>
                ) : (
                    <p className="text-gray-500">Drag 'n' drop some files here, or click to select files (Max 10MB)</p>
                )
                : null
            }
            {error && (
                <p className="text-red-500 mt-2">{error}</p>
            )}
            {preview && (
                <div>
                    <img src={preview} alt="Preview" className="max-w-full h-auto mb-4" />
                    {processing ? <Loader /> : <div>
                        <button
                            type="button"
                            onClick={clearPreview}
                            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Clear
                        </button>
                        <button
                            type="button"
                            onClick={createDescription}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Create Description
                        </button>
                    </div>
                    }
                </div>
            )}
        </div>
    );
};

export default DragAndDropForm;