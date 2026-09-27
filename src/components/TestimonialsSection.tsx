import React from 'react';
import { Star, MessageSquareQuote } from 'lucide-react';

const REVIEWS = [
  {
    quote: "Rayeva has completely transformed how I shop. I love knowing that every purchase aligns with my values and makes a positive impact.",
    author: 'Sara Prasad',
    role: 'Sustainable Living Advocate',
    rating: 5,
    avatar: '/avatars/avatar1.jpg',
  },
  {
    quote: "The quality of products is exceptional. I've been using the starter kit for months and everything is holding up beautifully.",
    author: 'Manveer Raza',
    role: 'Environmental Engineer',
    rating: 4.5,
    avatar: '/avatars/avatar2.jpg',
  },
  {
    quote: "Customer service is outstanding. When I had questions about product origins, they provided detailed information within hours.",
    author: 'Anjali Singh',
    role: 'Eco-conscious Parent',
    rating: 5,
    avatar: '/avatars/avatar3.jpg',
  },
  {
    quote: "The subscription service has made sustainable living so convenient. I love discovering new eco-friendly products every month.",
    author: 'Dravid Mohan',
    role: 'Tech Professional',
    rating: 5,
    avatar: '/avatars/avatar1.jpg',
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative w-full bg-[#FAF8F3] py-20 sm:py-28 overflow-hidden select-none border-t border-stone-200/50"
    >
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#187E91] uppercase mb-3 bg-[#E3EFE7] px-3.5 py-1.5 rounded-full">
            <MessageSquareQuote size={13} className="stroke-[2.5]" />
            <span>COMMUNITY VOICES</span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-slate-900 leading-[1.15]">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
            Real stories from conscious individuals making mindful choices across India every day.
          </p>
        </div>

        {/* 4 Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                {/* Star Rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className={i < Math.floor(rev.rating) ? 'fill-amber-400 text-amber-400' : 'text-amber-300 fill-amber-200'}
                    />
                  ))}
                  <span className="ml-1.5 text-xs font-bold text-stone-800">
                    ({rev.rating})
                  </span>
                </div>

                {/* Quote Body */}
                <p className="text-stone-700 text-xs sm:text-[13px] leading-relaxed font-normal italic">
                  "{rev.quote}"
                </p>
              </div>

              {/* Author Row */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-[#187E91]/20"
                />
                <div>
                  <div className="font-serif text-sm font-semibold text-slate-950">
                    {rev.author}
                  </div>
                  <div className="text-[11px] text-stone-500 font-medium">
                    {rev.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
