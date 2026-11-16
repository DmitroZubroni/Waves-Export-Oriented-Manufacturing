import React, { useState } from 'react';
import { typograph } from '../../core/typograph';
import EmptyConveyorArt from './art/EmptyConveyorArt';
import NetworkDisconnectArt from './art/NetworkDisconnectArt';

/**
 * EmptyState — Rule У1: Empty state explains what it is, why it's empty, and provides an action.
 */
export function EmptyState({
  title = 'Данные отсутствуют в реестре',
  description = 'В текущем блоке смарт-контракта Waves нет записей по заданному фильтру или контрагенту.',
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondary,
  icon,
  className = '',
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`mfg-card text-center p-8 p-md-5 border-dashed ${className}`}
      style={{ borderColor: 'rgba(56, 189, 248, 0.25)', background: 'rgba(15, 23, 42, 0.6)' }}
    >
      <div className="d-flex justify-content-center mb-3">
        {icon || <EmptyConveyorArt width={140} height={100} />}
      </div>
      <h3 className="fw-bold text-white mb-2" style={{ fontSize: '1.25rem' }}>
        {typograph(title)}
      </h3>
      <p className="text-secondary mx-auto mb-4" style={{ maxWidth: '44ch', fontSize: '0.9375rem' }}>
        {typograph(description)}
      </p>

      {(actionLabel || secondaryLabel) && (
        <div className="d-flex flex-wrap items-center justify-content-center gap-3">
          {actionLabel && onAction && (
            <button
              type="button"
              onClick={onAction}
              className="mfg-btn-primary"
            >
              <span>{typograph(actionLabel)}</span>
            </button>
          )}
          {secondaryLabel && onSecondary && (
            <button
              type="button"
              onClick={onSecondary}
              className="mfg-btn-secondary"
            >
              <span>{typograph(secondaryLabel)}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * LoadingSkeleton — Rule У1 / У2: Pulsing skeleton matching real card layouts without jumping.
 */
export function LoadingSkeleton({ count = 3, type = 'cards', className = '' }) {
  if (type === 'table') {
    return (
      <div role="status" aria-live="polite" aria-busy="true" className={`mfg-card p-3 ${className}`}>
        <span className="visually-hidden">Загрузка данных из блокчейна...</span>
        <div className="d-flex flex-column gap-3">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="d-flex align-items-center gap-3 py-2 border-bottom border-secondary border-opacity-10">
              <div className="mfg-skeleton-pulse rounded" style={{ width: 120, height: 20 }} />
              <div className="mfg-skeleton-pulse rounded flex-grow-1" style={{ height: 16 }} />
              <div className="mfg-skeleton-pulse rounded" style={{ width: 80, height: 24 }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={`row g-3 ${className}`}
    >
      <span className="visually-hidden">Загрузка данных реестра...</span>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="col-12 col-md-6 col-lg-4">
          <div
            className="mfg-card p-4 h-100 d-flex flex-column justify-content-between"
            style={{ minHeight: 180 }}
          >
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="mfg-skeleton-pulse rounded-pill" style={{ width: 90, height: 22 }} />
                <div className="mfg-skeleton-pulse rounded-circle" style={{ width: 16, height: 16 }} />
              </div>
              <div className="mfg-skeleton-pulse rounded mb-2" style={{ width: '85%', height: 22 }} />
              <div className="mfg-skeleton-pulse rounded mb-2" style={{ width: '60%', height: 16 }} />
            </div>
            <div className="mt-4 pt-3 border-top border-secondary border-opacity-15 d-flex justify-content-between align-items-center">
              <div className="mfg-skeleton-pulse rounded" style={{ width: 70, height: 14 }} />
              <div className="mfg-skeleton-pulse rounded" style={{ width: 90, height: 18 }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * ErrorState — Rule У1 / У4: Explains what happened in human language and has a Retry CTA.
 */
export function ErrorState({
  title = 'Ошибка узла блокчейна Waves',
  description = 'Не удалось подключиться к REST API контракта Waves. Проверьте сетевое соединение или переключитесь на Демо-Реестр.',
  onRetry,
  retryLabel = 'Повторить запрос',
  secondaryAction,
  secondaryLabel = 'Перейти в Демо-Реестр ISO 9001',
  className = '',
}) {
  return (
    <div
      role="alert"
      className={`mfg-card text-center p-8 p-md-5 border-rose-500/40 bg-rose-500/5 ${className}`}
    >
      <div className="d-flex justify-content-center mb-3">
        <NetworkDisconnectArt width={140} height={100} />
      </div>
      <h3 className="fw-bold text-white mb-2" style={{ fontSize: '1.25rem' }}>
        {typograph(title)}
      </h3>
      <p className="text-secondary mx-auto mb-4" style={{ maxWidth: '44ch', fontSize: '0.9375rem' }}>
        {typograph(description)}
      </p>

      <div className="d-flex flex-wrap items-center justify-content-center gap-3">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mfg-btn-primary"
            style={{ background: 'linear-gradient(135deg, #E11D48 0%, #BE123C 100%)', borderColor: '#FB7185' }}
          >
            <span>{typograph(retryLabel)}</span>
          </button>
        )}
        {secondaryAction && (
          <button
            type="button"
            onClick={secondaryAction}
            className="mfg-btn-secondary"
          >
            <span>{typograph(secondaryLabel)}</span>
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * SuccessState — Rule У1: Rich confirmation with copyable TX ID and link.
 */
export function SuccessState({
  title = 'Операция успешно подтверждена',
  txId,
  blockHeight,
  message = 'Транзакция смарт-контракта включена в распределенный реестр Waves.',
  onDismiss,
}) {
  const [copied, setCopied] = useState(false);

  const copyTx = () => {
    if (txId) {
      navigator.clipboard?.writeText(txId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      role="status"
      className="mfg-card p-4 p-md-5 text-center border-emerald-500/40"
      style={{ background: 'rgba(16, 185, 129, 0.05)' }}
    >
      <div
        className="mx-auto mb-3 d-grid place-items-center rounded-circle"
        style={{ width: 56, height: 56, background: 'rgba(16, 185, 129, 0.15)', color: '#34D399', fontSize: 28 }}
      >
        ✓
      </div>
      <h3 className="fw-bold text-white mb-2" style={{ fontSize: '1.25rem' }}>
        {typograph(title)}
      </h3>
      <p className="text-secondary mx-auto mb-3" style={{ maxWidth: '46ch' }}>
        {typograph(message)}
      </p>

      {txId && (
        <div
          className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-3 mono-data mb-4"
          style={{ background: '#090D16', border: '1px solid rgba(56, 189, 248, 0.3)', fontSize: '0.8125rem' }}
        >
          <span className="text-secondary">TX HASH:</span>
          <span className="text-cyan-400 font-bold">{txId.slice(0, 16)}...{txId.slice(-8)}</span>
          <button
            type="button"
            onClick={copyTx}
            className="mfg-btn-ghost p-1"
            style={{ minHeight: 28, minWidth: 28, fontSize: '0.75rem' }}
            title="Скопировать хэш транзакции"
          >
            {copied ? '✓' : 'Копировать'}
          </button>
        </div>
      )}

      {onDismiss && (
        <div>
          <button type="button" onClick={onDismiss} className="mfg-btn-secondary">
            {typograph('Продолжить')}
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * ToastContainer — Non-blocking system messages conforming to WCAG 2.2 AA.
 */
export function ToastContainer({ toasts = [], onRemove }) {
  if (!toasts.length) return null;

  return (
    <div className="mfg-toast-container" role="region" aria-label="Уведомления системы">
      {toasts.map((toast) => {
        const isSuccess = toast.tone === 'success';
        const isDanger = toast.tone === 'danger' || toast.tone === 'error';
        const isWarning = toast.tone === 'warning';

        const borderColor = isSuccess
          ? 'rgba(16, 185, 129, 0.4)'
          : isDanger
          ? 'rgba(244, 63, 94, 0.4)'
          : isWarning
          ? 'rgba(245, 158, 11, 0.4)'
          : 'rgba(56, 189, 248, 0.4)';

        const icon = isSuccess ? '✓' : isDanger ? '✕' : isWarning ? '!' : 'ℹ';
        const iconColor = isSuccess ? '#34D399' : isDanger ? '#FB7185' : isWarning ? '#FBBF24' : '#38BDF8';

        return (
          <div
            key={toast.id}
            className="mfg-toast"
            style={{ borderColor }}
            role={isDanger ? 'alert' : 'status'}
          >
            <div
              className="d-grid place-items-center rounded-circle flex-shrink-0"
              style={{ width: 28, height: 28, background: 'rgba(255, 255, 255, 0.08)', color: iconColor, fontWeight: 'bold' }}
            >
              {icon}
            </div>
            <div className="flex-grow-1">
              <div className="fw-bold text-white mb-0.5" style={{ fontSize: '0.9rem' }}>
                {typograph(toast.title || 'Сообщение системы')}
              </div>
              <div className="text-secondary" style={{ fontSize: '0.8125rem' }}>
                {typograph(toast.message || '')}
              </div>
              {toast.txId && (
                <div className="mt-1 mono-data text-cyan-400" style={{ fontSize: '0.75rem' }}>
                  TX: {toast.txId.slice(0, 14)}...
                </div>
              )}
            </div>
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(toast.id)}
                className="mfg-btn-ghost p-0 text-secondary"
                style={{ minHeight: 28, minWidth: 28 }}
                aria-label="Закрыть уведомление"
              >
                ✕
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
