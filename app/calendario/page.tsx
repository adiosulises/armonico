import Calendario from '../components/Calendario'
import { getEvents, formatDate, MONTH_FULL } from '../lib/shopify'

export default async function CalendarioPage() {
  const rawEvents = await getEvents()

  const events = rawEvents.map(e => ({
    date: formatDate(e.evey.start_at),
    title: e.title,
    month: MONTH_FULL[parseInt(e.evey.start_at.split('T')[0].split('-')[1], 10) - 1],
  }))

  return <Calendario events={events} />
}
