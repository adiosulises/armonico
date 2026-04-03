export async function POST(req: Request) {
  const { email } = await req.json()
  if (!email) return Response.json({ error: 'Email required' }, { status: 400 })

  const res = await fetch(
    `https://${process.env.MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email_address: email, status: 'subscribed' }),
    }
  )

  if (!res.ok) {
    const data = await res.json()
    // 400 with title "Member Exists" means already subscribed
    if (data.title === 'Member Exists') 
      return Response.json({ error: 'Ya estás suscrito' }, { status: 400 })
    return Response.json({ error: 'Algo salió mal' }, { status: 500 })
  }

  return Response.json({ success: true })
}