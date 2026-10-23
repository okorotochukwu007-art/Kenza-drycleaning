import React, { useState } from 'react';
import { Download, Smartphone, Share, PlusSquare, X, CheckCircle2, WifiOff } from 'lucide-react';
import { usePWAInstall, useOnlineStatus } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'compact' | 'drawer' | 'footer';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'compact' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showMobileGuide, setShowMobileGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  const handleAction = async () => {
    if (isInstallable) {
      await install();
    } else {
      setShowMobileGuide(true);
    }
  };

  const buttonClasses =
    variant === 'drawer'
      ? 'w-full min-h-[46px] px-4 py-3 rounded-xl bg-[#161512] hover:bg-[#1E1C18] border border-[#DFBC7E]/40 text-[#DFBC7E] text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer'
      : variant === 'footer'
      ? 'min-h-[40px] px-3.5 py-2 rounded-lg bg-[#141310] hover:bg-[#1C1A15] border border-[#DFBC7E]/35 text-[#DFBC7E] text-xs font-medium inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0'
      : 'min-h-[40px] px-3 py-1.5 rounded-lg bg-[#141310]/90 hover:bg-[#1E1C16] border border-[#DFBC7E]/40 text-[#DFBC7E] text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0';

  return (
    <>
      <button
        type="button"
        onClick={handleAction}
        aria-label="Install Kenza Mobile App on iPhone or Android"
        className={buttonClasses}
      >
        {isInstallable ? (
          <Download className="w-3.5 h-3.5 text-[#DFBC7E] shrink-0" />
        ) : (
          <Smartphone className="w-3.5 h-3.5 text-[#DFBC7E] shrink-0" />
        )}
        <span>{isIOS ? 'Add to iPhone' : isInstallable ? 'Install App' : 'Get Mobile App'}</span>
      </button>

      {showMobileGuide && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-xs p-0 sm:p-4"
          onClick={() => setShowMobileGuide(false)}
        >
          <div
            className="w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl bg-[#11131A] border-t sm:border border-[#DFBC7E]/35 p-6 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Sheet Drag Handle */}
            <div className="w-10 h-1.5 bg-white/20 rounded-full mx-auto sm:hidden" />

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-mono-tabular uppercase tracking-widest text-[#DFBC7E]">
                  iPhone &amp; Android Home Screen App
                </p>
                <h3 className="font-display text-2xl font-semibold text-[#F5F3EF] mt-0.5">
                  Save KENZA to Your Phone
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowMobileGuide(false)}
                aria-label="Close installation guide"
                className="min-w-[44px] min-h-[44px] -mr-2 -mt-2 rounded-lg flex items-center justify-center text-[#9CA3AF] hover:text-[#F5F3EF] hover:bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#D8D3C8] leading-relaxed">
              Book doorstep laundry pickups in Ikoyi &amp; Victoria Island with one tap directly from your iPhone or Android home screen—no app store download required.
            </p>

            <div className="space-y-3">
              {/* iPhone / iOS Safari Instructions */}
              <div className="p-4 rounded-xl bg-[#0A0A0C] border border-white/10 space-y-2.5">
                <p className="text-xs font-semibold text-[#DFBC7E] flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  <span>On iPhone or iPad (Safari)</span>
                </p>
                <ol className="text-xs text-[#D8D3C8] space-y-2 pl-1">
                  <li className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#DFBC7E]/15 text-[#DFBC7E] font-mono-tabular text-[11px] flex items-center justify-center shrink-0">
                      1
                    </span>
                    <span className="inline-flex items-center gap-1.5 flex-wrap">
                      Tap the <strong>Share</strong> icon
                      <Share className="w-3.5 h-3.5 text-[#DFBC7E] inline" /> at the bottom of Safari.
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#DFBC7E]/15 text-[#DFBC7E] font-mono-tabular text-[11px] flex items-center justify-center shrink-0">
                      2
                    </span>
                    <span className="inline-flex items-center gap-1.5 flex-wrap">
                      Scroll down and tap <strong>Add to Home Screen</strong>
                      <PlusSquare className="w-3.5 h-3.5 text-[#DFBC7E] inline" />.
                    </span>
                  </li>
                </ol>
              </div>

              {/* Android Chrome Instructions */}
              <div className="p-4 rounded-xl bg-[#0A0A0C] border border-white/10 space-y-2.5">
                <p className="text-xs font-semibold text-[#DFBC7E] flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>On Android (Chrome)</span>
                </p>
                <ol className="text-xs text-[#D8D3C8] space-y-2 pl-1">
                  <li className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#DFBC7E]/15 text-[#DFBC7E] font-mono-tabular text-[11px] flex items-center justify-center shrink-0">
                      1
                    </span>
                    <span>
                      Tap the <strong>three-dot menu (⋮)</strong> in the top-right corner of Chrome.
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#DFBC7E]/15 text-[#DFBC7E] font-mono-tabular text-[11px] flex items-center justify-center shrink-0">
                      2
                    </span>
                    <span className="inline-flex items-center gap-1.5 flex-wrap">
                      Tap <strong>Install App</strong> or <strong>Add to Home screen</strong>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#DFBC7E] inline" />.
                    </span>
                  </li>
                </ol>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowMobileGuide(false)}
              className="w-full min-h-[46px] py-3 rounded-xl bg-gradient-to-b from-[#E8CA93] to-[#C89F5B] text-[#17120A] text-xs font-semibold tracking-wide cursor-pointer"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-[#161512]/95 border border-[#DFBC7E]/50 px-4 py-2 text-xs font-medium text-[#F5F3EF] shadow-xl backdrop-blur-md whitespace-nowrap">
      <WifiOff className="w-3.5 h-3.5 text-[#DFBC7E] shrink-0" />
      <span>Offline Mode — Viewing saved Naira price list &amp; orders</span>
    </div>
  );
};
