import React from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  ["link", "video"],
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
];
const moduleOptions = {
  toolbar: {
    container: toolbarOptions,
  },
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
interface EditorContentProps {
  text: string;
  setText: (value: string) => any;
  title: string;
}
const EditorContent = ({ text, setText, title }: EditorContentProps) => {
  let covertText = text;

  const handleChange = (value: string) => {
    let newvalue = value;
    if (newvalue) {
      if (newvalue.includes("*")) {
        newvalue = newvalue.replace(/\*/g, "");
      }
      if (newvalue.includes("image")) {
        newvalue = newvalue.replace(
          /linkimage(.*?)linkimage/g,
          `<p class="d-flex"><img width="300" height="150" src="$1" class="sm:max-w-[600px] m-auto max-w-full sm:w-auto w-full h-auto object-cover" alt="${title}" /></p>`
        );
      }
      if (newvalue.includes("video")) {
        newvalue = newvalue.replace(
          /linkvideo(.*?)linkvideo/g,
          `<iframe width="560" height="315" src="https://www.youtube.com/embed/$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
        );
      }
    }

    setText(newvalue);
  };
  if (covertText && covertText.includes("display: none !important;")) {
    covertText = covertText.replace(/style\s*=\s*["'][^"']*["']/g, "");
  }

  return (
    <div>
      <ReactQuill
        theme="snow"
        modules={moduleOptions}
        onChange={handleChange}
        value={text}
        formats={formats}
      />
    </div>
  );
};

export default EditorContent;
