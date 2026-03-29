import React, { useState } from "react";
import ParticlesBackground from "../components/ParticlesBackground";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("This field is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("This field is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .required("This field is required"),
});

export default function Contact() {
  const [status, setStatus] = useState("");

  const formik = useFormik({
    initialValues: { name: "", email: "", message: "" },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setStatus("sending");
      try {
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            from_name: values.name,
            reply_to: values.email,
            email: values.email,
            message: values.message,
            name: values.name,
          },
          PUBLIC_KEY,
        );
        setStatus("success");
        resetForm();
      } catch (error) {
        console.error("EmailJS error:", error);
        setStatus("error");
      }
    },
  });

  const fieldError = (field) =>
    formik.touched[field] && formik.errors[field] ? formik.errors[field] : null;

  return (
    <section
      id="contact"
      className="w-full min-h-screen relative bg-[#020617] overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col md:flex-row md:justify-center items-center gap-10"
    >
      <ParticlesBackground />

      <div className="relative z-10 w-full flex flex-col md:flex-row md:justify-center items-center gap-10">
        <motion.div
          className="w-full md:w-1/2 bg-white/5 p-8 rounded-2xl shadow-lg border border-teal-300/15 backdrop-blur"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-300 to-blue-400">
            Let&apos;s Work Together
          </h2>

          <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col">
              <label className="mb-1 text-slate-200">
                Your Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`p-3 rounded-md bg-white/10 border ${
                  fieldError("name") ? "border-red-500" : "border-slate-600"
                } text-white placeholder:text-slate-400 focus:outline-none focus:border-teal-400 transition-colors`}
              />
              {fieldError("name") && (
                <p className="text-red-500 text-xs mt-1">{fieldError("name")}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-slate-200">
                Your Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`p-3 rounded-md bg-white/10 border ${
                  fieldError("email") ? "border-red-500" : "border-slate-600"
                } text-white placeholder:text-slate-400 focus:outline-none focus:border-teal-400 transition-colors`}
              />
              {fieldError("email") && (
                <p className="text-red-500 text-xs mt-1">{fieldError("email")}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-slate-200">
                Your Message<span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={4}
                className={`bg-white/10 border ${
                  fieldError("message") ? "border-red-500" : "border-slate-600"
                } rounded-lg p-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400/40 transition-colors resize-none`}
              />
              {fieldError("message") && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldError("message")}
                </p>
              )}
            </div>

            {status && (
              <p
                className={`text-sm ${
                  status === "success"
                    ? "text-emerald-400"
                    : status === "error"
                      ? "text-red-400"
                      : "text-amber-400"
                }`}
              >
                {status === "sending"
                  ? "Sending message..."
                  : status === "success"
                    ? "Message sent successfully!"
                    : "Something went wrong. Please try again."}
              </p>
            )}

            <motion.button
              type="submit"
              disabled={status === "sending" || formik.isSubmitting}
              className="py-3 rounded-full font-semibold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 shadow-lg disabled:opacity-60 transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}