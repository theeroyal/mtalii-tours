'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Card from '@/components/Card';
import AnimatedSection from '@/components/AnimatedSection';

export default function About() {
  const services = [
    { 
      name: "Tours & Travel Packages", 
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80" 
    },
    { 
      name: "Corporate Team Building", 
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" 
    },
    { 
      name: "Adventure Experiences", 
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80" 
    },
    { 
      name: "Group Getaways", 
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80" 
    },
    { 
      name: "Hotel & Accommodation Booking", 
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80" 
    },
    { 
      name: "Airbnb Booking", 
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80" 
    },
    { 
      name: "Event Travel Coordination", 
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80" 
    },
    { 
      name: "Safaris & Excursions", 
      image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80" 
    },
    { 
      name: "Customized Travel Planning", 
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80" 
    }
  ];

  const whyChooseUs = [
    { icon: '✓', text: 'Curated travel experiences' },
    { icon: '✓', text: 'Flexible and customized packages' },
    { icon: '✓', text: 'Reliable travel coordination' },
    { icon: '✓', text: 'Adventure and relaxation combined' },
    { icon: '✓', text: 'Professional and customer-focused approach' }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <AnimatedSection className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-manrope mb-4">About Us</h1>
          <p className="text-xl text-sand-light">Learn more about our story and what we offer</p>
        </div>
      </AnimatedSection>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl font-bold font-manrope text-charcoal-text mb-12 text-center">Our Story</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80" 
                  alt="Mtalii Tours adventure" 
                  className="rounded-2xl shadow-xl w-full h-96 object-cover"
                />
              </div>
              <div>
                <div className="text-gray-600 space-y-4">
                  <p>
                    At Mtalii Tours & Adventures, we believe that travel is more than visiting places . it is about creating memories, building connections, and experiencing life beyond the ordinary.
                  </p>
                  <p>
                    Founded with a passion for exploration and unforgettable experiences, Mtalii Tours & Adventures specializes in organizing exciting tours, adventure trips, team-building experiences, getaways, safaris, hikes, and customized travel packages designed for individuals, groups, schools, churches, and corporate organizations.
                  </p>
                  <p>
                    Our mission is to make travel enjoyable, accessible, and memorable by carefully planning experiences that combine adventure, comfort, discovery, and meaningful moments.
                  </p>
                  <p>
                    From thrilling outdoor activities and scenic destinations to relaxing stays and corporate retreats, we focus on delivering experiences that leave lasting impressions. Whether you are looking for a weekend escape, a team-building event, an adventure challenge, or a complete travel experience, Mtalii is here to make it happen.
                  </p>
                  <p>
                    We work to connect people with amazing destinations, quality hospitality partners, and unique activities while ensuring convenience, professionalism, and value throughout the journey.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Vision & Mission */}
      <section className="py-16 bg-sand-light/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Card className="p-8">
                <h3 className="text-2xl font-bold font-manrope text-primary mb-6">Our Vision</h3>
                <p className="text-gray-600 text-lg">
                  To become a trusted and leading travel brand that creates unforgettable experiences across Kenya and beyond.
                </p>
              </Card>
              <Card className="p-8">
                <h3 className="text-2xl font-bold font-manrope text-primary mb-6">Our Mission</h3>
                <p className="text-gray-600 text-lg">
                  To deliver memorable travel and adventure experiences through excellent planning, strong partnerships, and customer-focused service.
                </p>
              </Card>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Mtalii? */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl font-bold font-manrope text-charcoal-text mb-12 text-center">Why Choose Mtalii?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseUs.map((item, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="text-primary text-4xl mb-4">{item.icon}</div>
                    <h4 className="text-lg font-semibold font-manrope text-charcoal-text">{item.text}</h4>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20 bg-sand-light/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl font-bold font-manrope text-charcoal-text mb-12 text-center">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-lg font-semibold font-manrope text-charcoal-text">
                        {service.name}
                      </h3>
                    </div>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Final Welcome */}
      <section className="py-20 bg-gradient-to-br from-accent to-accent/90 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold font-manrope mb-6">Explore. Discover. Live.</h2>
            <p className="text-2xl text-sand-light mb-8 font-semibold">Welcome to Mtalii Tours & Adventures.</p>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
