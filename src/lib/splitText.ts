/** Split Arabic/Latin text into word spans for GSAP reveals (no letter-spacing). */

export function splitWords(el: HTMLElement): HTMLElement[] {
  if (el.dataset.split === 'words') {
    return Array.from(el.querySelectorAll<HTMLElement>('.word'))
  }

  const text = el.textContent?.trim() ?? ''
  el.textContent = ''
  el.dataset.split = 'words'

  const words = text.split(/\s+/).filter(Boolean)
  const nodes: HTMLElement[] = []

  words.forEach((word, i) => {
    const wrap = document.createElement('span')
    wrap.className = 'word-wrap'
    wrap.style.display = 'inline-block'
    wrap.style.overflow = 'hidden'
    wrap.style.verticalAlign = 'bottom'

    const span = document.createElement('span')
    span.className = 'word'
    span.style.display = 'inline-block'
    span.textContent = word
    wrap.appendChild(span)
    el.appendChild(wrap)
    nodes.push(span)

    if (i < words.length - 1) {
      el.appendChild(document.createTextNode(' '))
    }
  })

  return nodes
}

/** Character split using Intl.Segmenter when available — use sparingly on short names. */
export function splitChars(el: HTMLElement): HTMLElement[] {
  if (el.dataset.split === 'chars') {
    return Array.from(el.querySelectorAll<HTMLElement>('.char'))
  }

  const text = el.textContent?.trim() ?? ''
  el.textContent = ''
  el.dataset.split = 'chars'

  const segments =
    typeof Intl !== 'undefined' && 'Segmenter' in Intl
      ? Array.from(
          new Intl.Segmenter('ar', { granularity: 'grapheme' }).segment(text),
          (s) => s.segment,
        )
      : Array.from(text)

  const nodes: HTMLElement[] = []

  segments.forEach((ch) => {
    const wrap = document.createElement('span')
    wrap.className = 'char-wrap'
    wrap.style.display = 'inline-block'
    wrap.style.overflow = 'hidden'
    wrap.style.verticalAlign = 'bottom'

    const span = document.createElement('span')
    span.className = 'char'
    span.style.display = 'inline-block'
    span.textContent = ch === ' ' ? '\u00A0' : ch
    wrap.appendChild(span)
    el.appendChild(wrap)
    nodes.push(span)
  })

  return nodes
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}
