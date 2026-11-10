// Sends website enquiries to info@wesprimeit.com through Web3Forms
// (https://web3forms.com), so they arrive without the visitor's email app.
//
// To switch it on, create a free access key at web3forms.com using
// info@wesprimeit.com and paste it below. The key only allows sending to that
// inbox, so it is safe to keep in the website code. While it is empty, the
// forms fall back to opening the visitor's email app as before.
export const WEB3FORMS_KEY = 'a43777c0-f7d1-4983-af94-e3fb93e4c483'

export const canSendDirect = WEB3FORMS_KEY.trim() !== ''

type Enquiry = {
  subject: string
  name: string
  email?: string
  message: string
}

/** True when the enquiry was accepted for delivery. */
export async function sendEnquiry({ subject, name, email, message }: Enquiry): Promise<boolean> {
  if (!canSendDirect) return false
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject,
        from_name: 'Wesprime website',
        name,
        ...(email ? { email, replyto: email } : {}),
        message,
        botcheck: '',
      }),
    })
    const data = await res.json().catch(() => ({}))
    return res.ok && data.success === true
  } catch {
    return false
  }
}
