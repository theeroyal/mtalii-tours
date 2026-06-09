'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { tourPackages as defaultPackages } from '@/lib/data';
import { formatPrice } from '@/lib/currency';
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

export default function Booking() {
  const bookingEmail = process.env.NEXT_PUBLIC_BOOKING_EMAIL || 'mtaliitoursandadventures@gmail.com';

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_BOOKING;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  const [tourPackages, setTourPackages] = useState([]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tour: '',
    guests: '2',
    travelDate: '',
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  useEffect(() => {
    let storedPackages = JSON.parse(localStorage.getItem('mtalii_packages'));
    if (!storedPackages) {
      storedPackages = defaultPackages;
    }
    setTourPackages(storedPackages);
  }, []);

  const selectedTour = tourPackages.find(t => t.id === parseInt(formData.tour));
  const totalGuests = parseInt(formData.guests);
  const subtotal = selectedTour ? selectedTour.price * totalGuests : 0;
  const deposit = subtotal * 0.3;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStep(4);

    // Check if EmailJS is configured
    if (!serviceId || !templateId || !publicKey) {
      console.warn('EmailJS not configured. Sending via mailto: fallback.');
      const mailtoBody = encodeURIComponent(
        `Booking Request Details:\n\nTour Package: ${selectedTour?.title || 'Not selected'}\nTravel Date: ${formData.travelDate}\nGuests: ${formData.guests}\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nNotes:\n${formData.notes}`
      );
      setTimeout(() => {
        window.open(`mailto:${bookingEmail}?subject=${encodeURIComponent('New Booking Request')}&body=${mailtoBody}`, '_blank');
      }, 500);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          tour: selectedTour?.title || 'Not selected',
          travelDate: formData.travelDate,
          guests: formData.guests,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          notes: formData.notes,
          to_email: bookingEmail
        },
        publicKey
      );
    } catch (error) {
      console.error('EmailJS error:', error);
    }
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      tour: '',
      guests: '2',
      travelDate: '',
      name: '',
      email: '',
      phone: '',
      notes: ''
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-manrope mb-4">Book Your Adventure</h1>
          <p className="text-xl text-sand-light">Let&apos;s plan your unforgettable journey</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          {step !== 4 && (
            <div className="flex justify-between mb-12">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-colors ${
                      step >= s ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {s}
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${
                      step >= s ? 'text-primary' : 'text-gray-500'
                    }`}
                  >
                    {s === 1 ? 'Select Tour' : s === 2 ? 'Your Details' : 'Confirm'}
                  </span>
                </div>
              ))}
            </div>
          )}

          <Card className="p-8">
            {/* Step 1: Select Tour */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold font-manrope text-charcoal-text mb-6">Select Your Tour</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-text mb-2">Tour Package</label>
                    <select
                      name="tour"
                      value={formData.tour}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-warm-stone rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      required
                    >
                      <option value="">Select a tour package...</option>
                      {tourPackages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.title} - {formatPrice(pkg.price, pkg.currency)}/person ({pkg.duration})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-charcoal-text mb-2">Number of Guests</label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-warm-stone rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        required
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal-text mb-2">Preferred Travel Date</label>
                      <input
                        type="date"
                        name="travelDate"
                        value={formData.travelDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-warm-stone rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button onClick={() => setStep(step + 1)} disabled={!formData.tour || !formData.travelDate}>
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Your Details */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold font-manrope text-charcoal-text mb-6">Your Details</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-charcoal-text mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-warm-stone rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal-text mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border border-warm-stone rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal-text mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+254 7XX XXX XXX"
                      className="w-full px-4 py-3 border border-warm-stone rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal-text mb-2">Special Requests (Optional)</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Any dietary requirements, accessibility needs, or other special requests..."
                      className="w-full px-4 py-3 border border-warm-stone rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <Button variant="secondary" onClick={() => setStep(step - 1)}>Back</Button>
                  <Button onClick={() => setStep(step + 1)} disabled={!formData.name || !formData.email || !formData.phone}>
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Confirm Booking */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold font-manrope text-charcoal-text mb-6">Confirm Your Booking</h2>

                <div className="bg-sand-light/30 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-semibold font-manrope text-charcoal-text mb-4">Booking Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tour Package:</span>
                      <span className="font-medium">{selectedTour?.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Travel Date:</span>
                      <span className="font-medium">{formData.travelDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Guests:</span>
                      <span className="font-medium">{formData.guests}</span>
                    </div>
                    <hr className="my-3" />
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium text-lg">{formatPrice(subtotal, selectedTour?.currency)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Deposit (30%):</span>
                      <span>{formatPrice(deposit, selectedTour?.currency)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <Button variant="secondary" onClick={() => setStep(step - 1)}>Back</Button>
                  <Button onClick={handleSubmit}>
                    Complete Booking
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation Screen */}
            {step === 4 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold font-manrope text-charcoal-text mb-4">Booking Request Sent!</h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Thank you for your booking request! We&apos;ve received your details and will contact you shortly to confirm your adventure.
                </p>
                <Button onClick={resetForm}>Book Another Tour</Button>
              </div>
            )}
          </Card>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
