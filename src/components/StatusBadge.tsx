import { Badge } from '@/components/Badge'
import type { AgentStatus } from '@/lib/agents'

type Props = { status: string }

const styles: Record<AgentStatus, string> = {
  ACTIVE: 'bg-green-100 text-green-800',
  INACTIVE: 'bg-gray-100 text-gray-600',
  UNDER_OBSERVATION: 'bg-yellow-100 text-yellow-800',
}

const labels: Record<AgentStatus, string> = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  UNDER_OBSERVATION: 'Under Observation',
}

export function StatusBadge({ status }: Props) {
  return <Badge value={status} styles={styles} labels={labels} />
}
