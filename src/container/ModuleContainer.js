import React, { useEffect, useRef, useState } from "react";

const ModuleContainer = ({
  id,
  initialPosition,
  onMove,
  children,
  draggable = true,
}) => {
  const blockRef = useRef(null);
  const [position, setPosition] = useState(initialPosition);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    onMove?.(id, position);
  }, [position]);

  const handleMouseDown = (e) => {
    if (!draggable) return;
    const parentRect = blockRef.current.parentElement.getBoundingClientRect();
    setOffset({
      x: e.clientX - parentRect.left - position.x,
      y: e.clientY - parentRect.top - position.y,
    });
    setDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const parentRect = blockRef.current.parentElement.getBoundingClientRect();
    setPosition({
      x: e.clientX - parentRect.left - offset.x,
      y: e.clientY - parentRect.top - offset.y,
    });
  };

  const handleMouseUp = () => setDragging(false);

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  return (
    <div
      ref={blockRef}
      onMouseDown={handleMouseDown}
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        cursor: draggable ? "grab" : "default",
      }}
    >
      {children}
    </div>
  );
};

export default ModuleContainer;
