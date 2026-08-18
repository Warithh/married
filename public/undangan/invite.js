const WEDDING_AT = new Date(2026, 7, 23, 20, 0, 0).getTime()

function pad(n) {
  return String(Math.max(0, n)).padStart(2, '0')
}

function tick() {
  const diff = Math.max(0, WEDDING_AT - Date.now())
  const total = Math.floor(diff / 1000)
  const day = document.getElementById('day')
  const hour = document.getElementById('hour')
  const minute = document.getElementById('minute')
  const second = document.getElementById('second')
  if (!day) return
  day.textContent = pad(Math.floor(total / 86400))
  hour.textContent = pad(Math.floor((total % 86400) / 3600))
  minute.textContent = pad(Math.floor((total % 3600) / 60))
  second.textContent = pad(total % 60)
}

function wirePhoto(imgId, slotId) {
  const img = document.getElementById(imgId)
  const slot = document.getElementById(slotId)
  if (!img || !slot) return
  img.addEventListener('error', () => {
    img.classList.add('d-none')
    slot.classList.remove('d-none')
  })
}

function playPoem() {
  const audio = document.getElementById('wedding-audio')
  const toggle = document.getElementById('music-toggle')
  if (!audio || !toggle) return
  toggle.classList.remove('d-none')
  audio.volume = 0.5
  void audio.play().then(() => {
    toggle.classList.add('is-on')
    toggle.setAttribute('aria-label', 'إيقاف الصوت')
  }).catch(() => {
    toggle.classList.remove('is-on')
  })
}

document.getElementById('music-toggle')?.addEventListener('click', () => {
  const audio = document.getElementById('wedding-audio')
  const toggle = document.getElementById('music-toggle')
  if (!audio || !toggle) return
  if (audio.paused) {
    void audio.play().then(() => toggle.classList.add('is-on'))
  } else {
    audio.pause()
    toggle.classList.remove('is-on')
  }
})

document.getElementById('open-invite')?.addEventListener('click', () => {
  const welcome = document.getElementById('welcome')
  const root = document.getElementById('root')
  welcome.style.opacity = '0'
  welcome.style.pointerEvents = 'none'
  root.classList.add('ready')
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
  playPoem()
  window.setTimeout(() => {
    welcome.style.display = 'none'
  }, 400)
})

wirePhoto('welcome-photo', 'welcome-photo-slot')
wirePhoto('home-photo', 'home-photo-slot')

document.documentElement.style.overflow = 'hidden'
document.body.style.overflow = 'hidden'
tick()
window.setInterval(tick, 1000)
