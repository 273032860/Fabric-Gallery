import { create } from "zustand"

export const useAppStore = create((set, get) => ({
  // === 加载状态 ===
  isLoading: true,
  loadingProgress: 0,
  setLoading: (loading) => set({ isLoading: loading }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setLoadingProgress: (progress) => set({ loadingProgress: progress }),

  // === UI状态 ===
  showUI: true,
  isMenuOpen: false,
  isLeftTopOpen: false,
  isLeftBottomOpen: false,
  setLeftBottom: (open) => set({ isLeftBottomOpen: open }),
  isFullscreen: false,
  showInfo: true,
  activePanel: "home",
  setShowUI: (show) => set({ showUI: show }),
  setActivePanel: (panel) => set({ activePanel: panel }),
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  toggleLeftTop: () => set((state) => ({ isLeftTopOpen: !state.isLeftTopOpen })),
  setFullscreen: (fullscreen) => set({ isFullscreen: fullscreen }),
  toggleInfo: () => set((state) => ({ showInfo: !state.showInfo })),

  // === 滚动控制状态 ===
  currentPage: 0,
  totalPages: 5,
  scrollProgress: 0,
  isScrolling: false,
  setCurrentPage: (page) => set({ currentPage: page }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setIsScrolling: (scrolling) => set({ isScrolling: scrolling }),

  // === 3D场景状态 ===
  sceneReady: false,
  cameraPosition: [0, 0, 5],
  meshRotation: [0, 0, 0],
  sceneRotation: 0,
  animationSpeed: 1,
  setSceneReady: (ready) => set({ sceneReady: ready }),
  setCameraPosition: (position) => set({ cameraPosition: position }),
  setMeshRotation: (rotation) => set({ meshRotation: rotation }),
  setSceneRotation: (rotation) => set({ sceneRotation: rotation }),
  setAnimationSpeed: (speed) => set({ animationSpeed: speed }),

  // === 用户交互 ===
  userInteracted: false,
  lastInteraction: null,
  setUserInteracted: (interacted) =>
    set({
      userInteracted: interacted,
      lastInteraction: interacted ? Date.now() : null,
    }),

  // === 用户偏好设置 ===
  soundEnabled: true,
  qualityLevel: "high",
  theme: "dark",
  quality: "high",
  enableAnimations: true,
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
  setQualityLevel: (level) => set({ qualityLevel: level }),
  setTheme: (theme) => set({ theme }),
  setQuality: (quality) => set({ quality }),
  toggleAnimations: () => set((state) => ({ enableAnimations: !state.enableAnimations })),

  // === 动作方法 ===
  resetScene: () =>
    set({
      cameraPosition: [0, 0, 5],
      meshRotation: [0, 0, 0],
      sceneRotation: 0,
      animationSpeed: 1,
      activePanel: "home",
      currentPage: 0,
    }),

  resetView: () =>
    set({
      cameraPosition: [0, 0, 5],
      meshRotation: [0, 0, 0],
      animationSpeed: 1,
    }),

  // === 初始化应用 ===
  initialize: () => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        progress = 100
        set({ loadingProgress: progress, isLoading: false, sceneReady: true })
        clearInterval(interval)
      } else {
        set({ loadingProgress: progress })
      }
    }, 200)
  },

  initializeApp: () => {
    const interval = setInterval(() => {
      const currentProgress = get().loadingProgress
      if (currentProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          set({ isLoading: false, sceneReady: true })
        }, 500)
        return
      }
      set({ loadingProgress: currentProgress + Math.random() * 15 })
    }, 200)
  },
}))