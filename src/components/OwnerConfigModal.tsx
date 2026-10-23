import React, { useState, useEffect } from 'react';
import { X, Save, RotateCcw, Check } from 'lucide-react';
import { BusinessConfig, GarmentItem, formatNaira } from '../data/kenzaData';

interface OwnerConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessConfig: BusinessConfig;
  catalog: GarmentItem[];
  onSaveConfig: (newConfig: BusinessConfig, newCatalog: GarmentItem[]) => void;
  onResetDefaults: () => void;
}

export const OwnerConfigModal: React.FC<OwnerConfigModalProps> = ({
  isOpen,
  onClose,
  businessConfig,
  catalog,
  onSaveConfig,
  onResetDefaults,
}) => {
  const [draftConfig, setDraftConfig] = useState<BusinessConfig>(businessConfig);
  const [draftCatalog, setDraftCatalog] = useState<GarmentItem[]>(catalog);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    setDraftConfig(businessConfig);
    setDraftCatalog(catalog);
  }, [businessConfig, catalog, isOpen]);

  if (!isOpen) return null;

  const handlePriceChange = (
    id: string,
    field: 'dryCleanPrice' | 'pressOnlyPrice',
    value: string
  ) => {
    const num = Math.max(0, parseInt(value.replace(/\D/g, ''), 10) || 0);
    setDraftCatalog((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: num } : item))
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedWhatsapp = draftConfig.whatsappNumber.replace(/\D/g, '') || '2348075705386';
    onSaveConfig(
      {
        ...draftConfig,
        whatsappNumber: cleanedWhatsapp,
      },
      draftCatalog
    );
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-[#11131A] border-l border-white/10 h-full overflow-y-auto p-6 sm:p-8">
        <div className="flex items-center justify-between pb-5 border-b border-white/10">
          <div>
            <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#F5C400]">
              Client Website Customizer
            </p>
            <h2 className="font-display text-2xl font-semibold text-[#F5F3EF] mt-0.5">
              Customize Contact Details &amp; Naira Price List
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close customizer"
            className="p-2 rounded-lg text-[#9CA3AF] hover:text-[#F5F3EF] hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="py-6 space-y-8">
          {/* Business Contact & Google Business Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-sans font-semibold text-[#F5C400] uppercase tracking-wider">
              1. Google Business Profile &amp; Contact Info
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs text-[#9CA3AF] mb-1">
                  Proper Business Name
                </label>
                <input
                  type="text"
                  value={draftConfig.businessName}
                  onChange={(e) =>
                    setDraftConfig({ ...draftConfig, businessName: e.target.value })
                  }
                  className="w-full px-3.5 py-2 bg-[#0A0A0C] border border-white/15 rounded-lg text-sm text-[#F5F3EF] focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs text-[#9CA3AF] mb-1">
                  Full Street Address (Ikoyi, Lagos)
                </label>
                <input
                  type="text"
                  value={draftConfig.streetAddress}
                  onChange={(e) =>
                    setDraftConfig({ ...draftConfig, streetAddress: e.target.value })
                  }
                  className="w-full px-3.5 py-2 bg-[#0A0A0C] border border-white/15 rounded-lg text-sm text-[#F5F3EF] focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#9CA3AF] mb-1">
                  Display Phone Number
                </label>
                <input
                  type="text"
                  value={draftConfig.phoneDisplay}
                  onChange={(e) =>
                    setDraftConfig({ ...draftConfig, phoneDisplay: e.target.value })
                  }
                  className="w-full px-3.5 py-2 bg-[#0A0A0C] border border-white/15 rounded-lg text-sm font-mono-tabular text-[#F5F3EF] focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#9CA3AF] mb-1">
                  Navbar Call Us Number
                </label>
                <input
                  type="text"
                  value={draftConfig.phoneShort}
                  onChange={(e) =>
                    setDraftConfig({ ...draftConfig, phoneShort: e.target.value })
                  }
                  className="w-full px-3.5 py-2 bg-[#0A0A0C] border border-white/15 rounded-lg text-sm font-mono-tabular text-[#F5F3EF] focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#9CA3AF] mb-1">
                  WhatsApp Number (with 234 country code)
                </label>
                <input
                  type="text"
                  value={draftConfig.whatsappNumber}
                  onChange={(e) =>
                    setDraftConfig({ ...draftConfig, whatsappNumber: e.target.value })
                  }
                  className="w-full px-3.5 py-2 bg-[#0A0A0C] border border-white/15 rounded-lg text-sm font-mono-tabular text-[#F5F3EF] focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#9CA3AF] mb-1">
                  Free Pickup Threshold (₦)
                </label>
                <input
                  type="number"
                  value={draftConfig.freeDeliveryThreshold}
                  onChange={(e) =>
                    setDraftConfig({
                      ...draftConfig,
                      freeDeliveryThreshold: parseInt(e.target.value, 10) || 0,
                    })
                  }
                  className="w-full px-3.5 py-2 bg-[#0A0A0C] border border-white/15 rounded-lg text-sm font-mono-tabular text-[#F5F3EF] focus:outline-none focus:border-[#F5C400]"
                />
              </div>
            </div>
          </div>

          {/* Garment Naira Price Table */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-sans font-semibold text-[#F5C400] uppercase tracking-wider">
                2. Garment Care Rate Card (NGN ₦)
              </h3>
              <span className="text-xs text-[#9CA3AF]">
                Updates Price List &amp; WhatsApp Receipts Instantly
              </span>
            </div>

            <div className="divide-y divide-white/10 border border-white/10 rounded-xl bg-[#0A0A0C] overflow-hidden">
              {draftCatalog.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <p className="text-xs font-semibold text-[#F5F3EF]">{item.name}</p>
                    <p className="text-[11px] text-[#9CA3AF]">
                      Current: Clean &amp; Press {formatNaira(item.dryCleanPrice)} · Ironing Only{' '}
                      {formatNaira(item.pressOnlyPrice)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div>
                      <label className="block text-[10px] text-[#9CA3AF] mb-0.5">
                        Clean &amp; Press (₦)
                      </label>
                      <input
                        type="text"
                        value={item.dryCleanPrice}
                        onChange={(e) =>
                          handlePriceChange(item.id, 'dryCleanPrice', e.target.value)
                        }
                        className="w-24 px-2.5 py-1.5 bg-[#13151C] border border-white/15 rounded-md text-xs font-mono-tabular text-[#F5F3EF] focus:outline-none focus:border-[#F5C400]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#9CA3AF] mb-0.5">
                        Ironing Only (₦)
                      </label>
                      <input
                        type="text"
                        value={item.pressOnlyPrice}
                        onChange={(e) =>
                          handlePriceChange(item.id, 'pressOnlyPrice', e.target.value)
                        }
                        className="w-24 px-2.5 py-1.5 bg-[#13151C] border border-white/15 rounded-md text-xs font-mono-tabular text-[#F5F3EF] focus:outline-none focus:border-[#F5C400]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                onResetDefaults();
                onClose();
              }}
              className="px-4 py-2.5 text-xs font-medium text-[#9CA3AF] hover:text-[#F5F3EF] border border-white/10 rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restore 109A Awolowo Rd Defaults</span>
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#F5C400] hover:bg-[#FFD633] text-[#0A0A0C] font-semibold text-xs rounded-lg inline-flex items-center gap-2 cursor-pointer"
            >
              {savedNotice ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved to Website</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Client Details &amp; Prices</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
