"use client";

import { motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";

const SERVICE_OPTIONS = [
  { value: "", label: "Select a service" },
  { value: "fade-cut", label: "Fade Cut — $42" },
  { value: "hot-towel", label: "Hot Towel Shave — $38" },
  { value: "restorative-facial", label: "Restorative Facial — $68" },
  { value: "signature-fade", label: "Signature Fade — $45" },
  { value: "beard-lineup", label: "Beard Trim & Line-up — $28" },
];

const SUCCESS_MS = 2000;

export function BookNowModal({ open, onClose }) {
  const titleId = useId();
  const [fullName, setFullName] = useState("");
  const [service, setService] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [phase, setPhase] = useState("form");
  const successTimerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setPhase("form");
      if (successTimerRef.current) {
        window.clearTimeout(successTimerRef.current);
        successTimerRef.current = null;
      }
    }
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    function onKey(e) {
      if (e.key !== "Escape") return;
      if (phase === "success") return;
      onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, phase]);

  useEffect(
    () => () => {
      if (successTimerRef.current) {
        window.clearTimeout(successTimerRef.current);
      }
    },
    []
  );

  function clearForm() {
    setFullName("");
    setService("");
    setPreferredTime("");
  }

  function handleBackdropPointerDown(e) {
    if (e.target !== e.currentTarget) return;
    if (phase === "success") return;
    onClose();
  }

  function handleConfirm(e) {
    e.preventDefault();
    if (phase === "success") return;
    setPhase("success");
    if (successTimerRef.current) window.clearTimeout(successTimerRef.current);
    successTimerRef.current = window.setTimeout(() => {
      successTimerRef.current = null;
      clearForm();
      setPhase("form");
      onClose();
    }, SUCCESS_MS);
  }

  if (!open) return null;

  return (
    <motion.div
      className="book-modal-root"
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
          <div
            className="book-modal-backdrop"
            onPointerDown={handleBackdropPointerDown}
            aria-hidden
          />
          <div className="book-modal-center">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="book-modal-card"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.85 }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="book-modal-close"
                aria-label="Close"
                disabled={phase === "success"}
                onClick={() => {
                  if (phase === "success") return;
                  onClose();
                }}
              >
                <span aria-hidden>×</span>
              </button>

              {phase === "form" ? (
                <>
                  <h2 id={titleId} className="book-modal-title">
                    Book now
                  </h2>
                  <p className="book-modal-sub">
                    Reserve your chair — demo only, no data is sent.
                  </p>
                  <form className="book-modal-form" onSubmit={handleConfirm}>
                    <label className="book-modal-field">
                      <span className="book-modal-label">Full name</span>
                      <input
                        type="text"
                        name="fullName"
                        autoComplete="name"
                        className="book-modal-input"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Jordan Lee"
                      />
                    </label>
                    <label className="book-modal-field">
                      <span className="book-modal-label">Service</span>
                      <select
                        name="service"
                        className="book-modal-select"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                      >
                        {SERVICE_OPTIONS.map((opt) => (
                          <option
                            key={opt.value || "placeholder"}
                            value={opt.value}
                            disabled={opt.value === ""}
                          >
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="book-modal-field">
                      <span className="book-modal-label">Preferred time</span>
                      <input
                        type="datetime-local"
                        name="preferredTime"
                        className="book-modal-input book-modal-input-datetime"
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                      />
                    </label>
                    <button type="submit" className="book-modal-submit">
                      Confirm appointment
                    </button>
                  </form>
                </>
              ) : (
                <motion.div
                  className="book-modal-success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <motion.div
                    className="book-modal-success-icon"
                    initial={{ scale: 0.55, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 22,
                    }}
                  >
                    <svg
                      className="book-modal-success-svg"
                      viewBox="0 0 56 56"
                      aria-hidden
                    >
                      <circle
                        cx="28"
                        cy="28"
                        r="25"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="book-modal-success-ring-bg"
                      />
                      <motion.path
                        d="M17 28.5l7.2 7.5L39 20.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{
                          pathLength: {
                            type: "spring",
                            stiffness: 120,
                            damping: 18,
                          },
                          opacity: { duration: 0.2 },
                        }}
                      />
                    </svg>
                  </motion.div>
                  <motion.p
                    className="book-modal-success-text"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Success!
                  </motion.p>
                  <p className="book-modal-success-hint">You&apos;re all set.</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
  );
}
