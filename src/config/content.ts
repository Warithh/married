/** Editable invitation content — change these to update the whole site */
export const content = {
  brideName: 'زينب',
  groomName: 'وارث',
  monogram: 'زو',
  coverTitle: 'دعوة زفاف',
  coverTo: 'إلى من يهمه الأمر',
  coverGuest: 'الضيف الكريم',
  coverMessage:
    'بكل فرح ومحبة نتشرف بدعوتكم لحضور حفل زفافنا ومشاركتنا فرحتنا',
  openInvite: 'افتح الدعوة',
  inviteText:
    'تتشرف زينب بدعوتكم لمشاركتها فرحتها، ولحضور حفل زفافها على وارث',
  weddingDate: '2026-08-23T20:00:00',
  venueName: 'قاعة دايموند',
  venueAddress: 'حي الشهداء',
  eventTitle: 'تفاصيل الحفل',
  eventSubtitle: 'ننتظر حضوركم في يومنا السعيد',
  quote:
    'نسأل الله أن يبارك لنا ويجمعنا على الخير والبركة',
  quoteLabel: 'بسم الله الرحمن الرحيم',
  rsvpTitle: 'تأكيد الحضور',
  rsvpHint: 'اضغط للتأكيد — مرة واحدة فقط',
  rsvpLabel: 'تأكيد الحضور',
  rsvpDone: 'تم التأكيد',
  closingTitle: 'شكراً لكم',
  closingLine: 'حضوركم تمام فرحتنا',
} as const

export const weddingDate = new Date(content.weddingDate)

export function formatDateAr(date: Date) {
  return new Intl.DateTimeFormat('ar', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatTimeAr(date: Date) {
  return new Intl.DateTimeFormat('ar', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date)
}
