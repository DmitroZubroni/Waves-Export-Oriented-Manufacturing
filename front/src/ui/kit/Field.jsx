import { useId } from "react";
import { AlertIcon } from "./icons.jsx";

/**
 * Field — подпись всегда над полем и программно связана через htmlFor/id
 * (Д6); ошибка связана через aria-describedby и подана значком и текстом,
 * не только красной рамкой (Ц6). Устраняет самый частый дефект исходной
 * вёрстки форм: <label> без htmlFor и <input> без id.
 */
export function Field({ label, hint, error, optional, mono = false, full = false, children }) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={`field ${full ? "field-full" : ""}`}>
      <label htmlFor={id} className={`field-label ${mono ? "mono-data" : ""}`}>
        {label}
        {optional && <span className="optional"> — необязательно</span>}
      </label>
      {children({
        id,
        invalid: Boolean(error),
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
      })}
      {error && (
        <p id={errorId} className="field-error">
          <AlertIcon size={16} />
          <span>{error}</span>
        </p>
      )}
      {hint && (
        <p id={hintId} className="field-hint">
          {hint}
        </p>
      )}
    </div>
  );
}

export const Input = ({ className = "", ...props }) => (
  <input className={`control ${className}`} {...props} />
);

export const Textarea = ({ className = "", ...props }) => (
  <textarea className={`control ${className}`} {...props} />
);

export default Field;
