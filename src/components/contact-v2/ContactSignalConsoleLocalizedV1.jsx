import { useEffect, useRef, useState } from "react";
import { usePortfolioLocaleV1 } from "../../i18n/PortfolioLocaleProviderV1";
import emailjs from "@emailjs/browser";

import { linkedin, whatsapplogo } from "../../assets";
import "./ContactSignalConsoleV2.css";

const INITIAL_FORM = {
  name: "",
  email: "",
  message: "",
};

const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_APP_KEY_SERVICE,
  templateId: import.meta.env.VITE_APP_KEY_TEMPLATE,
  publicKey: import.meta.env.VITE_APP_KEY_PUBLIC,
};

const ContactSignalConsoleLocalizedV1 = () => {
  const { locale, isArabic, t } = usePortfolioLocaleV1();
  const formRef = useRef(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSending, setIsSending] = useState(false);
  const [submission, setSubmission] = useState({
    type: "idle",
    messageKey: "",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    target.setCustomValidity?.("");

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    if (submission.type !== "idle") {
      setSubmission({ type: "idle", messageKey: "" });
    }
  };

  useEffect(() => {
    formRef.current?.querySelectorAll("input, textarea").forEach((field) => field.setCustomValidity(""));
  }, [locale]);

  const handleInvalid = (event) => {
    const field = event.target;
    field.setCustomValidity(t(field.validity.typeMismatch ? "contact.invalidEmail" : "contact.required"));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSending) {
      return;
    }

    const isEmailJsConfigured = Object.values(EMAILJS_CONFIG).every(Boolean);

    if (!isEmailJsConfigured) {
      console.error(
        "Contact form is missing one or more EmailJS environment variables.",
      );
      setSubmission({
        type: "error",
        messageKey: "contact.unavailable",
      });
      return;
    }

    setIsSending(true);
    setSubmission({
      type: "pending",
      messageKey: "contact.pending",
    });

    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: form.name.trim(),
          from_email: form.email.trim(),
          reply_to: form.email.trim(),
          to_name: "Ammar Al-sayari",
          to_email: "amar9dev@gmail.com",
          message: form.message.trim(),
        },
        EMAILJS_CONFIG.publicKey,
      );

      setForm(INITIAL_FORM);
      setSubmission({
        type: "success",
        messageKey: "contact.success",
      });
    } catch (error) {
      console.error("EmailJS contact submission failed.", error);
      setSubmission({
        type: "error",
        messageKey: "contact.failed",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="contact-signal-v2 sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0"
    >
      <header className="contact-signal-v2__heading">
        <div>
          {/* First Signal Console eyebrow preserved but disabled: Open channel */}
          <h2>{t("contact.title")}</h2>
          {/*
            First Signal Console introduction preserved but disabled:
            Have a project, opportunity, or idea in mind? Send a direct message
            and I will get back to you as soon as I can.
          */}
        </div>

        {/* First Signal Console status bars preserved but disabled. */}
      </header>

      <div className="contact-signal-v2__divider" aria-hidden="true" />

      <div className="contact-signal-v2__layout">
        <aside className="contact-signal-v2__details">
          {/* First Signal Console receiving label preserved but disabled. */}

          <a
            className="contact-signal-v2__email"
            href="mailto:amar9dev@gmail.com"
            dir="ltr"
          >
            amar9dev@gmail.com
          </a>

          <p className="contact-signal-v2__availability">
            {t("contact.availability")}
          </p>

          <div className="contact-signal-v2__channels">
            <a
              href="https://www.linkedin.com/in/amar9dev/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={linkedin} alt="" />
              <bdi dir="ltr">LinkedIn</bdi>
              <span aria-hidden="true">{isArabic ? "↖" : "↗"}</span>
            </a>

            <a
              href="https://wa.me/966504704030"
              target="_blank"
              rel="noreferrer"
            >
              <img src={whatsapplogo} alt="" />
              {t("nav.whatsapp")}
              <span aria-hidden="true">{isArabic ? "↖" : "↗"}</span>
            </a>
          </div>

          {/*
            First Signal Console orbital motif preserved but disabled:
            <div className="contact-signal-v2__orbit" aria-hidden="true">
              <span />
              <span />
              <i />
            </div>
          */}

          <div className="contact-signal-v2__community" aria-hidden="true">
            <span className="contact-signal-v2__connection is-1" />
            <span className="contact-signal-v2__connection is-2" />
            <span className="contact-signal-v2__connection is-3" />
            <span className="contact-signal-v2__connection is-4" />
            <span className="contact-signal-v2__connection is-5" />
            <span className="contact-signal-v2__connection is-6" />
            <span className="contact-signal-v2__connection is-7" />
            <span className="contact-signal-v2__connection is-8" />
            <span className="contact-signal-v2__connection is-9" />

            {Array.from({ length: 7 }, (_, index) => (
              <span
                className={`contact-signal-v2__person is-${index + 1}`}
                key={`community-person-${index + 1}`}
              >
                <i />
                <b />
              </span>
            ))}
          </div>
        </aside>

        <form
          ref={formRef}
          onInvalid={handleInvalid}
          className="contact-signal-v2__form"
          onSubmit={handleSubmit}
          aria-busy={isSending}
        >
          {/* First Signal Console form heading and ready state preserved but disabled. */}

          <label>
            <span>{t("contact.name")}</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              placeholder={t("contact.namePlaceholder")}
              dir="auto"
              maxLength={100}
              disabled={isSending}
              required
            />
          </label>

          <label>
            <span>{t("contact.email")}</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              inputMode="email"
              dir="ltr"
              placeholder="you@example.com"
              maxLength={160}
              disabled={isSending}
              required
            />
          </label>

          <label>
            <span>{t("contact.message")}</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder={t("contact.messagePlaceholder")}
              dir="auto"
              rows={6}
              maxLength={3000}
              disabled={isSending}
              required
            />
          </label>

          <div className="contact-signal-v2__form-footer">
            <button type="submit" disabled={isSending}>
              {isSending ? t("contact.sendingButton") : t("contact.send")}
              <span aria-hidden="true">{isArabic ? "↖" : "↗"}</span>
            </button>

            <p
              className={`contact-signal-v2__status is-${submission.type}`}
              role={submission.type === "error" ? "alert" : "status"}
              aria-live="polite"
            >
              {submission.messageKey ? t(submission.messageKey) : ""}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSignalConsoleLocalizedV1;
