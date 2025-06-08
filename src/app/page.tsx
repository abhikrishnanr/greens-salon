// src/app/page.tsx
'use client'
import React, { useEffect } from 'react'

export default function HomePage() {
  // Mobile menu toggle
  useEffect(() => {
    const mobileMenuButton = document.getElementById('mobile-menu-button')
    const mobileMenu = document.getElementById('mobile-menu')
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden')
        const icon = mobileMenuButton.querySelector('i')
        if (mobileMenu.classList.contains('hidden')) {
          icon!.classList.remove('ri-close-line')
          icon!.classList.add('ri-menu-line')
        } else {
          icon!.classList.remove('ri-menu-line')
          icon!.classList.add('ri-close-line')
        }
      })
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden')
          const icon = mobileMenuButton.querySelector('i')
          icon!.classList.remove('ri-close-line')
          icon!.classList.add('ri-menu-line')
        })
      })
    }
  }, [])

  // Fade-in animation for cards
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `
    document.head.appendChild(style)

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.animation = 'fadeIn 0.8s forwards'
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.service-card, .contact-card').forEach(card => {
      observer.observe(card)
    })
  }, [])

  // Smooth scrolling for anchor links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        e.preventDefault()
        const href = anchor.getAttribute('href')
        if (!href || href === '#') return
        const el = document.querySelector(href)
        if (el) {
          window.scrollTo({
            top: (el as HTMLElement).offsetTop - 80,
            behavior: 'smooth',
          })
        }
      })
    })
  }, [])

  // Appointment form handler
  useEffect(() => {
    const serviceSearch = document.getElementById('serviceSearch') as HTMLInputElement
    const servicesList = document.getElementById('servicesList')!
    const selectedServices = document.getElementById('selectedServices')!
    const appointmentForm = document.getElementById('appointmentForm') as HTMLFormElement
    const confirmationModal = document.getElementById('confirmationModal')!
    const closeModal = document.getElementById('closeModal')!
    const selectedServicesSet = new Set<string>()

    serviceSearch.addEventListener('focus', () => servicesList.classList.remove('hidden'))
    serviceSearch.addEventListener('input', e => {
      const term = (e.target as HTMLInputElement).value.toLowerCase()
      servicesList.querySelectorAll('div').forEach((svc: any) => {
        svc.style.display = svc.textContent.toLowerCase().includes(term) ? 'block' : 'none'
      })
      servicesList.classList.remove('hidden')
    })
    document.addEventListener('click', e => {
      if (!serviceSearch.contains(e.target as Node) && !servicesList.contains(e.target as Node)) {
        servicesList.classList.add('hidden')
      }
    })
    servicesList.addEventListener('click', (e: any) => {
      if (e.target.hasAttribute('data-value')) {
        const value = e.target.getAttribute('data-value')!
        const text = e.target.textContent
        if (!selectedServicesSet.has(value)) {
          selectedServicesSet.add(value)
          const tag = document.createElement('div')
          tag.className = 'inline-flex items-center bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full'
          tag.innerHTML = `
            ${text}
            <button type="button" class="ml-2" data-value="${value}">
              <i class="ri-close-line"></i>
            </button>`
          selectedServices.appendChild(tag)
        }
        serviceSearch.value = ''
        servicesList.classList.add('hidden')
      }
    })
    selectedServices.addEventListener('click', (e: any) => {
      const btn = e.target.closest('button')
      if (btn) {
        const val = btn.getAttribute('data-value')!
        selectedServicesSet.delete(val)
        btn.parentElement?.remove()
      }
    })
    appointmentForm.addEventListener('submit', e => {
      e.preventDefault()
      if (selectedServicesSet.size === 0) {
        serviceSearch.classList.add('border-red-500')
        return
      }
      confirmationModal.classList.remove('hidden')
      appointmentForm.reset()
      selectedServices.innerHTML = ''
      selectedServicesSet.clear()
    })
    closeModal.addEventListener('click', () => confirmationModal.classList.add('hidden'))
  }, [])

  return (
    <>
      {/* Navigation */}
      <header className="fixed w-full z-50 bg-black bg-opacity-80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="text-primary font-['Pacifico'] text-3xl">Greens Beauty</a>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="nav-link text-primary">Home</a>
            <a href="#services" className="nav-link text-primary">Services</a>
            <a href="#about" className="nav-link text-primary">About</a>
            <a href="#contact" className="nav-link text-primary">Contact</a>
          </nav>
          <a href="#booking" className="hidden md:inline-block bg-primary text-black px-6 py-2 rounded-button">Book Now</a>
          <button id="mobile-menu-button" className="md:hidden text-primary">
            <i className="ri-menu-line ri-2x"></i>
          </button>
        </div>
        <div id="mobile-menu" className="hidden bg-black bg-opacity-95">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#" className="text-primary">Home</a>
            <a href="#services" className="text-primary">Services</a>
            <a href="#about" className="text-primary">About</a>
            <a href="#contact" className="text-primary">Contact</a>
            <a href="#booking" className="bg-primary text-black px-6 py-2 rounded-button">Book Now</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-section min-h-screen flex items-center mt-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">Welcome to Greens Beauty Salon</h1>
          <p className="text-xl text-secondary mb-8">Your premier destination for beauty and wellness in Kerala.</p>
          <div className="flex justify-center gap-4">
            <a href="#services" className="bg-primary text-black px-8 py-3 rounded-button">Explore Services</a>
            <a href="#booking" className="border border-primary text-primary px-8 py-3 rounded-button">Book Appointment</a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary text-center mb-8">Our Premium Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[{
              title: 'Hair Styling',
              desc: 'Expert haircuts, styling, coloring, and treatments.',
              img: '...seq=11...'
            },{
              title: 'Facial Treatments',
              desc: 'Rejuvenating facials, clean-ups, and specialized skin treatments.',
              img: '...seq=12...'
            },{
              title: 'Manicure & Pedicure',
              desc: 'Luxurious nail care including spa treatments and nail art.',
              img: '...seq=13...'
            },{
              title: 'Bridal Packages',
              desc: 'Comprehensive bridal beauty packages including makeup & styling.',
              img: '...seq=14...'
            },{
              title: 'Body Treatments',
              desc: 'Relaxing massages, body polishing, and rejuvenation treatments.',
              img: '...seq=15...'
            },{
              title: 'Makeup Services',
              desc: 'Professional makeup for all occasions using premium products.',
              img: '...seq=16...'
            }].map((svc, i) => (
              <div key={i} className="service-card bg-black bg-opacity-50 border border-primary border-opacity-20 rounded-lg overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img src={`https://readdy.ai/api/search-image?query=${encodeURIComponent(svc.title)}&width=600&height=400&${svc.img}`} alt={svc.title} className="w-full h-full object-cover"/>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary mb-2">{svc.title}</h3>
                  <p className="text-secondary mb-4">{svc.desc}</p>
                  <div className="flex justify-between items-center">
                    <a href="#booking" className="text-primary hover:underline">Book Service <i className="ri-arrow-right-line ml-1"></i></a>
                    <button className="bg-primary bg-opacity-10 text-primary px-4 py-2 rounded-button">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-black bg-opacity-50">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-primary mb-4">About Us</h2>
            <p className="text-secondary mb-4">Founded in 2010, Greens Beauty has been a trusted name in wellness in Thiruvananthapuram.</p>
            <p className="text-secondary mb-6">We blend Kerala traditions with modern techniques for a unique experience.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black bg-opacity-50 border border-primary rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="text-secondary">Years Experience</div>
              </div>
              <div className="bg-black bg-opacity-50 border border-primary rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-primary">5000+</div>
                <div className="text-secondary">Happy Clients</div>
              </div>
            </div>
          </div>
          <img src="https://readdy.ai/api/search-image?query=elegant%20beauty%20salon%20interior&width=800&height=600" alt="Salon" className="w-full rounded-lg shadow-lg object-cover"/>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary text-center mb-8">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Priya Menon', role: 'Bridal Client', text: 'The bridal makeup service was exceptional! Highly recommend.' },
              { name: 'Anjali Nair', role: 'Regular Client', text: 'Their hair treatments transformed my hair. Ambiance is relaxing.' },
              { name: 'Lakshmi Krishnan', role: 'Skincare Client', text: 'Facial treatments are amazing! My skin has never looked better.' },
            ].map((t, i) => (
              <div key={i} className="bg-black bg-opacity-50 border border-primary rounded-lg p-6">
                <i className="ri-double-quotes-l ri-2x text-primary opacity-50 mb-4"></i>
                <p className="text-secondary mb-4">{t.text}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-4">
                    <i className="ri-user-line text-primary"></i>
                  </div>
                  <div>
                    <h4 className="text-primary font-medium">{t.name}</h4>
                    <div className="text-secondary text-sm">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Booking */}
      <section id="contact" className="py-20 bg-black bg-opacity-50">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold text-primary mb-4">Get In Touch</h2>
            <div className="space-y-6">
              <div className="contact-card rounded-lg p-6 flex items-start">
                <i className="ri-map-pin-line ri-lg text-primary mr-4"></i>
                <div>
                  <h3 className="text-xl font-semibold text-primary">Location</h3>
                  <p className="text-secondary">TC 45/215, Kunjalumood Junction, Karamana PO, Thiruvananthapuram</p>
                </div>
              </div>
              <div className="contact-card rounded-lg p-6 flex items-start">
                <i className="ri-phone-line ri-lg text-primary mr-4"></i>
                <div>
                  <h3 className="text-xl font-semibold text-primary">Phone</h3>
                  <a href="tel:+918891467678" className="text-secondary">+91 8891 467 678</a>
                </div>
              </div>
              <div className="contact-card rounded-lg p-6 flex items-start">
                <i className="ri-time-line ri-lg text-primary mr-4"></i>
                <div>
                  <h3 className="text-xl font-semibold text-primary">Hours</h3>
                  <p className="text-secondary">Mon–Sat: 9 AM–8 PM</p>
                  <p className="text-secondary">Sun: 10 AM–6 PM</p>
                </div>
              </div>
              <div className="contact-card rounded-lg p-6 flex items-start">
                <i className="ri-whatsapp-line ri-lg text-primary mr-4"></i>
                <div>
                  <h3 className="text-xl font-semibold text-primary">WhatsApp</h3>
                  <a href="#" className="text-secondary">Chat with us</a>
                </div>
              </div>
            </div>
          </div>
          <div id="booking">
            <h2 className="text-4xl font-bold text-primary mb-4">Book an Appointment</h2>
            <form id="appointmentForm" className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-primary mb-1">Full Name</label>
                <input id="name" name="name" required className="w-full bg-black bg-opacity-50 border border-primary rounded-button p-3 text-secondary focus:border-primary"/>
              </div>
              <div>
                <label htmlFor="phone" className="block text-primary mb-1">Phone Number</label>
                <input id="phone" name="phone" required className="w-full bg-black bg-opacity-50 border border-primary rounded-button p-3 text-secondary focus:border-primary"/>
              </div>
              <div>
                <label className="block text-primary mb-1">Services Required</label>
                <div className="relative">
                  <input id="serviceSearch" className="w-full bg-black bg-opacity-50 border border-primary rounded-button p-3 text-secondary focus:border-primary mb-2"/>
                  <div id="selectedServices" className="flex flex-wrap gap-2 mb-3"></div>
                  <div id="servicesList" className="hidden absolute z-10 w-full bg-black border border-primary rounded-button mt-1 max-h-48 overflow-y-auto">
                    {['Hair Styling','Facial Treatments','Manicure & Pedicure','Bridal Package','Body Treatments','Makeup Services'].map((svc, i) => (
                      <div key={i} data-value={svc.toLowerCase().split(' ')[0]} className="p-2 text-secondary hover:bg-primary hover:bg-opacity-10 cursor-pointer">
                        {svc}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="date" className="block text-primary mb-1">Preferred Date</label>
                <input type="date" id="date" name="date" required className="w-full bg-black bg-opacity-50 border border-primary rounded-button p-3 text-secondary focus:border-primary"/>
              </div>
              <div>
                <label htmlFor="time" className="block text-primary mb-1">Preferred Time</label>
                <input type="time" id="time" name="time" required className="w-full bg-black bg-opacity-50 border border-primary rounded-button p-3 text-secondary focus:border-primary"/>
              </div>
              <div>
                <label htmlFor="message" className="block text-primary mb-1">Special Requests</label>
                <textarea id="message" name="message" rows={3} className="w-full bg-black bg-opacity-50 border border-primary rounded-button p-3 text-secondary focus:border-primary"/>
              </div>
              <button type="submit" className="w-full bg-primary text-black py-3 rounded-button">Request Appointment</button>
            </form>
            <div id="confirmationModal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-black border border-primary rounded-lg p-8 max-w-sm mx-4 text-center">
                <i className="ri-check-line ri-2x text-primary mb-4 block"></i>
                <h3 className="text-2xl font-bold text-primary mb-2">Thank You!</h3>
                <p className="text-secondary mb-4">Your request has been received. We'll confirm shortly.</p>
                <button id="closeModal" className="bg-primary text-black px-6 py-2 rounded-button">Close</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black bg-opacity-70 py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-['Pacifico'] text-primary mb-4">Greens Beauty</h3>
            <p className="text-secondary mb-4">Your premier destination for beauty and wellness since 2010.</p>
            <div className="flex space-x-4">
              <i className="ri-facebook-fill ri-lg text-primary"></i>
              <i className="ri-instagram-line ri-lg text-primary"></i>
              <i className="ri-whatsapp-line ri-lg text-primary"></i>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home','#services','#about','#contact','#booking'].map((l, i) => (
                <li key={i}><a href={l} className="text-secondary hover:text-primary">{l==='Home'?'Home':l.replace('#','')}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-primary mb-4">Services</h4>
            <ul className="space-y-2">
              {['Hair Styling','Facial Treatments','Manicure & Pedicure','Bridal Packages','Body Treatments','Makeup Services'].map((svc, i) => (
                <li key={i}><a href="#services" className="text-secondary hover:text-primary">{svc}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-primary mb-4">Contact Info</h4>
            <ul className="space-y-2">
              <li className="flex items-start"><i className="ri-map-pin-line text-primary mr-2 mt-1"></i><span className="text-secondary">TC 45/215, Kunjalumood Junction, Karamana PO</span></li>
              <li className="flex items-center"><i className="ri-phone-line text-primary mr-2"></i><a href="tel:+918891467678" className="text-secondary">+91 8891 467 678</a></li>
              <li className="flex items-center"><i className="ri-time-line text-primary mr-2"></i><span className="text-secondary">9 AM–8 PM (Mon–Sat)</span></li>
            </ul>
          </div>
        </div>
        <p className="text-secondary text-center mt-8">&copy; 2025 Greens Beauty Salon. All rights reserved.</p>
      </footer>
    </>
  )
}
