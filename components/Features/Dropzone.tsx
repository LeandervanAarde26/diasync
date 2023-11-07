
import { useDropzone } from "react-dropzone";

import Button from "../Common/Button";

export default function Dropzone({ onDrop, accept, open }: any) {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept,
      onDrop,
    });
  const files = acceptedFiles.map((file) => {
    const path = URL.createObjectURL(file);

    return (
      <li key={path}>
        {path} - {file.size} bytes
      </li>
    );
  });

  return (
    <div className="border rounded-3xl border-dashed  px-4 py-4 flex flex-col gap-4 border-cswhite border-1">
      <div {...getRootProps({ className: "dropzone" })}>
        <input className="input-zone" {...getInputProps()} />
        <div className="text-center">
          {isDragActive ? (
            <p className="dropzone-content text-cswhite mb-3">
              Release to drop the files here
            </p>
          ) : (
            <p className="dropzone-content text-cswhite mb-3">
              Drag’ n’ drop some files here, or click to select files
            </p>
          )}

          <div className="flex items-center justify-center">
            <Button
              label="Upload CSV Data"
              type="secondary"
              clickHandler={open}
            />
          </div>
        </div>
      </div>
      <aside>
        <ul className="text-cswhite">{files}</ul>
      </aside>
    </div>
  );
}

