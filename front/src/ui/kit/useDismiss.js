import { useEffect } from "react";

/**
 * useDismiss — закрывает всплывающую панель (меню, список Select) по клику
 * снаружи или по Esc. Используется в Header-меню и в кастомном Select,
 * чтобы оба вели себя как положено доступному попапу (Д2/Д3, Н6).
 */
export function useDismiss(open, onClose, ref) {
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, ref]);
}
