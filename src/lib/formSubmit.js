const STORAGE_KEYS = {
  join: 'fixity_join_community_submissions',
  enquire: 'fixity_enquire_submissions',
}

/**
 * Saves form responses locally and posts to a Google Sheets webhook when
 * VITE_SHEETS_WEBHOOK_URL is set (Apps Script / Sheetdb / similar).
 */
export async function submitToSheets(formType, data) {
  const payload = {
    formType,
    submittedAt: new Date().toISOString(),
    ...data,
  }

  try {
    const key = STORAGE_KEYS[formType] || `fixity_${formType}_submissions`
    const existing = JSON.parse(localStorage.getItem(key) || '[]')
    existing.push(payload)
    localStorage.setItem(key, JSON.stringify(existing))
  } catch {
    /* ignore storage quota / private mode */
  }

  const endpoint = import.meta.env.VITE_SHEETS_WEBHOOK_URL
  if (!endpoint) return payload

  await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    mode: 'no-cors',
  })

  return payload
}
