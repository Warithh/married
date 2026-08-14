/** Editable invitation content — change these to update the whole site */
export const content = {
  brideName: 'زينب',
  groomName: 'وارث',
  monogram: 'زو',
  inviteText:
    'تتشرف زينب بدعوتكم لمشاركتها فرحتها، ولحضور حفل زفافها على وارث',
  weddingDate: '2026-08-23T20:00:00',
  venueName: 'قاعة دايموند',
  venueAddress: 'حي الشهداء',
  loveStory: [
    'بسم الله الرحمن الرحيم',
    'وعلى بركة الله نبدأ فصلاً جديداً من حياتنا',
    'نسأل الله أن يبارك لنا ويجمعنا على الخير',
    'حضوركم تمام فرحتنا',
  ],
  rsvpLabel: 'تأكيد الحضور',
  rsvpDone: 'تم التأكيد',
  closingLine: 'ننتظركم',
} as const

export const weddingDate = new Date(content.weddingDate)
