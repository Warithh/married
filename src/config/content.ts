const base = import.meta.env.BASE_URL

export const img = {
  hero: `${base}images/hero.jpg`,
  cover: `${base}images/cover.jpg`,
  event: `${base}images/event.jpg`,
}

/** ضع هنا ملف: زواج النور — باسم الكربلائي */
export const audioUrl = `${base}audio/wedding.mp3`

/** Editable invitation content */
export const content = {
  brideName: 'العلوية زينب',
  groomName: 'السيد وارث',
  brideShort: 'زينب',
  groomShort: 'وارث',

  coverTitle: 'Wedding Invitation',
  coverGuest: 'الضيف الكريم',
  coverMessage:
    'بقلوبٍ ممتلئة فرحاً وامتناناً، نتشرف بدعوتكم لتشريفنا بحضور حفل زفافنا، ومشاركتنا أجمل لحظات العمر.',
  openInvite: 'افتح الدعوة',

  heroEyebrow: 'حفل زفاف',
  scrollHint: 'مرّر للاحتفال',

  quoteLabel: 'بسم الله الرحمن الرحيم',
  quote:
    '﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ﴾',
  quoteSource: 'سورة الروم · آية ٢١',
  inviteText:
    'تتشرف العلوية زينب بدعوتكم لمشاركتها فرحتها، ولحضور حفل زفافها على السيد وارث.',

  familyTitle: 'العائلة الكريمة',
  familySubtitle: 'ببركة الأهل ومحبتهم نبدأ رحلتنا معاً',
  groomSide: 'عائلة العريس',
  brideSide: 'عائلة العروس',
  groomParents: 'عائلة السيد وارث',
  brideParents: 'عائلة العلوية زينب',

  eventTitle: 'الموعد والمكان',
  eventSubtitle: 'يسعدنا حضوركم في يومنا السعيد',
  eventName: 'حفل الزفاف',
  weddingDate: '2026-08-23T20:00:00',
  venueName: 'قاعة دايموند',
  venueAddress: 'حي الشهداء',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('قاعة دايموند حي الشهداء'),
  mapsLabel: 'فتح موقع القاعة على الخريطة',

  rsvpTitle: 'تأكيد الحضور',
  rsvpSubtitle: 'وجودكم يُكمل بهجة اليوم',
  rsvpNamePlaceholder: 'اسمك الكريم',
  rsvpAttend: 'سأحضر بعون الله',
  rsvpAbsent: 'أعتذر عن الحضور',
  rsvpSubmit: 'إرسال التأكيد',
  rsvpDone: 'تم استلام تأكيدك، شكراً لطفك',
  rsvpHint: 'يمكنك التأكيد مرة واحدة من هذا المتصفح',

  wishesTitle: 'الدعاء والتهاني',
  wishesSubtitle: 'اتركوا لنا كلماتٍ من الدعاء والمحبة',
  wishesNamePlaceholder: 'اسمك',
  wishesTextPlaceholder: 'اكتب دعاءك أو تهنئتك هنا...',
  wishesSubmit: 'إرسال',

  giftTitle: 'هديتكم حضوركم',
  giftText:
    'أعظم ما نرجوه هو تشريفكم لنا بحضوركم الكريم. دعاؤكم ومحبتكم أغلى من أي هدية.',

  reminderTitle: 'تذكير لطيف',
  reminderText: 'احفظوا الموعد في تقويمكم، وكونوا جزءًا من فرحتنا.',
  calendarLabel: 'إضافة إلى التقويم',

  closingTitle: 'شكراً من القلب',
  closingLine: 'نسأل الله أن يجمعنا على خير، وأن يُتمّ فرحتنا بحضوركم.',
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

export function buildCalendarIcs(date: Date) {
  const end = new Date(date.getTime() + 4 * 60 * 60 * 1000)
  const stamp = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const escape = (s: string) =>
    s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invite//AR//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-${stamp(date)}@married`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(date)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${escape(`زفاف ${content.brideShort} و${content.groomShort}`)}`,
    `DESCRIPTION:${escape(content.inviteText)}`,
    `LOCATION:${escape(`${content.venueName}، ${content.venueAddress}`)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

export function downloadCalendarEvent(date: Date) {
  const ics = buildCalendarIcs(date)
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'wedding.ics'
  document.body.appendChild(a)
  a.click()
  a.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1500)
}
