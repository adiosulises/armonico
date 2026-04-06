import { getEventByHandle, formatDate, formatTime } from '../lib/shopify'
import { notFound } from 'next/navigation'
import EventPageClient from './EventPageClient'

export default async function EventPage({ params }: { params: Promise<{ eventname: string }> }) {
  const { eventname } = await params
  const event = await getEventByHandle(eventname)
  if (!event) notFound()

  return (
    <EventPageClient
      title={event.title}
      support={event.support}
      actos={event.actos}
      orden={event.orden}
      reglas={event.reglas}
      date={formatDate(event.evey.start_at)}
      time={formatTime(event.evey.start_at)}
      description={event.description}
      flyer={event.flyer}
      variants={event.variants}
      storeDomain={process.env.SHOPIFY_STORE_DOMAIN!}
    />
  )
}
