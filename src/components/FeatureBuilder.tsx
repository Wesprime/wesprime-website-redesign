import { useEffect, useRef, useState, type ReactNode } from 'react'

// "From need to feature": a business request, the Odoo code that answers it
// (typed out live), and the result the user sees in Odoo.

type Story = {
  id: string
  label: string
  who: string
  need: string
  file: string
  code: string
  result: ReactNode
}

const stories: Story[] = [
  {
    id: 'approval',
    label: 'Approval rule',
    who: 'Finance manager',
    need: 'Any sales order above SAR 50,000 must be approved by a manager before it is confirmed.',
    file: 'models/sale_order.py',
    code: `class SaleOrder(models.Model):
    _inherit = 'sale.order'

    approval_required = fields.Boolean(
        compute='_compute_approval', store=True)

    @api.depends('amount_total')
    def _compute_approval(self):
        for order in self:
            order.approval_required = order.amount_total > 50000`,
    result: (
      <div className="fb-odoo">
        <div className="fb-odoo-bar"><span>Sales</span><b>S00042</b></div>
        <div className="fb-odoo-body">
          <div className="fb-row"><span>Customer</span><b>Najd Trading Co.</b></div>
          <div className="fb-row"><span>Total</span><b>SAR 64,500.00</b></div>
          <div className="fb-badge warn">Manager approval required</div>
          <div className="fb-actions"><span className="fb-btn primary">Request approval</span><span className="fb-btn">Cancel</span></div>
        </div>
      </div>
    ),
  },
  {
    id: 'sync',
    label: 'Store integration',
    who: 'E-commerce lead',
    need: 'Orders from our online store should appear in Odoo automatically — no more re-typing them.',
    file: 'services/store_sync.py',
    code: `def sync_orders(self):
    orders = self.store_api.get('/orders', status='paid')
    for data in orders:
        self.env['sale.order'].create({
            'partner_id': self._customer(data).id,
            'origin': data['number'],
            'order_line': self._lines(data),
        })`,
    result: (
      <div className="fb-odoo">
        <div className="fb-odoo-bar"><span>Integrations</span><b>Online store</b></div>
        <div className="fb-odoo-body">
          {[['#1043', 'SAR 1,280'], ['#1044', 'SAR 465'], ['#1045', 'SAR 2,910']].map(([n, v]) => (
            <div key={n} className="fb-row fb-sync"><span><i className="fb-ok">✓</i> Order {n}</span><b>{v}</b></div>
          ))}
          <div className="fb-badge ok">3 orders synced · just now</div>
        </div>
      </div>
    ),
  },
  {
    id: 'invoice',
    label: 'Bilingual invoice',
    who: 'Accounts team',
    need: 'Customers need tax invoices in Arabic and English, with our layout and VAT details.',
    file: 'report/invoice_templates.xml',
    code: `<template id="report_invoice_bilingual">
    <t t-call="web.external_layout">
        <h2>Tax Invoice
            <span dir="rtl">فاتورة ضريبية</span>
        </h2>
        <t t-foreach="o.invoice_line_ids" t-as="line">
            <span t-field="line.name"/>
        </t>
    </t>
</template>`,
    result: (
      <div className="fb-odoo">
        <div className="fb-odoo-bar"><span>Invoicing</span><b>INV/2026/0118</b></div>
        <div className="fb-odoo-body fb-invoice">
          <div className="fb-inv-title"><b>Tax Invoice</b><b lang="ar" dir="rtl">فاتورة ضريبية</b></div>
          <div className="fb-row"><span>Odoo implementation</span><b>SAR 40,000</b></div>
          <div className="fb-row"><span>VAT 15% <span lang="ar" dir="rtl">ضريبة</span></span><b>SAR 6,000</b></div>
          <div className="fb-row fb-total"><span>Total <span lang="ar" dir="rtl">الإجمالي</span></span><b>SAR 46,000</b></div>
        </div>
      </div>
    ),
  },
]

// Minimal highlighter: comments, strings, decorators, XML tags, keywords, numbers.
const TOKEN = /(#[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(@\w+(?:\.\w+)*)|(<\/?[\w.:-]+|\/?>)|\b(from|import|class|def|for|in|return|if|self|True|False|None)\b|\b(\d+)\b/g

function highlight(code: string): ReactNode[] {
  const out: ReactNode[] = []
  let last = 0
  for (const m of code.matchAll(TOKEN)) {
    if (m.index > last) out.push(code.slice(last, m.index))
    const cls = m[1] ? 'tk-com' : m[2] ? 'tk-str' : m[3] ? 'tk-dec' : m[4] ? 'tk-tag' : m[5] ? 'tk-kw' : 'tk-num'
    out.push(<span key={m.index} className={cls}>{m[0]}</span>)
    last = m.index + m[0].length
  }
  out.push(code.slice(last))
  return out
}

const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Types the code out character by character once `active`, then shows the result. */
function useTyping(text: string, active: boolean) {
  const [count, setCount] = useState(() => (reduceMotion() ? text.length : 0))
  useEffect(() => {
    if (reduceMotion() || !active) return
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          window.clearInterval(id)
          return c
        }
        return Math.min(text.length, c + 4)
      })
    }, 16)
    return () => window.clearInterval(id)
  }, [text, active])
  return count
}

/** True once the element has scrolled into view. */
function useSeen<T extends Element>() {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true)
        io.disconnect()
      }
    }, { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [seen])
  return [ref, seen] as const
}

function StoryView({ story, active }: { story: Story; active: boolean }) {
  const typed = useTyping(story.code, active)
  const done = typed >= story.code.length
  return (
    <div className="fb-flow">
      <div className="fb-panel fb-need">
        <span className="fb-step">01 · The need</span>
        <div className="fb-quote">
          <p>"{story.need}"</p>
          <span className="fb-who"><i aria-hidden="true">{story.who.charAt(0)}</i>{story.who}</span>
        </div>
      </div>

      <span className="fb-link" aria-hidden="true"><i /></span>

      <div className="fb-panel fb-code">
        <span className="fb-step">02 · The code</span>
        <div className="fb-editor">
          <div className="fb-editor-bar"><span className="code-dots"><i /><i /><i /></span><span>{story.file}</span></div>
          <pre><code>{highlight(story.code.slice(0, typed))}{!done && <span className="fb-caret" />}</code></pre>
        </div>
      </div>

      <span className="fb-link" aria-hidden="true"><i /></span>

      <div className={`fb-panel fb-result${done ? ' is-done' : ''}`}>
        <span className="fb-step">03 · The result in Odoo</span>
        {done ? story.result : <div className="fb-building"><span className="fb-spinner" />Building…</div>}
      </div>
    </div>
  )
}

export function FeatureBuilder() {
  const [tab, setTab] = useState(0)
  const [ref, seen] = useSeen<HTMLDivElement>()
  return (
    <div className="fb" ref={ref}>
      <div className="fb-tabs" role="tablist" aria-label="Examples">
        {stories.map((s, i) => (
          <button key={s.id} type="button" role="tab" aria-selected={tab === i} className={tab === i ? 'is-on' : ''} onClick={() => setTab(i)}>
            {s.label}
          </button>
        ))}
      </div>
      <StoryView key={stories[tab].id} story={stories[tab]} active={seen} />
    </div>
  )
}
