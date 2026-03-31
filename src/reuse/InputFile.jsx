import React, { useState } from 'react';

const FileUpload = ({ onFileSelect }) => {
    const [dragActive, setDragActive] = useState(false);
    const [files, setFiles] = useState([]);

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles(droppedFiles);
        onFileSelect(droppedFiles); // Pass the first file to the parent
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
        onFileSelect(selectedFiles[0]); // Pass the first file to the parent
    };

    return (
        <div
            className={`border-4 flex items-center justify-center bg-gray-700 rounded-xl overflow-hidden ${dragActive ? 'border-blue-500 border-dashed' : 'border-gray-700 border-solid'
                }`}
        >
            <div
                className="relative poppins py-10 transform transition-all duration-300 shadow-sm bg-gray-50 text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 bg-transparent dark:bg-transparent dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:shadow-sm-light overflow-hidden"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <p className="text-gray-400 text-[16px] uppercase text-center font-semibold">
                    Drag and drop files here
                </p>

                <button
                    className="w-full h-full absolute z-40 top-0 left-0 bg-transparent text-white rounded"
                    onClick={() => document.getElementById('file-input').click()}
                ></button>

                <input id="file-input" type="file" className="hidden" multiple onChange={handleFileChange} />

                {files.length > 0 && (
                    <div className="block text-start mt-10 ps-5">
                        <p className="text-gray-300">Selected Files:</p>
                        <ul className="text-left list-disc ml-5 mt-2 ps-4 text-slate-400">
                            {files.map((file, index) => (
                                <li key={index}>{file.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FileUpload;
