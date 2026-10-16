export function SamplePhoto({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <rect width="80" height="80" fill="#DCE8D4" />
        <rect x="14" y="30" width="14" height="38" rx="5" fill="#2E7D32" />
        <rect x="18" y="20" width="6" height="12" fill="#2E7D32" />
        <rect x="34" y="40" width="16" height="28" rx="3" fill="#90A4AE" />
        <rect x="56" y="34" width="12" height="34" rx="4" fill="#1351B4" opacity=".8" />
        <rect y="68" width="80" height="12" fill="#BCA98A" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 80 80" className="w-full h-full">
      <rect width="80" height="80" fill="#D9E3F3" />
      <path d="M20 68 Q12 40 28 30 L36 22 L44 22 L52 30 Q68 40 60 68Z" fill="#0C326F" />
      <rect x="34" y="17" width="12" height="7" rx="2" fill="#FFCD07" />
      <rect y="68" width="80" height="12" fill="#BCA98A" />
    </svg>
  );
}
