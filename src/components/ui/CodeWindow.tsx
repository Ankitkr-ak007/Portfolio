import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeWindowProps {
  filename?: string;
  language?: string;
  code: string;
}

export const CodeWindow: React.FC<CodeWindowProps> = ({
  filename = 'main.rs',
  language = 'rust',
  code,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className="rounded-xl bg-[#050609] border border-[rgba(255,255,255,0.08)] shadow-[0_4px_30px_rgba(0,0,0,0.8)] overflow-hidden font-mono text-xs">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0A0D12] border-b border-[rgba(255,255,255,0.08)]">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[#9BA4B2] text-[11px] flex items-center space-x-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#78AFFF]" />
            <span>{filename}</span>
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <span className="px-2 py-0.5 rounded bg-[#10141B] text-[10px] text-[#78AFFF] uppercase font-semibold">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="p-1 rounded text-[#596170] hover:text-[#F5F7FA] transition-colors"
            title="Copy code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Code body with line numbers */}
      <div className="p-4 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-[rgba(120,175,255,0.04)] transition-colors">
                <td className="w-8 select-none text-right pr-4 text-[#596170] text-[10px] py-0.5">
                  {idx + 1}
                </td>
                <td className="text-[#F5F7FA] whitespace-pre py-0.5">
                  <code>{line}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
