'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { useEffect } from 'react';

interface TiptapEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  height?: string;
}

export default function TiptapEditor({
  value,
  onChange,
  placeholder,
  height = '300px',
}: TiptapEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Start typing...',
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="border rounded-lg">
      {/* Toolbar */}
      <div className="flex gap-2 p-2 border-b bg-gray-100">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="px-2 py-1 border rounded"
        >
          B
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="px-2 py-1 border rounded italic"
        >
          I
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className="px-2 py-1 border rounded"
        >
          Levo
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className="px-2 py-1 border rounded"
        >
          Centar
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className="px-2 py-1 border rounded"
        >
          Desno
        </button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        style={{ minHeight: height }}
        className="p-2"
      />
    </div>
  );
}
