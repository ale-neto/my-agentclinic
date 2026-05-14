const styles: Record<string, string> = {
  ACTIVE: 'bg-green-100 text-green-800',
  INACTIVE: 'bg-gray-100 text-gray-600',
  UNDER_OBSERVATION: 'bg-yellow-100 text-yellow-800',
}

const labels: Record<string, string> = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  UNDER_OBSERVATION: 'Under Observation',
}

export function StatusBadge({ status }: { status: string }) {
  const cls = styles[status] ?? 'bg-gray-100 text-gray-600'
  return (
    <span className={`inline-block shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}>
      {labels[status] ?? status}
    </span>
  )
}
