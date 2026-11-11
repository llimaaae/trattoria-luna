"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  notes: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ReservationPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    occasion: "",
    notes: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  const timeSlots = [
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"
  ];

  const occasions = [
    "Jantar casual",
    "Aniversário",
    "Aniversário de relacionamento",
    "Pedido de casamento",
    "Comemoração",
    "Reunião de negócios",
    "Outro",
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório";
    } else if (!/^\(\d{2}\)\s?\d{4,5}-?\d{4}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Telefone inválido";
    }
    if (!formData.date) newErrors.date = "Data é obrigatória";
    if (!formData.time) newErrors.time = "Horário é obrigatório";

    // Validate date is not in the past
    if (formData.date) {
      const selectedDate = new Date(formData.date + "T00:00:00");
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "Data não pode ser no passado";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Analytics event
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "reservation_submitted", {
          guests: formData.guests,
          occasion: formData.occasion,
        });
      }
      
      setSubmitted(true);
      // In production, this would send to API
      console.log("Reservation data:", formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  if (submitted) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-cream flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl w-full bg-white rounded-lg shadow-2xl p-8 sm:p-12 text-center"
          >
            <div className="w-20 h-20 bg-olive/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-charcoal mb-4">
              Reserva Confirmada!
            </h1>
            <p className="text-lg text-charcoal/70 mb-8">
              Obrigado, <strong>{formData.name}</strong>! Sua reserva para <strong>{formData.guests} {formData.guests === "1" ? "pessoa" : "pessoas"}</strong> no dia{" "}
              <strong>{new Date(formData.date + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}</strong> às{" "}
              <strong>{formData.time}</strong> foi recebida.
            </p>
            <div className="bg-cream rounded-lg p-6 mb-8 text-left">
              <h2 className="font-semibold text-charcoal mb-3">Detalhes da Reserva</h2>
              <dl className="space-y-2 text-sm text-charcoal/70">
                <div className="flex justify-between">
                  <dt>Nome:</dt>
                  <dd className="font-medium text-charcoal">{formData.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>E-mail:</dt>
                  <dd className="font-medium text-charcoal">{formData.email}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Telefone:</dt>
                  <dd className="font-medium text-charcoal">{formData.phone}</dd>
                </div>
                {formData.occasion && (
                  <div className="flex justify-between">
                    <dt>Ocasião:</dt>
                    <dd className="font-medium text-charcoal">{formData.occasion}</dd>
                  </div>
                )}
                {formData.notes && (
                  <div className="pt-2 border-t border-charcoal/10">
                    <dt className="mb-1">Observações:</dt>
                    <dd className="font-medium text-charcoal">{formData.notes}</dd>
                  </div>
                )}
              </dl>
            </div>
            <p className="text-sm text-charcoal/60 mb-6">
              Enviamos um e-mail de confirmação para <strong>{formData.email}</strong> com todos os detalhes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-md bg-terracotta px-6 py-3 text-base font-semibold text-white hover:bg-terracotta/90 transition-smooth"
              >
                Voltar ao Início
              </a>
              <a
                href="/cardapio"
                className="inline-flex items-center justify-center rounded-md border-2 border-charcoal bg-transparent px-6 py-3 text-base font-semibold text-charcoal hover:bg-charcoal hover:text-white transition-smooth"
              >
                Ver Cardápio
              </a>
            </div>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-charcoal mb-4">
              Reserve sua Mesa
            </h1>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              Prepare-se para uma experiência gastronômica autêntica. Mal podemos esperar para recebê-lo!
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-xl p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Name */}
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-semibold text-charcoal mb-2">
                  Nome completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-md border ${
                    errors.name ? "border-red-500" : "border-charcoal/20"
                  } focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-smooth`}
                  placeholder="Seu nome"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-charcoal mb-2">
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-md border ${
                    errors.email ? "border-red-500" : "border-charcoal/20"
                  } focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-smooth`}
                  placeholder="seu@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-charcoal mb-2">
                  Telefone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-md border ${
                    errors.phone ? "border-red-500" : "border-charcoal/20"
                  } focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-smooth`}
                  placeholder="(00) 00000-0000"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Date */}
              <div>
                <label htmlFor="date" className="block text-sm font-semibold text-charcoal mb-2">
                  Data *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={minDate}
                  className={`w-full px-4 py-3 rounded-md border ${
                    errors.date ? "border-red-500" : "border-charcoal/20"
                  } focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-smooth`}
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
              </div>

              {/* Time */}
              <div>
                <label htmlFor="time" className="block text-sm font-semibold text-charcoal mb-2">
                  Horário *
                </label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-md border ${
                    errors.time ? "border-red-500" : "border-charcoal/20"
                  } focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-smooth`}
                >
                  <option value="">Selecione o horário</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
              </div>

              {/* Guests */}
              <div>
                <label htmlFor="guests" className="block text-sm font-semibold text-charcoal mb-2">
                  Número de pessoas *
                </label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-charcoal/20 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-smooth"
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? "pessoa" : "pessoas"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Occasion */}
              <div>
                <label htmlFor="occasion" className="block text-sm font-semibold text-charcoal mb-2">
                  Ocasião
                </label>
                <select
                  id="occasion"
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-charcoal/20 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-smooth"
                >
                  <option value="">Selecione (opcional)</option>
                  {occasions.map((occasion) => (
                    <option key={occasion} value={occasion}>
                      {occasion}
                    </option>
                  ))}
                </select>
              </div>

              {/* Notes */}
              <div className="sm:col-span-2">
                <label htmlFor="notes" className="block text-sm font-semibold text-charcoal mb-2">
                  Observações
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-md border border-charcoal/20 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-smooth resize-none"
                  placeholder="Alergias, restrições alimentares ou pedidos especiais..."
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-charcoal/10">
              <p className="text-sm text-charcoal/60 mb-6">
                * Campos obrigatórios. Reservas para grupos acima de 12 pessoas, entre em contato pelo telefone (00) 00000-0000.
              </p>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 rounded-md bg-terracotta text-white text-base font-semibold shadow-lg hover:bg-terracotta/90 transition-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
              >
                Confirmar Reserva
              </button>
            </div>
          </motion.form>

          <div className="mt-12 text-center">
            <p className="text-charcoal/70 mb-4">Precisa fazer uma alteração?</p>
            <p className="text-sm text-charcoal/60">
              Entre em contato:{" "}
              <a href="tel:+5500000000000" className="text-terracotta hover:underline font-semibold">
                (00) 00000-0000
              </a>{" "}
              ou{" "}
              <a href="mailto:contato@trattorialuna.com.br" className="text-terracotta hover:underline font-semibold">
                contato@trattorialuna.com.br
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
