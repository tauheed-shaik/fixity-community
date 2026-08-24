import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

export default function CouponCode({ code, discount }) {
  const [copied, setCopied] = useState(false)

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] font-semibold text-green">
      <span>Use &quot;{code}&quot; for {discount}% discount</span>
      <button type="button" onClick={copyCode} className="inline-flex items-center gap-1 rounded-md border border-green/30 px-2 py-1 text-[9px] font-bold uppercase text-green hover:bg-green/10">
        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        {copied ? 'Copied' : 'Copy code'}
      </button>
    </div>
  )
}
