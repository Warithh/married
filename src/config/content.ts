const base = import.meta.env.BASE_URL

export const img = {
  hero: `${base}images/hero.jpg`,
  cover: `${base}images/cover.jpg`,
  event: `${base}images/event.jpg`,
  gallery: [
    `${base}images/gallery-1.jpg`,
    `${base}images/gallery-2.jpg`,
    `${base}images/gallery-3.jpg`,
    `${base}images/gallery-4.jpg`,
    `${base}images/gallery-5.jpg`,
    `${base}images/gallery-6.jpg`,
  ],
  story: [
    `${base}images/story-1.jpg`,
    `${base}images/story-2.jpg`,
    `${base}images/story-3.jpg`,
  ],
}

export const audioUrl = `${base}audio/wedding.mp3`

/** Editable invitation content */
export const content = {
  brideName: 'زينب',
  groomName: 'وارث',
  monogram: 'زو',

  coverTitle: 'دعوة زفاف',
  coverTo: 'إلى من يهمه الأمر',
  coverGuest: 'الضيف الكريم',
  coverMessage:
    'بقلوبٍ ممتلئة فرحاً وامتناناً، نتشرف بدعوتكم لتشريفنا بحضور حفل زفافنا، ومشاركتنا أجمل لحظات العمر.',
  openWithMusic: 'افتح الدعوة مع الموسيقى',
  openSilent: 'افتح بدون موسيقى',

  heroEyebrow: 'حفل زفاف',
  scrollHint: 'مرّر للاحتفال',

  quoteLabel: 'بسم الله الرحمن الرحيم',
  quote:
    '﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ﴾',
  quoteSource: 'سورة الروم · آية ٢١',
  inviteText:
    'تتشرف زينب بدعوتكم لمشاركتها فرحتها، ولحضور حفل زفافها على وارث.',

  familyTitle: 'العائلة الكريمة',
  familySubtitle: 'ببركة الأهل ومحبتهم نبدأ رحلتنا معاً',
  groomSide: 'عائلة العريس',
  brideSide: 'عائلة العروس',
  groomParents: 'عائلة السيد وارث',
  brideParents: 'عائلة الآنسة زينب',

  storyTitle: 'قصتنا',
  storySubtitle: 'خطواتٌ صغيرة قادتنا إلى هذا اليوم العظيم',
  stories: [
    {
      title: 'بداية التعارف',
      date: 'فصلٌ من الأقدار',
      text: 'جمعتنا الأقدار على طريقٍ واحد، فكان اللقاء بداية حكايةٍ كتبها الله بلطفه.',
      image: img.story[0],
    },
    {
      title: 'نمو المودة',
      date: 'أيامٌ من الطمأنينة',
      text: 'نمت بيننا مودةٌ صادقة، وصار القلبُ يجد سكينته في صحبةٍ يباركها الدعاء.',
      image: img.story[1],
    },
    {
      title: 'عقد النية على الخير',
      date: 'على بركة الله',
      text: 'وبتوكّلٍ على الله اخترنا أن نكمل الطريق معاً، عائلةً واحدة تحت ظل رحمته.',
      image: img.story[2],
    },
  ],

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

  galleryTitle: 'لحظات من الفرح',
  gallerySubtitle: 'تفاصيلٌ ناعمة تزيّن يومنا دون ضجيج',

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

export function calendarUrl(date: Date) {
  const end = new Date(date.getTime() + 4 * 60 * 60 * 1000)
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `زفاف ${content.brideName} و${content.groomName}`,
    dates: `${fmt(date)}/${fmt(end)}`,
    details: content.inviteText,
    location: `${content.venueName}، ${content.venueAddress}`,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
