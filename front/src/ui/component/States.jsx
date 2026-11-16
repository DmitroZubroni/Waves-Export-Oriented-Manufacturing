import { useState } from "react";
import { typograph } from "../../core/typograph";
import EmptyConveyorArt from "./art/EmptyConveyorArt";
import NetworkDisconnectArt from "./art/NetworkDisconnectArt";
import { CheckIcon, CloseIcon, AlertIcon, InfoIcon, CopyIcon } from "../kit/icons.jsx";

/**
 * States.jsx — 4 состояния экрана по Правилу У1: пустое, загрузка, ошибка, успех.
 * Пустое и ошибка объясняют, что случилось, и дают следующее действие (Я4/Я5).
 */
export function EmptyState({
  title = "Данные отсутствуют в реестре",
  description = "В текущем блоке смарт-контракта Waves нет записей по заданному фильтру или контрагенту.",
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondary,
  icon,
  className = "",
}) {
  return (
    <div role="status" className={`state-panel ${className}`}>
      {icon || <EmptyConveyorArt width={140} height={100} />}
      <h3 className="text-xl fw-700 mt-4 mb-2">{typograph(title)}</h3>
      <p className="text-muted max-prose" style={{ maxWidth: "44ch" }}>
        {typograph(description)}
      </p>

      {(actionLabel || secondaryLabel) && (
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          {actionLabel && onAction && (
            <button type="button" onClick={onAction} className="btn btn-primary">
              {typograph(actionLabel)}
            </button>
          )}
          {secondaryLabel && onSecondary && (
            <button type="button" onClick={onSecondary} className="btn btn-secondary">
              {typograph(secondaryLabel)}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * LoadingSkeleton — скелетон повторяет форму будущего контента, без прыжков макета (У1/У2).
 */
export function LoadingSkeleton({ count = 3, type = "cards", className = "" }) {
  if (type === "table") {
    return (
      <div role="status" aria-live="polite" aria-busy="true" className={`card ${className}`}>
        <span className="sr-only">Загрузка данных из блокчейна…</span>
        <div className="flex flex-col gap-4">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="flex items-center gap-3" style={{ paddingBlock: 8 }}>
              <span className="skeleton" style={{ width: 120, height: 20 }} />
              <span className="skeleton flex-1" style={{ height: 16 }} />
              <span className="skeleton" style={{ width: 80, height: 24 }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div role="status" aria-live="polite" aria-busy="true" className={`grid-cards ${className}`}>
      <span className="sr-only">Загрузка данных реестра…</span>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="card flex flex-col justify-between" style={{ minHeight: 180 }}>
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="skeleton" style={{ width: 90, height: 22, borderRadius: 9999 }} />
              <span className="skeleton" style={{ width: 16, height: 16, borderRadius: 9999 }} />
            </div>
            <span className="skeleton mb-2" style={{ width: "85%", height: 22 }} />
            <span className="skeleton" style={{ width: "60%", height: 16 }} />
          </div>
          <div className="flex justify-between items-center mt-4 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
            <span className="skeleton" style={{ width: 70, height: 14 }} />
            <span className="skeleton" style={{ width: 90, height: 18 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * ErrorState — объясняет, что случилось, и даёт кнопку «Повторить» (У1/У4).
 */
export function ErrorState({
  title = "Ошибка узла блокчейна Waves",
  description = "Не удалось подключиться к REST API контракта Waves. Проверьте сетевое соединение или переключитесь на демо-реестр.",
  onRetry,
  retryLabel = "Повторить запрос",
  secondaryAction,
  secondaryLabel = "Перейти в демо-реестр ISO 9001",
  className = "",
}) {
  return (
    <div role="alert" className={`state-panel is-error ${className}`}>
      <NetworkDisconnectArt width={140} height={100} />
      <h3 className="text-xl fw-700 mt-4 mb-2">{typograph(title)}</h3>
      <p className="text-muted" style={{ maxWidth: "44ch" }}>
        {typograph(description)}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
        {onRetry && (
          <button type="button" onClick={onRetry} className="btn btn-primary">
            {typograph(retryLabel)}
          </button>
        )}
        {secondaryAction && (
          <button type="button" onClick={secondaryAction} className="btn btn-secondary">
            {typograph(secondaryLabel)}
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * SuccessState — развёрнутое подтверждение с копируемым TX ID (У1).
 */
export function SuccessState({
  title = "Операция успешно подтверждена",
  txId,
  message = "Транзакция смарт-контракта включена в распределённый реестр Waves.",
  onDismiss,
}) {
  const [copied, setCopied] = useState(false);

  const copyTx = () => {
    if (!txId) return;
    navigator.clipboard?.writeText(txId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div role="status" className="state-panel is-success">
      <span
        className="flex items-center justify-center"
        style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--success-soft)", color: "var(--success)" }}
        aria-hidden="true"
      >
        <CheckIcon size={28} />
      </span>
      <h3 className="text-xl fw-700 mt-4 mb-2">{typograph(title)}</h3>
      <p className="text-muted mb-3" style={{ maxWidth: "46ch" }}>
        {typograph(message)}
      </p>

      {txId && (
        <div className="inline-flex items-center gap-2 mono-data text-sm panel mb-4" style={{ padding: "0.5rem 0.75rem" }}>
          <span className="text-muted">TX HASH:</span>
          <span className="fw-700">
            {txId.slice(0, 16)}…{txId.slice(-8)}
          </span>
          <button type="button" onClick={copyTx} className="btn btn-ghost icon-btn" aria-label="Скопировать хэш транзакции" title="Скопировать хэш транзакции">
            {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
          </button>
        </div>
      )}

      {onDismiss && (
        <button type="button" onClick={onDismiss} className="btn btn-secondary">
          {typograph("Продолжить")}
        </button>
      )}
    </div>
  );
}

const TOAST_TONES = {
  success: { icon: CheckIcon, bg: "var(--success-soft)", fg: "var(--success)", role: "status" },
  danger: { icon: CloseIcon, bg: "var(--danger-soft)", fg: "var(--danger)", role: "alert" },
  error: { icon: CloseIcon, bg: "var(--danger-soft)", fg: "var(--danger)", role: "alert" },
  warning: { icon: AlertIcon, bg: "var(--warning-soft)", fg: "var(--warning)", role: "status" },
  info: { icon: InfoIcon, bg: "var(--primary-soft)", fg: "var(--primary)", role: "status" },
};

/**
 * ToastContainer — неблокирующие системные сообщения, доступны по WCAG 2.2 AA.
 */
export function ToastContainer({ toasts = [], onRemove }) {
  if (!toasts.length) return null;

  return (
    <div className="toast-stack" role="region" aria-label="Уведомления системы">
      {toasts.map((toast) => {
        const tone = TOAST_TONES[toast.tone] || TOAST_TONES.info;
        const ToneIcon = tone.icon;

        return (
          <div key={toast.id} className="toast" role={tone.role}>
            <span className="toast-icon" style={{ background: tone.bg, color: tone.fg }} aria-hidden="true">
              <ToneIcon size={14} />
            </span>
            <div className="flex-1">
              <div className="fw-700 text-sm">{typograph(toast.title || "Сообщение системы")}</div>
              {toast.message && <div className="text-sm" style={{ color: "var(--inverse-muted)" }}>{typograph(toast.message)}</div>}
              {toast.txId && <div className="mt-1 mono-data text-xs" style={{ color: "#7dd3fc" }}>TX: {toast.txId.slice(0, 14)}…</div>}
            </div>
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(toast.id)}
                className="btn btn-ghost icon-btn"
                style={{ color: "var(--inverse-muted)" }}
                aria-label="Закрыть уведомление"
              >
                <CloseIcon size={14} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
