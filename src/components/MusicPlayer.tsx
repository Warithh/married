type Props = { playing: boolean; onToggle: () => void }

export function MusicPlayer({ playing, onToggle }: Props) {
  return (
    <button
      type="button"
      className={`music-fab${playing ? ' music-fab--on' : ''}`}
      onClick={onToggle}
      aria-label={playing ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'}
    >
      {playing ? '♪' : '🔇'}
    </button>
  )
}
