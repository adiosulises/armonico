import Calendario from '../components/CalendarioUlises'
import { getEvents, formatDate, MONTH_FULL } from '../lib/shopify'

export default async function CalendarioPage() {
  const rawEvents = await getEvents()

  const events = rawEvents.map(e => ({
    date: formatDate(e.evey.start_at),
    title: e.title,
    slug: e.handle,
    month: MONTH_FULL[parseInt(e.evey.start_at.split('T')[0].split('-')[1], 10) - 1],
  }))

  return <Calendario events={events} />
}
