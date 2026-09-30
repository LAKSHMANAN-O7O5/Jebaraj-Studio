import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export interface FloatingPhotoBackgroundProps {
  images: string[]
  onActiveChange?: (index: number) => void
  className?: string
}

// Ensure Unsplash URLs bypass browser CORS cache poisoning
const prepareCorsUrl = (url: string): string => {
  if (url.includes('unsplash.com') && !url.includes('cors=')) {
    const sep = url.includes('?') ? '&' : '?'
    return `${url}${sep}cors=1`
  }
  return url
}

export const FloatingPhotoBackground: React.FC<FloatingPhotoBackgroundProps> = ({
  images,
  onActiveChange,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [webGlError, setWebGlError] = useState(false)

  // Track target active index & active float internally
  const targetActiveRef = useRef<number>(0)
  const currentActiveRef = useRef<number>(0)
  const lastEmittedActiveRef = useRef<number>(-1)

  // User interaction & autoplay control
  const isInteractingRef = useRef<boolean>(false)
  const idleTimerRef = useRef<number | null>(null)
  const isVisibleRef = useRef<boolean>(true)
  const animFrameIdRef = useRef<number | null>(null)

  // Pointer position for parallax
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const isMobileRef = useRef<boolean>(false)

  // Dragging state
  const dragRef = useRef<{
    isDragging: boolean
    startX: number
    startActive: number
    pointerId: number | null
  }>({
    isDragging: false,
    startX: 0,
    startActive: 0,
    pointerId: null,
  })

  // WebGL Availability check
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) {
        setWebGlError(true)
      }
    } catch {
      setWebGlError(true)
    }
  }, [])

  // Device detection
  useEffect(() => {
    const checkMobile = () => {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches
      const isSmall = window.innerWidth < 768
      isMobileRef.current = isCoarse || isSmall
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Main Three.js Scene Setup & Animation Loop
  useEffect(() => {
    const container = containerRef.current
    if (!container || webGlError || images.length === 0) return

    let renderer: THREE.WebGLRenderer | null = null
    let scene: THREE.Scene | null = null
    let camera: THREE.PerspectiveCamera | null = null
    let photoGroup: THREE.Group | null = null

    const meshes: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[] = []
    const textures: THREE.Texture[] = []
    const geometries: THREE.BufferGeometry[] = []
    const materials: THREE.Material[] = []

    try {
      // 1. Scene, Camera & Renderer setup
      scene = new THREE.Scene()
      photoGroup = new THREE.Group()
      scene.add(photoGroup)

      const width = container.clientWidth || window.innerWidth
      const height = container.clientHeight || window.innerHeight

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
      camera.position.set(0, 0, 7.5)

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })

      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobileRef.current ? 1.5 : 2))
      renderer.setSize(width, height)
      renderer.setClearColor(0x000000, 0)

      const canvas = renderer.domElement
      canvas.setAttribute('aria-hidden', 'true')
      canvas.style.position = 'absolute'
      canvas.style.top = '0'
      canvas.style.left = '0'
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      canvas.style.pointerEvents = 'none'

      container.appendChild(canvas)

      // 2. Texture Loader & Mesh creation
      const textureLoader = new THREE.TextureLoader()
      textureLoader.setCrossOrigin('anonymous')

      const baseHeight = 2.1
      const defaultAspect = 1.33

      images.forEach((url) => {
        const planeGeo = new THREE.PlaneGeometry(1, 1)
        geometries.push(planeGeo)

        const material = new THREE.MeshBasicMaterial({
          transparent: true,
          opacity: 1,
          depthWrite: false,
          color: new THREE.Color(1, 1, 1),
        })
        materials.push(material)

        const mesh = new THREE.Mesh(planeGeo, material)
        mesh.scale.set(baseHeight * defaultAspect, baseHeight, 1)
        mesh.visible = false // Hide until texture successfully loads
        mesh.userData = { aspect: defaultAspect, loaded: false }

        photoGroup?.add(mesh)
        meshes.push(mesh)

        const corsUrl = prepareCorsUrl(url)

        textureLoader.load(
          corsUrl,
          (tex) => {
            tex.colorSpace = THREE.SRGBColorSpace
            tex.minFilter = THREE.LinearFilter
            tex.magFilter = THREE.LinearFilter
            tex.needsUpdate = true
            textures.push(tex)

            material.map = tex
            material.needsUpdate = true
            mesh.visible = true
            mesh.userData.loaded = true

            // Set natural aspect ratio
            if (tex.image && tex.image.width && tex.image.height) {
              const imgAspect = tex.image.width / tex.image.height
              mesh.userData.aspect = imgAspect
              mesh.scale.set(baseHeight * imgAspect, baseHeight, 1)
            }
          },
          undefined,
          (err) => {
            console.warn(`[FloatingPhotoBackground] Failed to load texture for ${url}:`, err)
            mesh.visible = false
          }
        )
      })

      // 3. Resize Observer
      const handleResize = () => {
        if (!container || !renderer || !camera) return
        const w = container.clientWidth || window.innerWidth
        const h = container.clientHeight || window.innerHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobileRef.current ? 1.5 : 2))
      }

      const resizeObserver = new ResizeObserver(() => handleResize())
      resizeObserver.observe(container)

      // 4. Intersection Observer for Pause on Offscreen
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisibleRef.current = entry.isIntersecting
          })
        },
        { threshold: 0.05 }
      )
      observer.observe(container)

      // 5. WebGL Context Loss listener
      const handleContextLost = (e: Event) => {
        e.preventDefault()
        setWebGlError(true)
      }
      canvas.addEventListener('webglcontextlost', handleContextLost, false)

      // 6. Animation Loop
      let startTime = performance.now()

      const animate = (now: number) => {
        animFrameIdRef.current = requestAnimationFrame(animate)

        if (!isVisibleRef.current || document.hidden || !scene || !camera || !renderer || !photoGroup) {
          return
        }

        const elapsedTime = (now - startTime) * 0.001

        // Smooth active float damping
        const target = targetActiveRef.current
        const diff = target - currentActiveRef.current
        currentActiveRef.current += diff * 0.08

        const currentActive = currentActiveRef.current

        // Check if active index changed to trigger callback
        const roundedIndex = Math.max(0, Math.min(images.length - 1, Math.round(currentActive)))
        if (Math.abs(currentActive - roundedIndex) < 0.15 && roundedIndex !== lastEmittedActiveRef.current) {
          lastEmittedActiveRef.current = roundedIndex
          if (onActiveChange) {
            onActiveChange(roundedIndex)
          }
        }

        const isMobile = isMobileRef.current

        // Position Group to shift active photo to ~68% of viewport width on desktop
        const visibleWidthAtZ0 = 2 * Math.tan((45 * Math.PI) / 360) * 7.5 * camera.aspect
        const desktopGroupX = visibleWidthAtZ0 * 0.18 // 50% + 18% = 68% of screen width
        photoGroup.position.x = isMobile ? 0 : desktopGroupX

        // Photo Spacing
        const spacing = isMobile ? 1.8 : 2.25

        // Position & Rotate Meshes in Scene Arc
        meshes.forEach((mesh, index) => {
          if (!mesh.userData.loaded) {
            mesh.visible = false
            return
          }

          const d = index - currentActive
          const absD = Math.abs(d)

          // Only show 3 photos: active photo (d=0) and one on each side (d=-1 and d=1)
          if (absD > 1.25) {
            mesh.visible = false
            return
          }
          mesh.visible = true

          // Arc Layout math
          const x = d * spacing
          const z = -Math.min(absD, 2.5) * 0.85
          const rotY = -d * 0.32

          // Center photo scale 1.05, side photos scale 0.75
          const centerFactor = Math.max(0, 1 - absD)
          const baseScale = 0.75 + 0.30 * centerFactor

          // Float drift & wobble (disabled if reduced motion)
          let driftY = 0
          let wobbleZ = 0
          if (!prefersReducedMotion) {
            driftY = Math.sin(elapsedTime * 1.1 + index * 1.6) * 0.06
            wobbleZ = Math.cos(elapsedTime * 0.85 + index * 1.2) * 0.02
          }

          mesh.position.x = x
          mesh.position.y = driftY
          mesh.position.z = z

          mesh.rotation.x = 0
          mesh.rotation.y = rotY
          mesh.rotation.z = wobbleZ

          // Scale
          const imgAspect = mesh.userData.aspect || defaultAspect
          const targetH = baseHeight * baseScale
          const targetW = targetH * imgAspect
          mesh.scale.set(targetW, targetH, 1)

          // Brightness & Opacity Rules:
          // - Center photo (d=0): full brightness (1.0)
          // - Side photos: brightness falloff minimum 0.55
          // - Material opacity: 1.0 for visible photos on desktop; 0.4 on mobile behind text
          const brightness = Math.max(0.55, 1.0 - absD * 0.45)
          mesh.material.color.setRGB(brightness, brightness, brightness)
          mesh.material.opacity = isMobile ? 0.4 : 1.0
        })

        // Camera Parallax (Desktop & standard motion only)
        if (!isMobile && !prefersReducedMotion) {
          const targetCamX = mousePosRef.current.x * 0.5
          const targetCamY = mousePosRef.current.y * 0.3
          camera.position.x += (targetCamX - camera.position.x) * 0.05
          camera.position.y += (targetCamY - camera.position.y) * 0.05
        } else {
          camera.position.x += (0 - camera.position.x) * 0.05
          camera.position.y += (0 - camera.position.y) * 0.05
        }
        camera.lookAt(0, 0, 0)

        renderer.render(scene, camera)
      }

      animFrameIdRef.current = requestAnimationFrame(animate)

      // Clean up Function
      return () => {
        if (animFrameIdRef.current !== null) {
          cancelAnimationFrame(animFrameIdRef.current)
        }
        resizeObserver.disconnect()
        observer.disconnect()
        canvas.removeEventListener('webglcontextlost', handleContextLost)

        // Dispose Three.js objects
        geometries.forEach((g) => g.dispose())
        materials.forEach((m) => m.dispose())
        textures.forEach((t) => t.dispose())

        if (renderer) {
          renderer.dispose()
          renderer.forceContextLoss()
          if (canvas.parentNode) {
            canvas.parentNode.removeChild(canvas)
          }
        }
      }
    } catch {
      setWebGlError(true)
    }
  }, [images, prefersReducedMotion, webGlError, onActiveChange])

  // Reset Idle Timer & Resume Autoplay after 3s idle
  const resetIdleTimer = () => {
    isInteractingRef.current = true
    if (idleTimerRef.current !== null) {
      window.clearTimeout(idleTimerRef.current)
    }
    idleTimerRef.current = window.setTimeout(() => {
      isInteractingRef.current = false
    }, 3000)
  }

  // Autoplay (every 4.5s)
  useEffect(() => {
    if (prefersReducedMotion || images.length <= 1) return

    const interval = window.setInterval(() => {
      if (!isInteractingRef.current && isVisibleRef.current && !document.hidden) {
        targetActiveRef.current = (Math.round(targetActiveRef.current) + 1) % images.length
      }
    }, 4500)

    return () => window.clearInterval(interval)
  }, [images.length, prefersReducedMotion])

  // Mouse move for Camera Parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobileRef.current || prefersReducedMotion) return
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      mousePosRef.current = { x, y }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [prefersReducedMotion])

  // Keyboard navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        resetIdleTimer()
        targetActiveRef.current = Math.max(0, Math.round(targetActiveRef.current) - 1)
      } else if (e.key === 'ArrowRight') {
        resetIdleTimer()
        targetActiveRef.current = Math.min(images.length - 1, Math.round(targetActiveRef.current) + 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [images.length])

  // Pointer drag/swipe interaction
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    resetIdleTimer()
    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startActive: targetActiveRef.current,
      pointerId: e.pointerId,
    }
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId)
    }
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.isDragging) return
    resetIdleTimer()
    const dx = e.clientX - dragRef.current.startX
    const containerW = containerRef.current?.clientWidth || window.innerWidth
    const sensitivity = 2.4
    const deltaActive = -(dx / containerW) * sensitivity
    const newActive = dragRef.current.startActive + deltaActive
    targetActiveRef.current = Math.max(-0.4, Math.min(images.length - 0.6, newActive))
  }

  const handlePointerUpOrCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.isDragging) return
    if (dragRef.current.pointerId !== null && containerRef.current) {
      try {
        containerRef.current.releasePointerCapture(dragRef.current.pointerId)
      } catch {
        // Safe fallback if pointer capture was lost
      }
    }
    dragRef.current.isDragging = false
    dragRef.current.pointerId = null

    // Snap to nearest integer photo
    targetActiveRef.current = Math.max(0, Math.min(images.length - 1, Math.round(targetActiveRef.current)))
    resetIdleTimer()
  }

  // Horizontal Wheel Handler (does NOT block vertical scroll)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let wheelSnapTimer: number | null = null

    const handleWheel = (e: WheelEvent) => {
      const absX = Math.abs(e.deltaX)
      const absY = Math.abs(e.deltaY)

      // Only hijack if horizontal scroll is dominant
      if (absX > absY || e.shiftKey) {
        e.preventDefault()
        resetIdleTimer()

        const scrollDelta = (e.shiftKey ? e.deltaY : e.deltaX) * 0.0025
        targetActiveRef.current = Math.max(-0.4, Math.min(images.length - 0.6, targetActiveRef.current + scrollDelta))

        if (wheelSnapTimer !== null) {
          window.clearTimeout(wheelSnapTimer)
        }
        wheelSnapTimer = window.setTimeout(() => {
          targetActiveRef.current = Math.max(0, Math.min(images.length - 1, Math.round(targetActiveRef.current)))
        }, 150)
      }
      // If vertical scroll is dominant (absY >= absX), we do nothing and let default page scroll happen!
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      container.removeEventListener('wheel', handleWheel)
      if (wheelSnapTimer !== null) window.clearTimeout(wheelSnapTimer)
    }
  }, [images.length])

  // Fallback view if WebGL is unavailable or context lost
  if (webGlError) {
    return (
      <div className={`absolute inset-0 z-0 overflow-hidden ${className}`}>
        <img
          src={images[0]}
          alt="Hero background photo fallback"
          className="w-full h-full object-cover blur-sm opacity-35 scale-105"
        />
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUpOrCancel}
      onPointerCancel={handlePointerUpOrCancel}
      className={`absolute inset-0 z-0 overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing select-none ${className}`}
    />
  )
}

export default FloatingPhotoBackground
