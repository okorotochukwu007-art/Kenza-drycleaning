import React, { useState } from 'react';
import { Search, CheckCircle2, Clock, PackageCheck, MessageSquare, ChevronRight } from 'lucide-react';
import {
  LaundryTicket,
  ORDER_CARE_STAGES,
  BusinessConfig,
  formatNaira,
} from '../data/kenzaData';

interface OrderTrackerProps {
  tickets: LaundryTicket[];
  activeTicketId: string;
  businessConfig: BusinessConfig;
  onSelectTicket: (ticketId: string) => void;
  onAdvanceStage: (ticketId: string) => void;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({
  tickets,
  activeTicketId,
  businessConfig,
  onSelectTicket,
  onAdvanceStage,
}) => {
  const [inputCode, setInputCode] = useState(activeTicketId);
  const [lookupError, setLookupError] = useState('');

  const currentTicket =
    tickets.find((t) => t.ticketId.toUpperCase() === activeTicketId.toUpperCase()) || tickets[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = inputCode.trim().toUpperCase();
    if (!cleaned) return;
    const found = tickets.find((t) => t.ticketId.toUpperCase() === cleaned);
    if (found) {
      setLookupError('');
      onSelectTicket(found.ticketId);
    } else {
      setLookupError(
        `Ticket "${cleaned}" was not found. Try one of the active studio tickets below.`
      );
    }
  };

  const handleWhatsAppTicketSupport = (ticket: LaundryTicket) => {
    const message = encodeURIComponent(
      `Hello *${businessConfig.shortName}*, I am checking on my garment care ticket *${ticket.ticketId}* (${ticket.customerName} · ${ticket.zoneName}). Current status shows: ${ORDER_CARE_STAGES[ticket.currentStage]?.title}.`
    );
    window.open(
      `https://wa.me/${businessConfig.whatsappNumber}?text=${message}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section id="tracker" className="py-20 border-t border-white/10 bg-[#0D0F14]">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-10">
        {/* Header & Lookup Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
          <div className="lg:col-span-7">
            <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#D4AF37] mb-2">
              Real-Time Garment Telemetry
            </p>
            <h2
              className="font-display font-semibold text-[#F5F3EF] tracking-tight"
              style={{ fontSize: 'clamp(2rem, 3.2vw, 3rem)', textWrap: 'balance' }}
            >
              Live Order Status &amp; Care Tracker
            </h2>
            <p className="text-sm text-[#9CA3AF] mt-2 max-w-2xl">
              Every garment received at our Awolowo Road atelier is tagged and tracked through five bespoke inspection, cleaning, and finishing stages.
            </p>
          </div>

          <div className="lg:col-span-5">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => {
                    setInputCode(e.target.value);
                    setLookupError('');
                  }}
                  placeholder="Enter Ticket ID (e.g. KZ-8492)"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#13151C] border border-white/15 rounded-lg text-sm font-mono-tabular text-[#F5F3EF] placeholder-[#6B7280] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#0A0A0C] text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Track Ticket
              </button>
            </form>
            {lookupError && <p className="text-xs text-amber-400 mt-2">{lookupError}</p>}
          </div>
        </div>

        {/* Quick Ticket Selector Row */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs text-[#9CA3AF] mr-2">Active Atelier Tickets:</span>
          {tickets.map((t) => {
            const isSelected = t.ticketId === currentTicket.ticketId;
            return (
              <button
                key={t.ticketId}
                type="button"
                onClick={() => {
                  setInputCode(t.ticketId);
                  setLookupError('');
                  onSelectTicket(t.ticketId);
                }}
                className={`px-3.5 py-1.5 rounded-md text-xs font-mono-tabular transition-colors whitespace-nowrap shrink-0 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#D4AF37]/15 text-[#D4AF37] border-[#D4AF37]'
                    : 'bg-[#13151C] text-[#9CA3AF] border-white/10 hover:text-[#F5F3EF]'
                }`}
              >
                {t.ticketId} · {t.customerName.split(' ')[0]}
              </button>
            );
          })}
        </div>

        {/* Active Ticket Panel */}
        {currentTicket && (
          <div className="rounded-xl border border-white/10 bg-[#13151C] p-6 lg:p-8 space-y-8">
            {/* Top Ticket Summary Strip */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#9CA3AF]">
                  <span className="font-mono-tabular font-semibold text-[#D4AF37]">
                    Ticket #{currentTicket.ticketId}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Logged {currentTicket.createdAt}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentTicket.isExpress ? 'Express 24h Service' : 'Standard 48h Care'}</span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#F5F3EF]">
                  {currentTicket.customerName} — {currentTicket.zoneName}
                </h3>
                <p className="text-xs text-[#9CA3AF]">{currentTicket.streetAddress}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="px-4 py-2.5 rounded-lg bg-[#0A0A0C] border border-white/10">
                  <p className="text-[11px] text-[#9CA3AF]">Estimated Completion</p>
                  <p className="text-xs font-mono-tabular font-semibold text-[#F5F3EF] mt-0.5">
                    {currentTicket.estimatedReady}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onAdvanceStage(currentTicket.ticketId)}
                  className="px-4 py-2.5 text-xs font-medium text-[#F5F3EF] bg-[#1E222D] hover:bg-white/10 border border-white/15 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Simulate Next Care Stage</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>
              </div>
            </div>

            {/* 5-Stage Garment Care Pipeline */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {ORDER_CARE_STAGES.map((stage, idx) => {
                const isCompleted = idx < currentTicket.currentStage;
                const isCurrent = idx === currentTicket.currentStage;

                return (
                  <div
                    key={stage.step}
                    className={`p-4 rounded-xl border transition-colors ${
                      isCurrent
                        ? 'bg-[#1A1D27] border-[#D4AF37]'
                        : isCompleted
                        ? 'bg-[#0A0A0C]/80 border-emerald-500/30'
                        : 'bg-[#0A0A0C]/40 border-white/5 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono-tabular text-xs font-semibold text-[#D4AF37]">
                        0{stage.step}
                      </span>
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Completed</span>
                        </span>
                      ) : isCurrent ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#D4AF37]">
                          <Clock className="w-3.5 h-3.5" />
                          <span>In Progress</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#6B7280]">Pending</span>
                      )}
                    </div>
                    <h4 className="text-sm font-sans font-semibold text-[#F5F3EF] mb-1">
                      {stage.title}
                    </h4>
                    <p className="text-xs text-[#9CA3AF] leading-relaxed">{stage.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Itemized Ticket Manifest & Concierge Action */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-white/10 items-center">
              <div className="lg:col-span-8 space-y-2">
                <p className="text-xs font-mono-tabular uppercase tracking-wider text-[#9CA3AF]">
                  Itemized Garment Manifest
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#F5F3EF]">
                  {currentTicket.itemsSummary.map((item, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5">
                      <PackageCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>
                        {item.quantity}x {item.name} ({formatNaira(item.lineTotal)})
                      </span>
                    </span>
                  ))}
                </div>
                {currentTicket.specialInstructions && (
                  <p className="text-xs text-[#9CA3AF] pt-1">
                    Care Note: &ldquo;{currentTicket.specialInstructions}&rdquo;
                  </p>
                )}
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:justify-end items-start sm:items-center gap-4">
                <div className="text-left sm:text-right">
                  <p className="text-xs text-[#9CA3AF]">Ticket Total</p>
                  <p className="font-mono-tabular text-lg font-semibold text-[#D4AF37]">
                    {formatNaira(currentTicket.totalAmount)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleWhatsAppTicketSupport(currentTicket)}
                  className="px-4 py-2.5 bg-[#0A0A0C] hover:bg-white/5 text-[#F5F3EF] border border-white/15 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Inquire on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
