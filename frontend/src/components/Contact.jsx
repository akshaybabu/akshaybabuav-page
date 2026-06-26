import React, { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Download, Send } from "lucide-react";
import { toast } from "sonner";
import { PROFILE } from "../data/resume";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const { name, email, message } = form;
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("All fields are required.");
      return;
    }
    setSending(true);
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `${message}\n\n—\nFrom: ${name}\nReply-to: ${email}`
    );
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    toast.success("Opening your email client…");
    setTimeout(() => setSending(false), 800);
  };

  return (
    <section id="contact" data-testid="contact-section" className="relative py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <span className="kicker">/CONNECT</span>
            <h2 className="h-section text-white mt-4">
              Open to <span className="text-emerald-400">senior SDET</span><br />
              and automation roles.
            </h2>
            <p className="mt-6 text-sm text-white/60 leading-relaxed max-w-md">
              I&apos;m looking to drive scalable test architecture and release
              confidence inside a product engineering team. Drop a line — I read
              every message.
            </p>

            <div className="mt-10 space-y-3 font-mono text-sm">
              <ContactRow
                icon={<Mail size={14} className="text-emerald-400" />}
                k="email"
                v={PROFILE.email}
                href={`mailto:${PROFILE.email}`}
                testid="contact-email"
              />
              <ContactRow
                icon={<Phone size={14} className="text-emerald-400" />}
                k="phone"
                v={PROFILE.phone}
                href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}
                testid="contact-phone"
              />
              <ContactRow
                icon={<MapPin size={14} className="text-emerald-400" />}
                k="loc"
                v={PROFILE.location}
                testid="contact-location"
              />
              <ContactRow
                icon={<Linkedin size={14} className="text-emerald-400" />}
                k="linkedin"
                v="linkedin.com/in/anthoorveettilakshaybabu"
                href={PROFILE.linkedin}
                testid="contact-linkedin"
              />
              <ContactRow
                icon={<Github size={14} className="text-emerald-400" />}
                k="github"
                v="github.com/akshaybabu"
                href={PROFILE.github}
                testid="contact-github"
              />
            </div>

            <a
              data-testid="contact-resume-download"
              href={`${process.env.PUBLIC_URL || ""}/Akshay_Babu_Resume_Senior_SDET.docx`}
              download
              className="btn-sharp mt-8 inline-flex"
            >
              <Download size={14} /> Download Resume (.docx)
            </a>
          </div>

          <div className="lg:col-span-7">
            <form
              data-testid="contact-form"
              onSubmit={submit}
              className="term scanlines p-6 md:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="font-mono text-xs text-white/50">~/akshay/inbox/new_message</div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" /> Encrypted
                </span>
              </div>

              <Field
                label="from_name"
                testid="contact-name-input"
                value={form.name}
                onChange={onChange("name")}
                placeholder="Your name"
              />
              <Field
                label="from_email"
                testid="contact-email-input"
                value={form.email}
                onChange={onChange("email")}
                placeholder="you@company.com"
                type="email"
              />
              <Field
                label="body"
                testid="contact-message-input"
                value={form.message}
                onChange={onChange("message")}
                placeholder="What are you building? What role are you hiring for?"
                textarea
              />

              <button
                data-testid="contact-submit"
                type="submit"
                disabled={sending}
                className="btn-sharp mt-2 disabled:opacity-50"
              >
                {sending ? "Transmitting..." : "Send message"} <Send size={12} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon, k, v, href, testid }) {
  const content = (
    <>
      {icon}
      <span className="text-white/40">{k}</span>
      <span className="text-white/25">::</span>
      <span className="text-white/80 link-uline">{v}</span>
    </>
  );
  if (href && href !== "#") {
    return (
      <a data-testid={testid} href={href} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 hover:text-emerald-400 transition-colors">
        {content}
      </a>
    );
  }
  return <div data-testid={testid} className="flex items-center gap-2.5">{content}</div>;
}

function Field({ label, value, onChange, placeholder, type = "text", textarea, testid }) {
  return (
    <label className="block mb-5">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">{label}</div>
      {textarea ? (
        <textarea
          data-testid={testid}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={5}
          className="w-full bg-black/40 border border-white/10 focus:border-emerald-500/60 outline-none px-4 py-3 font-mono text-sm text-white placeholder:text-white/30 resize-none transition-colors"
        />
      ) : (
        <input
          data-testid={testid}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-black/40 border border-white/10 focus:border-emerald-500/60 outline-none px-4 py-3 font-mono text-sm text-white placeholder:text-white/30 transition-colors"
        />
      )}
    </label>
  );
}
