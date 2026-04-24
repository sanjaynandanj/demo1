"use client";

import React, { useState } from "react";
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlinePencil,
  HiOutlineBars3,
} from "react-icons/hi2";
import { usePage, type LinkItem } from "../../_state/PageContext";
import { detectPlatform } from "../../_lib/platforms";
import Toggle from "../../_components/Toggle";

function LinkForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Partial<LinkItem>;
  onSave: (v: { title: string; url: string; emoji?: string }) => void;
  onCancel: () => void;
}) {
  const [url, setUrl] = useState(initial?.url ?? "");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [emoji, setEmoji] = useState(initial?.emoji ?? "");

  const platform = detectPlatform(url);
  const PlatformIcon = platform.icon;

  const canSave = url.trim() !== "" && title.trim() !== "";

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E8E4DF",
        borderRadius: 12,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "stretch" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <input
            type="url"
            placeholder="Paste your link here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="input-field"
          />
          {url.trim() ? (
            <div style={{ fontSize: "0.8125rem", color: "#7A7A7A", paddingLeft: 4 }}>
              Detected as {platform.name}
            </div>
          ) : null}
        </div>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: "rgba(232, 115, 90, 0.12)",
            color: "#E8735A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <PlatformIcon size={20} />
        </div>
      </div>

      <input
        type="text"
        placeholder="What should this link say?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-field"
      />

      <input
        type="text"
        placeholder="Optional: pick an emoji instead of the auto icon"
        value={emoji}
        onChange={(e) => setEmoji(e.target.value.slice(0, 4))}
        maxLength={4}
        className="input-field"
      />

      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button
          type="button"
          className="btn-primary"
          disabled={!canSave}
          onClick={() => onSave({ title: title.trim(), url: url.trim(), emoji: emoji.trim() || undefined })}
        >
          Save Link
        </button>
      </div>
    </div>
  );
}

function SortableLinkRow({
  link,
  onEdit,
  onDelete,
  onToggle,
  editing,
  onEditSave,
  onEditCancel,
  confirmDelete,
  setConfirmDelete,
}: {
  link: LinkItem;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
  editing: boolean;
  onEditSave: (v: { title: string; url: string; emoji?: string }) => void;
  onEditCancel: () => void;
  confirmDelete: boolean;
  setConfirmDelete: (v: boolean) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: link.id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 10 : "auto",
  };

  if (editing) {
    return (
      <div ref={setNodeRef} style={style}>
        <LinkForm
          initial={link}
          onSave={onEditSave}
          onCancel={onEditCancel}
        />
      </div>
    );
  }

  const platform = detectPlatform(link.url);
  const Icon = platform.icon;

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        background: "#fff",
        border: "1px solid #E8E4DF",
        borderRadius: 12,
        padding: "12px 14px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
        style={{
          color: "#7A7A7A",
          cursor: "grab",
          touchAction: "none",
          padding: 4,
          display: "flex",
          alignItems: "center",
        }}
      >
        <HiOutlineBars3 size={18} />
      </button>

      <div
        style={{
          width: 28,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#4A4A4A",
          flexShrink: 0,
        }}
      >
        {link.emoji ? <span style={{ fontSize: "1.125rem" }}>{link.emoji}</span> : <Icon size={20} />}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontWeight: 600,
            fontSize: "0.9375rem",
            color: "#1A1A1A",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {link.title || "Untitled"}
        </div>
        <div
          style={{
            fontSize: "0.8125rem",
            color: "#7A7A7A",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {link.url}
        </div>
      </div>

      {confirmDelete ? (
        <div style={{ display: "flex", gap: 6 }}>
          <button
            type="button"
            className="btn-destructive"
            style={{ padding: "6px 12px", fontSize: "0.8125rem" }}
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            type="button"
            className="btn-secondary"
            style={{ padding: "6px 12px", fontSize: "0.8125rem" }}
            onClick={() => setConfirmDelete(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Toggle checked={link.visible} onChange={onToggle} ariaLabel="Visibility" />
          <button
            type="button"
            onClick={onEdit}
            aria-label="Edit"
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "transparent",
              color: "#4A4A4A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 150ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F4F1EC")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <HiOutlinePencil size={16} />
          </button>
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            aria-label="Delete"
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "transparent",
              color: "#D94F4F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 150ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(217,79,79,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <HiOutlineTrash size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default function LinksTab() {
  const { data, addLink, updateLink, deleteLink, toggleLink, reorderLinks } = usePage();
  const [addingNew, setAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const ids = data.links.map((l) => l.id);
    const oldIdx = ids.indexOf(active.id as string);
    const newIdx = ids.indexOf(over.id as string);
    if (oldIdx === -1 || newIdx === -1) return;
    reorderLinks(arrayMove(ids, oldIdx, newIdx));
  };

  return (
    <div>
      <h1 className="font-display" style={{ fontSize: "1.75rem", color: "#1A1A1A", marginBottom: 6 }}>
        Your links
      </h1>
      <p style={{ color: "#4A4A4A", fontSize: "0.9375rem", marginBottom: 20 }}>
        Add, reorder, or hide links. Changes reflect instantly in the preview.
      </p>

      {addingNew ? (
        <div style={{ marginBottom: 16 }}>
          <LinkForm
            onSave={(v) => {
              addLink({ ...v, visible: true });
              setAddingNew(false);
            }}
            onCancel={() => setAddingNew(false)}
          />
        </div>
      ) : (
        <button
          type="button"
          className="btn-primary"
          onClick={() => setAddingNew(true)}
          style={{ marginBottom: 16, width: "100%", padding: "14px 18px" }}
        >
          <HiOutlinePlus size={16} />
          Add Link
        </button>
      )}

      {data.links.length === 0 ? (
        <div
          style={{
            border: "1.5px dashed #D6D2CC",
            borderRadius: 12,
            padding: 32,
            textAlign: "center",
            color: "#7A7A7A",
            fontSize: "0.9375rem",
          }}
        >
          No links yet. Add your first one above.
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={data.links.map((l) => l.id)} strategy={verticalListSortingStrategy}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {data.links.map((link) => (
                <SortableLinkRow
                  key={link.id}
                  link={link}
                  onEdit={() => setEditingId(link.id)}
                  onDelete={() => {
                    deleteLink(link.id);
                    setDeletingId(null);
                  }}
                  onToggle={() => toggleLink(link.id)}
                  editing={editingId === link.id}
                  onEditSave={(v) => {
                    updateLink(link.id, v);
                    setEditingId(null);
                  }}
                  onEditCancel={() => setEditingId(null)}
                  confirmDelete={deletingId === link.id}
                  setConfirmDelete={(v) => setDeletingId(v ? link.id : null)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
