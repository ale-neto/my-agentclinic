const styles: Record<string, string> = {
  LOW: 'bg-blue-100 text-blue-700',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  HIGH: 'bg-orange-100 text-orange-800',
  CRITICAL: 'bg-red-100 text-red-800',
}

type Props = { severity: string }

export function SeverityBadge({ severity }: Props) {
  const cls = styles[severity] ?? 'bg-gray-100 text-gray-600'
  return (
    <span className={`inline-block shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}>
      {severity}
    </span>
  )
}
