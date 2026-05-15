import { Badge } from '@/components/Badge'
import type { Severity } from '@/lib/ailments'

type Props = { severity: string }

const styles: Record<Severity, string> = {
  LOW: 'bg-blue-100 text-blue-700',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  HIGH: 'bg-orange-100 text-orange-800',
  CRITICAL: 'bg-red-100 text-red-800',
}

export function SeverityBadge({ severity }: Props) {
  return <Badge value={severity} styles={styles} />
}
