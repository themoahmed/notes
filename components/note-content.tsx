"use client";

import { useState, useCallback } from "react";
import { Textarea } from "./ui/textarea";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Note } from "@/lib/types";
import * as LucideIcons from "lucide-react";

export default function NoteContent({
  note,
  saveNote,
  canEdit,
}: {
  note: Note;
  saveNote: (updates: Partial<Note>) => void;
  canEdit: boolean;
}) {
  const [isEditing, setIsEditing] = useState(!note.content && canEdit);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      saveNote({ content: e.target.value });
    },
    [saveNote]
  );

  const handleMarkdownCheckboxChange = useCallback(
    (taskText: string, isChecked: boolean) => {
      const updatedContent = note.content.replace(
        new RegExp(
          `\\[[ x]\\] ${taskText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
          "g"
        ),
        `[${isChecked ? "x" : " "}] ${taskText}`
      );
      saveNote({ content: updatedContent });
    },
    [note.content, saveNote]
  );

  const renderListItem = useCallback(
    ({ children, ...props }: any) => {
      if (!props.className?.includes("task-list-item"))
        return <li {...props}>{children}</li>;

      const checkbox = children.find((child: any) => child.type === "input");
      if (!checkbox) return <li {...props}>{children}</li>;

      const isChecked = checkbox.props.checked;
      const taskContent = children.filter((child: any) => child !== checkbox);
      const taskText = taskContent
        .map((child: any) => {
          if (typeof child === "string") return child;
          if (child.type === "a")
            return `[${child.props.children}](${child.props.href})`;
          return child.props.children;
        })
        .join("")
        .trim();

      const taskId = `task-${taskText
        .substring(0, 20)
        .replace(/\s+/g, "-")
        .toLowerCase()}-${props.index}`;

      const handleCheckboxClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (canEdit) handleMarkdownCheckboxChange(taskText, !isChecked);
      };

      return (
        <li {...props}>
          <span className="flex items-start">
            <span
              onClick={handleCheckboxClick}
              className={`${
                canEdit ? "cursor-pointer" : "cursor-default"
              } mr-1`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                className="pointer-events-none"
                id={taskId}
                readOnly
              />
            </span>
            <span>{taskContent}</span>
          </span>
        </li>
      );
    },
    [canEdit, handleMarkdownCheckboxChange]
  );

  const renderLink = useCallback(
    (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
      return (
        <a {...props} target="_blank" rel="noopener noreferrer">
          {props.children}
        </a>
      );
    },
    []
  );

  // Function to render text with inline icons and images
  const renderTextWithIcons = useCallback((text: string) => {
    // Pattern to match :content: syntax (for both icons and images)
    const iconPattern = /:([^:\s]+):/g;
    const parts = text.split(iconPattern);

    return parts.map((part, index) => {
      // If index is odd, it's either an icon name or image path
      if (index % 2 === 1) {
        // Check if it looks like an image file (has common image extensions)
        const imageExtensions = /\.(png|jpe?g|gif|svg|webp|bmp|ico)$/i;
        const isImagePath = imageExtensions.test(part);

        if (isImagePath) {
          // Handle as an image
          return (
            <img
              key={index}
              src={part}
              alt=""
              className="inline w-4 h-4 mx-0.5 align-text-bottom object-contain"
              onError={(e) => {
                // If image fails to load, show the original text
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.insertAdjacentText("afterend", `:${part}:`);
              }}
            />
          );
        } else {
          // Handle as a Lucide icon
          // Convert kebab-case to PascalCase for Lucide icon names
          const iconName = part
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join("");

          // Get the icon component from Lucide
          const IconComponent = (LucideIcons as any)[iconName];

          if (IconComponent) {
            return (
              <IconComponent
                key={index}
                className="inline w-4 h-4 mx-0.5 align-text-bottom"
              />
            );
          } else {
            // If icon doesn't exist, show the original text
            return `:${part}:`;
          }
        }
      }
      return part;
    });
  }, []);

  // Process children recursively to handle inline icons
  const processChildren = useCallback(
    (children: React.ReactNode): React.ReactNode => {
      if (typeof children === "string") {
        return renderTextWithIcons(children);
      }

      if (Array.isArray(children)) {
        return children.map((child, index) => {
          if (typeof child === "string") {
            return <span key={index}>{renderTextWithIcons(child)}</span>;
          }
          return child;
        });
      }

      return children;
    },
    [renderTextWithIcons]
  );

  // Custom paragraph component to handle inline icons
  const renderParagraph = useCallback(
    ({ children, ...props }: any) => {
      return <p {...props}>{processChildren(children)}</p>;
    },
    [processChildren]
  );

  // Custom span component to handle inline icons
  const renderSpan = useCallback(
    ({ children, ...props }: any) => {
      return <span {...props}>{processChildren(children)}</span>;
    },
    [processChildren]
  );

  // Custom strong component to handle inline icons
  const renderStrong = useCallback(
    ({ children, ...props }: any) => {
      return <strong {...props}>{processChildren(children)}</strong>;
    },
    [processChildren]
  );

  // Custom em component to handle inline icons
  const renderEm = useCallback(
    ({ children, ...props }: any) => {
      return <em {...props}>{processChildren(children)}</em>;
    },
    [processChildren]
  );

  return (
    <div className="px-2">
      {(isEditing && canEdit) || (!note.content && canEdit) ? (
        <Textarea
          id="note-content"
          value={note.content || ""}
          className="min-h-dvh focus:outline-none leading-normal"
          placeholder="Start writing..."
          onChange={handleChange}
          onFocus={() => setIsEditing(true)}
          onBlur={() => setIsEditing(false)}
        />
      ) : (
        <div
          className="h-full text-sm"
          onClick={(e) => {
            if (canEdit && !note.public) {
              setIsEditing(true);
            }
          }}
        >
          <ReactMarkdown
            className="markdown-body min-h-dvh"
            remarkPlugins={[remarkGfm]}
            components={{
              li: renderListItem,
              a: renderLink,
              p: renderParagraph,
              span: renderSpan,
              strong: renderStrong,
              em: renderEm,
            }}
          >
            {note.content || "Start writing..."}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
