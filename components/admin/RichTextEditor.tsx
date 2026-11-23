"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Pilcrow,
  Undo,
  Redo,
  RemoveFormatting,
} from "lucide-react";

type RichTextEditorProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
};

const RichTextEditor = ({
  label,
  value,
  onChange,
  required = false,
  placeholder,
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[140px] max-h-[280px] overflow-y-auto px-4 py-3 text-sm text-FCFAFA focus:outline-none prose prose-invert prose-sm max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-1.5 [&_ul]:my-1.5 [&_ol]:my-1.5 [&_h2]:text-base [&_h2]:font-bold [&_h2]:my-2 [&_h3]:text-sm [&_h3]:font-bold [&_h3]:my-1.5",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(editor.isEmpty ? "" : html);
    },
  });

  // Keep editor content in sync when value changes externally (e.g., in Edit form)
  useEffect(() => {
    if (!editor) return;
    const currentHTML = editor.getHTML();
    if (value !== currentHTML && (value || editor.isEmpty === false)) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="space-y-1">
        <label className="text-[13px] text-FCFAFA block">
          {label} {required && <span className="text-red">*</span>}
        </label>
        <div className="w-full h-[180px] bg-transparent border border-D6D6D6/30 rounded-md animate-pulse" />
      </div>
    );
  }

  const btnBase =
    "p-1.5 rounded transition-colors text-D6D6D6 hover:text-white hover:bg-white/10";
  const btnActive = "bg-red text-white hover:bg-red/90";

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="text-[13px] text-FCFAFA block">
          {label} {required && <span className="text-red">*</span>}
        </label>
        <span className="text-[11px] text-D6D6D6/70">
          Rich text supported (Bold, Italic, Bullet points, etc.)
        </span>
      </div>

      <div className="w-full border border-D6D6D6/30 rounded-md overflow-hidden bg-transparent focus-within:border-red transition-colors">
        {/* Formatting Toolbar */}
        <div className="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b border-D6D6D6/20 bg-dark/60">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`${btnBase} ${editor.isActive("bold") ? btnActive : ""}`}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`${btnBase} ${editor.isActive("italic") ? btnActive : ""}`}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-4 bg-D6D6D6/20 mx-1" />

          <button
            type="button"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`${btnBase} ${
              editor.isActive("paragraph") && !editor.isActive("bulletList") && !editor.isActive("orderedList")
                ? btnActive
                : ""
            }`}
            title="Paragraph / Normal Text"
          >
            <Pilcrow className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`${btnBase} ${
              editor.isActive("heading", { level: 2 }) ? btnActive : ""
            }`}
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`${btnBase} ${
              editor.isActive("heading", { level: 3 }) ? btnActive : ""
            }`}
            title="Heading 3"
          >
            <Heading3 className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-4 bg-D6D6D6/20 mx-1" />

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`${btnBase} ${
              editor.isActive("bulletList") ? btnActive : ""
            }`}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`${btnBase} ${
              editor.isActive("orderedList") ? btnActive : ""
            }`}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-4 bg-D6D6D6/20 mx-1" />

          <button
            type="button"
            onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
            className={btnBase}
            title="Clear Formatting"
          >
            <RemoveFormatting className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-4 bg-D6D6D6/20 mx-1" />

          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            className={`${btnBase} disabled:opacity-40 disabled:pointer-events-none`}
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            className={`${btnBase} disabled:opacity-40 disabled:pointer-events-none`}
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>

        {/* Editor Body */}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
