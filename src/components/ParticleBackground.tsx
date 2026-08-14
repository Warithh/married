import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/splitText'

type Props = {
  active: boolean
}

/**
 * Subtle floating gold particles with soft depth (bokeh-like size falloff).
 * Lazy-loaded Three.js only when `active` becomes true (after opening card).
 */
export function ParticleBackground({ active }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active || prefersReducedMotion()) return
    const canvas = canvasRef.current
    if (!canvas) return

    let disposed = false
    let raf = 0
    let cleanup: (() => void) | undefined

    void (async () => {
      const THREE = await import('three')
      if (disposed || !canvas) return

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'low-power',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
      renderer.setClearColor(0x000000, 0)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
      camera.position.z = 8

      const count = window.innerWidth < 768 ? 90 : 160
      const positions = new Float32Array(count * 3)
      const sizes = new Float32Array(count)
      const speeds = new Float32Array(count)

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 14
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10
        positions[i * 3 + 2] = (Math.random() - 0.5) * 8
        sizes[i] = 4 + Math.random() * 18
        speeds[i] = 0.08 + Math.random() * 0.22
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))

      const material = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.75) },
        },
        vertexShader: /* glsl */ `
          attribute float aSize;
          uniform float uTime;
          uniform float uPixelRatio;
          varying float vAlpha;
          void main() {
            vec3 p = position;
            p.y += sin(uTime * 0.35 + position.x * 0.4) * 0.25;
            p.x += cos(uTime * 0.22 + position.y * 0.3) * 0.15;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            float depth = clamp((-mv.z + 2.0) / 10.0, 0.15, 1.0);
            gl_PointSize = aSize * depth * uPixelRatio;
            vAlpha = 0.18 + depth.z * 0.04;
          }
        `,
        fragmentShader: /* glsl */ `
          varying float vAlpha;
          void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float d = length(uv);
            float soft = smoothstep(0.5, 0.0, d);
            float core = smoothstep(0.22, 0.0, d);
            vec3 gold = mix(vec3(0.55, 0.42, 0.18), vec3(0.92, 0.78, 0.42), core);
            gl_FragColor = vec4(gold, soft * clamp(vAlpha, 0.08, 0.45));
          }
        `,
      })

      const points = new THREE.Points(geometry, material)
      scene.add(points)

      const resize = () => {
        const w = window.innerWidth
        const h = window.innerHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h, false)
      }
      resize()
      window.addEventListener('resize', resize)

      const clock = new THREE.Clock()
      const tick = () => {
        if (disposed) return
        const t = clock.getElapsedTime()
        material.uniforms.uTime.value = t
        points.rotation.y = t * 0.02
        points.rotation.x = Math.sin(t * 0.08) * 0.04
        renderer.render(scene, camera)
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)

      cleanup = () => {
        cancelAnimationFrame(raf)
        window.removeEventListener('resize', resize)
        geometry.dispose()
        material.dispose()
        renderer.dispose()
      }
    })()

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      cleanup?.()
    }
  }, [active])

  if (!active || prefersReducedMotion()) {
    return <div className="particles particles--static" aria-hidden="true" />
  }

  return (
    <canvas
      ref={canvasRef}
      className="particles"
      aria-hidden="true"
    />
  )
}
