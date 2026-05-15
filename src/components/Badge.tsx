type Props = {
  value: string
  styles: Record<string, string>
  labels?: Record<string, string>
}

function humanize(value: string): string {
  return value
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase())
}

export function Badge({ value, styles, labels }: Props) {
  const cls = styles[value] ?? 'bg-gray-100 text-gray-600'
  const label = labels?.[value] ?? humanize(value)
  return (
    <span className={`inline-block shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}>
      {label}
    </span>
  )
}
