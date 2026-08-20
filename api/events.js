const EVENTS_KEY = 'fixity_community_events'

function getRedisConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  return { url, token }
}

async function redisRequest(path, options = {}) {
  const { url, token } = getRedisConfig()
  if (!url || !token) throw new Error('Redis environment variables are not configured')

  const response = await fetch(`${url.replace(/\/$/, '')}/${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  })

  if (!response.ok) throw new Error(`Redis returned ${response.status}`)
  return response.json()
}

function defaultEvents() {
  const now = new Date()
  const date = (dayOffset, hour) => {
    const value = new Date(now)
    value.setDate(value.getDate() + dayOffset)
    value.setHours(hour, 0, 0, 0)
    return value.toISOString()
  }

  return [
    { id: 'evt-1', title: 'AI in Action Workshop', subtitle: 'By Amazon Tech Lead', startAt: date(0, 14), endAt: date(0, 17), address: 'FixityEdx Office, Vijayawada' },
    { id: 'evt-2', title: 'Cloud Career Roadmap', subtitle: 'By Microsoft Expert', startAt: date(7, 11), endAt: date(7, 13), address: 'FixityEdx Office, Vijayawada' },
    { id: 'evt-3', title: 'Build with GenAI', subtitle: 'Hands-on Workshop', startAt: date(14, 14), endAt: date(14, 17), address: 'FixityEdx Office, Vijayawada' },
    { id: 'evt-4', title: 'Tech Networking Meet', subtitle: 'Connect. Collaborate. Grow.', startAt: date(21, 17), endAt: date(21, 19), address: 'FixityEdx Office, Vijayawada' },
  ]
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store')

  try {
    if (request.method === 'GET') {
      const result = await redisRequest(`get/${encodeURIComponent(EVENTS_KEY)}`)
      const events = result.result ? JSON.parse(result.result) : defaultEvents()
      if (!result.result) {
        await redisRequest(`set/${encodeURIComponent(EVENTS_KEY)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(defaultEvents()),
        })
      }
      return response.status(200).json({ events })
    }

    if (request.method === 'PUT') {
      const payload = typeof request.body === 'string' ? JSON.parse(request.body) : request.body
      if (!Array.isArray(payload?.events)) return response.status(400).json({ error: 'events must be an array' })

      await redisRequest(`set/${encodeURIComponent(EVENTS_KEY)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload.events),
      })
      return response.status(200).json({ ok: true })
    }

    response.setHeader('Allow', 'GET, PUT')
    return response.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    return response.status(500).json({ error: error.message })
  }
}
