"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link2,
  Link2Off,
  ImageIcon,
  Undo2,
  Redo2,
  FileCode2,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { normalizeUrl } from "@/lib/formStyles";
import { EditorInsertModal, type EditorInsertMode } from "@/components/dashboard/EditorInsertModal";

interface TipTapEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

function ToolbarButton({
  onPress,
  active,
  disabled,
  label,
  children,
}: {
  onPress: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(e) => {
        e.preventDefault();
        if (!disabled) onPress();
      }}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md border text-[var(--text-muted)] transition-colors",
        disabled && "cursor-not-allowed opacity-40",
        active
          ? "border-[var(--text)] bg-[var(--bg)] text-[var(--text)]"
          : "border-transparent hover:border-[var(--border)] hover:bg-[var(--bg)] hover:text-[var(--text)]",
      )}
    >
      {children}
    </button>
  );
}

function EditorToolbar({
  editor,
  onOpenModal,
}: {
  editor: NonNullable<ReturnType<typeof useEditor>>;
  onOpenModal: (mode: EditorInsertMode) => void;
}) {
  const toolbar = useEditorState({
    editor,
    selector: ({ editor: ed }) => ({
      isBold: ed.isActive("bold"),
      isItalic: ed.isActive("italic"),
      isUnderline: ed.isActive("underline"),
      isStrike: ed.isActive("strike"),
      isCode: ed.isActive("code"),
      isH2: ed.isActive("heading", { level: 2 }),
      isH3: ed.isActive("heading", { level: 3 }),
      isBulletList: ed.isActive("bulletList"),
      isOrderedList: ed.isActive("orderedList"),
      isBlockquote: ed.isActive("blockquote"),
      isCodeBlock: ed.isActive("codeBlock"),
      isLink: ed.isActive("link"),
      canUndo: ed.can().undo(),
      canRedo: ed.can().redo(),
    }),
  });

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-[var(--border)] bg-[var(--bg)] px-2 py-1.5">
      <ToolbarButton label="Bold" active={toolbar.isBold} onPress={() => editor.chain().focus().toggleBold().run()}>
        <Bold size={14} />
      </ToolbarButton>
      <ToolbarButton label="Italic" active={toolbar.isItalic} onPress={() => editor.chain().focus().toggleItalic().run()}>
        <Italic size={14} />
      </ToolbarButton>
      <ToolbarButton
        label="Underline"
        active={toolbar.isUnderline}
        onPress={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline size={14} />
      </ToolbarButton>
      <ToolbarButton label="Strikethrough" active={toolbar.isStrike} onPress={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough size={14} />
      </ToolbarButton>
      <ToolbarButton label="Inline code" active={toolbar.isCode} onPress={() => editor.chain().focus().toggleCode().run()}>
        <Code size={14} />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-[var(--border)]" aria-hidden="true" />
      <ToolbarButton label="Heading 2" active={toolbar.isH2} onPress={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <Heading2 size={14} />
      </ToolbarButton>
      <ToolbarButton label="Heading 3" active={toolbar.isH3} onPress={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        <Heading3 size={14} />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-[var(--border)]" aria-hidden="true" />
      <ToolbarButton label="Bullet list" active={toolbar.isBulletList} onPress={() => editor.chain().focus().toggleBulletList().run()}>
        <List size={14} />
      </ToolbarButton>
      <ToolbarButton label="Ordered list" active={toolbar.isOrderedList} onPress={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered size={14} />
      </ToolbarButton>
      <ToolbarButton label="Blockquote" active={toolbar.isBlockquote} onPress={() => editor.chain().focus().toggleBlockquote().run()}>
        <Quote size={14} />
      </ToolbarButton>
      <ToolbarButton label="Code block" active={toolbar.isCodeBlock} onPress={() => editor.chain().focus().toggleCodeBlock().run()}>
        <FileCode2 size={14} />
      </ToolbarButton>
      <ToolbarButton label="Horizontal rule" onPress={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus size={14} />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-[var(--border)]" aria-hidden="true" />
      <ToolbarButton label="Link" active={toolbar.isLink} onPress={() => onOpenModal("link")}>
        <Link2 size={14} />
      </ToolbarButton>
      {toolbar.isLink ? (
        <ToolbarButton
          label="Remove link"
          onPress={() => editor.chain().focus().extendMarkRange("link").unsetLink().run()}
        >
          <Link2Off size={14} />
        </ToolbarButton>
      ) : null}
      <ToolbarButton label="Image" onPress={() => onOpenModal("image")}>
        <ImageIcon size={14} />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-[var(--border)]" aria-hidden="true" />
      <ToolbarButton label="Undo" disabled={!toolbar.canUndo} onPress={() => editor.chain().focus().undo().run()}>
        <Undo2 size={14} />
      </ToolbarButton>
      <ToolbarButton label="Redo" disabled={!toolbar.canRedo} onPress={() => editor.chain().focus().redo().run()}>
        <Redo2 size={14} />
      </ToolbarButton>
    </div>
  );
}

export function TipTapEditor({ value, onChange, placeholder = "Write your article..." }: TipTapEditorProps) {
  const [insertModal, setInsertModal] = useState<EditorInsertMode | null>(null);
  const savedSelection = useRef<{ from: number; to: number } | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: {
          openOnClick: false,
          autolink: true,
          defaultProtocol: "https",
          HTMLAttributes: {
            class: "underline underline-offset-2",
          },
        },
      }),
      Placeholder.configure({ placeholder }),
      Image.configure({ HTMLAttributes: { class: "rounded-md max-w-full h-auto my-2" } }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "tiptap-content min-h-[280px] px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none prose-headings:text-[var(--text)]",
      },
    },
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const next = value || "";
    if (next !== current) {
      editor.commands.setContent(next, { emitUpdate: false });
    }
  }, [editor, value]);

  function restoreSavedSelection() {
    if (!editor || !savedSelection.current) return;
    const { from, to } = savedSelection.current;
    editor.chain().focus().setTextSelection({ from, to }).run();
  }

  function openInsertModal(mode: EditorInsertMode) {
    if (!editor) return;
    const { from, to } = editor.state.selection;
    savedSelection.current = { from, to };
    setInsertModal(mode);
  }

  function applyLink({ href, openInNewTab }: { href: string; openInNewTab: boolean }) {
    if (!editor) return;
    restoreSavedSelection();
    const url = normalizeUrl(href);
    if (!url) return;

    const linkAttrs = {
      href: url,
      target: openInNewTab ? "_blank" : null,
      rel: openInNewTab ? "noopener noreferrer" : null,
    };

    const { empty } = editor.state.selection;
    if (empty) {
      const targetAttr = openInNewTab ? ' target="_blank" rel="noopener noreferrer"' : "";
      editor.chain().focus().insertContent(`<a href="${url}"${targetAttr}>${url}</a>`).run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink(linkAttrs).run();
  }

  function applyImage({ src, alt }: { src: string; alt: string }) {
    if (!editor) return;
    restoreSavedSelection();
    const url = normalizeUrl(src);
    if (!url) return;
    editor.chain().focus().setImage({ src: url, alt: alt || "" }).run();
  }

  const linkAttrs = editor?.getAttributes("link");
  const modalInitialUrl =
    insertModal === "link" ? (linkAttrs?.href as string | undefined) ?? "" : "";
  const modalOpenInNewTab = linkAttrs?.href ? linkAttrs.target === "_blank" : false;

  if (!editor) {
    return (
      <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-surface-2)] min-h-[320px] animate-pulse" />
    );
  }

  return (
    <>
      <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-surface-2)] overflow-hidden">
        <EditorToolbar editor={editor} onOpenModal={openInsertModal} />
        <EditorContent editor={editor} />
      </div>

      <EditorInsertModal
        mode={insertModal}
        initialUrl={modalInitialUrl}
        initialOpenInNewTab={modalOpenInNewTab}
        canRemoveLink={insertModal === "link" && editor.isActive("link")}
        onClose={() => setInsertModal(null)}
        onSubmitLink={(data) => {
          applyLink(data);
          setInsertModal(null);
        }}
        onSubmitImage={(data) => {
          applyImage(data);
          setInsertModal(null);
        }}
        onRemoveLink={() => {
          editor.chain().focus().extendMarkRange("link").unsetLink().run();
        }}
      />
    </>
  );
}
