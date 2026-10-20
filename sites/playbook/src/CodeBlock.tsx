import React, { useState } from 'react';
import { ClipboardCopy, Check } from 'lucide-react';

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className="relative bg-[#f8f9fa] rounded-lg border border-gray-200 shadow-sm font-mono text-[13px] sm:text-sm my-6 flex text-gray-800">
      <button 
        onClick={handleCopy} 
        className="absolute top-2 right-2 p-2 bg-white rounded border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm z-10" 
        title="Copy code"
      >
        {copied ? <Check className="w-4 h-4 text-green-600" /> : <ClipboardCopy className="w-4 h-4 text-gray-600" />}
      </button>
      <div className="py-4 px-2 text-right text-gray-400 select-none border-r border-gray-200 bg-gray-50 rounded-l-lg min-w-[3rem]">
        {lines.map((_, i) => (
          <div key={i} className="px-2 leading-loose">{i + 1}</div>
        ))}
      </div>
      <div className="p-4 overflow-x-auto w-full">
        <pre className="m-0 p-0 leading-loose text-[#1a1a1a]">
          {code.trim()}
        </pre>
      </div>
    </div>
  );
}
