export const event = {
  bismillah: 'بسم الله الرحمن الرحيم',
  inviteLine: 'يدعوكم',
  hostName: 'السيد محمد رضا العوادي',
  occasionLine: 'لحضور حناء وزفاف ولده',
  willOfGodLine: 'وذلك بمشيئة الله تعالى',
  groomLabel: 'العريس',
  groomName: 'وارث محمد رضا العوادي',
  dateLabel: 'الأحد، ٢٣ أغسطس ٢٠٢٦',
  timeLabel: 'الثامنة مساءً',
  venue: 'قاعة كهرمانة',
  district: 'حي الجامعة',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('قاعة كهرمانة حي الجامعة'),
  thanksLine: 'حضوركم يزيدنا فرحاً وسروراً',
} as const

export const pages = [
  { path: '/', id: 'invite' },
  { path: '/name', id: 'name' },
  { path: '/date', id: 'date' },
  { path: '/time', id: 'time' },
  { path: '/venue', id: 'venue' },
  { path: '/thanks', id: 'thanks' },
  { path: '/map', id: 'map' },
] as const

export type PagePath = (typeof pages)[number]['path']

export function getAdjacent(path: string) {
  const index = pages.findIndex((page) => page.path === path)
  return {
    index,
    current: index >= 0 ? pages[index] : null,
    prev: index > 0 ? pages[index - 1].path : null,
    next: index >= 0 && index < pages.length - 1 ? pages[index + 1].path : null,
    total: pages.length,
  }
}
