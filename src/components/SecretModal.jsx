import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SecretModal({ isOpen, onClose }) {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const validPasscodes = ['404', '42', 'not found', 'notfound', 'null', 'undefined', '200', '500', 'secret'];

  const handleDecrypt = (e) => {
    e.preventDefault();
    const clean = passcode.trim().toLowerCase();
    if (validPasscodes.includes(clean)) {
      setIsUnlocked(true);
      setErrorMsg('');
    } else {
      setErrorMsg("HTTP 401 UNAUTHORIZED: Clue not found! Think of the standard HTTP web error for 'Not Found'.");
    }
  };

  const handleCloseModal = () => {
    setIsUnlocked(false);
    setPasscode('');
    setErrorMsg('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg p-6 bg-[#02122F] border-2 border-[#8EA8C3]/40 text-[#F0F4F8] rounded-2xl shadow-2xl font-mono text-xs overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-[#8EA8C3]/30 pb-3 mb-4">
            <span className="font-extrabold uppercase tracking-widest text-[#F0F4F8]">
              {isUnlocked ? '[ MASTER CHEAT SHEET UNLOCKED ]' : '[ ENTERPRISE CIPHER TERMINAL ]'}
            </span>
            <button
              onClick={handleCloseModal}
              className="text-[#8EA8C3] hover:text-white font-bold transition-colors cursor-pointer"
            >
              [CLOSE]
            </button>
          </div>

          {!isUnlocked ? (
            /* STAGE 1: PROFESSIONAL DEVELOPER CIPHER */
            <div className="space-y-4">
              <div className="p-4 bg-[#112240] rounded-xl border border-amber-500/30 text-amber-200 leading-relaxed font-sans text-xs">
                <span className="font-mono font-bold block mb-1 uppercase tracking-wider text-amber-400">
                  SYSTEM DIAGNOSTIC:
                </span>
                "Pipeline Status: 200 OK. Corporate Jargon Density: 99.8%. User Clue Status: NOT FOUND."
              </div>

              <div className="p-4 bg-[#112240] rounded-xl border border-sky-500/30 text-sky-200 leading-relaxed font-sans text-xs">
                <span className="font-mono font-bold block mb-1 uppercase tracking-wider text-sky-400">
                  ENTERPRISE CIPHER CHALLENGE:
                </span>
                In web architecture & software engineering, what is the iconic 3-digit HTTP status code returned when a requested resource is missing or not found?
              </div>

              <form onSubmit={handleDecrypt} className="space-y-3 pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter status code..."
                    className="flex-1 px-3 py-2 bg-[#02122F] border border-[#8EA8C3]/50 rounded-xl text-white placeholder-[#8EA8C3]/50 font-mono text-xs focus:outline-none focus:border-emerald-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold uppercase rounded-xl transition-colors cursor-pointer"
                  >
                    DECRYPT
                  </button>
                </div>

                {errorMsg && (
                  <p className="text-rose-400 font-mono text-[11px] font-bold">
                    {errorMsg}
                  </p>
                )}
              </form>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsUnlocked(true)}
                  className="text-[10px] text-[#8EA8C3] hover:text-white underline tracking-wider uppercase font-bold cursor-pointer"
                >
                  [BYPASS CIPHER & SHOW CHEAT SHEET DIRECTLY]
                </button>
              </div>
            </div>
          ) : (
            /* STAGE 2: UNLOCKED CHEAT SHEET */
            <div>
              <p className="text-emerald-400 mb-4 font-mono text-xs font-bold flex items-center gap-2">
                <span>ACCESS GRANTED — ALL SECRET COMMANDS UNLOCKED:</span>
              </p>

              <div className="space-y-2.5">
                <div className="p-2.5 bg-[#112240] rounded-xl border border-[#8EA8C3]/20 flex justify-between items-center">
                  <span className="font-bold text-emerald-400">'matrix' or Ctrl+Shift+M</span>
                  <span className="text-[#8EA8C3]">Digital Code Rain Overlay</span>
                </div>
                <div className="p-2.5 bg-[#112240] rounded-xl border border-[#8EA8C3]/20 flex justify-between items-center">
                  <span className="font-bold text-amber-400">'chai' or 'tea'</span>
                  <span className="text-[#8EA8C3]">Relaxing Chai Emergency Break</span>
                </div>
                <div className="p-2.5 bg-[#112240] rounded-xl border border-[#8EA8C3]/20 flex justify-between items-center">
                  <span className="font-bold text-rose-400">'roast' or 'roast me'</span>
                  <span className="text-[#8EA8C3]">Sarcastic AI Roast Mode</span>
                </div>
                <div className="p-2.5 bg-[#112240] rounded-xl border border-[#8EA8C3]/20 flex justify-between items-center">
                  <span className="font-bold text-indigo-400">'gravity' or 'bounce'</span>
                  <span className="text-[#8EA8C3]">Zero Gravity Layout Fall</span>
                </div>
                <div className="p-2.5 bg-[#112240] rounded-xl border border-[#8EA8C3]/20 flex justify-between items-center">
                  <span className="font-bold text-sky-400">'gugugaga' or 'baby'</span>
                  <span className="text-[#8EA8C3]">Unlock ELI-1 Toddler Mode</span>
                </div>
                <div className="p-2.5 bg-[#112240] rounded-xl border border-[#8EA8C3]/20 flex justify-between items-center">
                  <span className="font-bold text-purple-400">'42' or 'meaning of life'</span>
                  <span className="text-[#8EA8C3]">Hitchhiker's Guide Truth</span>
                </div>
                <div className="p-2.5 bg-[#112240] rounded-xl border border-[#8EA8C3]/20 flex justify-between items-center">
                  <span className="font-bold text-amber-300">↑ ↑ ↓ ↓ ← → ← → B A</span>
                  <span className="text-[#8EA8C3]">Konami Code Secret</span>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="w-full mt-5 py-2.5 bg-[#F0F4F8] hover:bg-white text-[#02122F] font-mono font-bold uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
              >
                CLOSE TERMINAL
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
