import { Badge } from '@/components/Badge'
import type { AppointmentStatus } from '@/lib/appointments'

type Props = { status: string }

const styles: Record<AppointmentStatus, string> = {
  SCHEDULED: 'bg-indigo-100 text-indigo-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-gray-100 text-gray-500',
}

export function AppointmentStatusBadge({ status }: Props) {
  return <Badge value={status} styles={styles} />
}
