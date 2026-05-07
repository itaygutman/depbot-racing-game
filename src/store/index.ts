import { createRef } from 'react'
import { Euler, Quaternion, Vector3, SRGBColorSpace } from 'three'
import type { WebGLRenderer } from 'three'
import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

import type { Camera, MutableRefObject } from 'react'

export type Controls = {
  backward: boolean
  brake: boolean
  boost: boolean
  forward: boolean
  left: boolean
  reset: boolean
  right: boolean
}

export const levelLayer = 1

export const angularVelocity = [0, 0.5, 0]
export const position = [-110, 0.75, 220]
export const rotation = [0, Math.PI / 2 + 0.35, 0]

export const booleans = ['checkpoint', 'debug', 'editor', 'map', 'shadows', 'sound', 'stats'] as const
export type BooleanKeys = typeof booleans[number]

type Getter = () => IStore
type Setter = (fn: (draft: IStore) => void) => void

export const mutation: {
  boost: number
  rpmTarget: number
  sliding: boolean
  speed: number
  velocity: [number, number, number]
} = {
  boost: 0,
  rpmTarget: 0,
  sliding: false,
  speed: 0,
  velocity: [0, 0, 0],
}

export interface IStore {
  actions: {
    onCheckpoint: () => void
    onFinish: () => void
    onStart: () => void
    reset: () => void
    setColor: (color: string) => void
    setDpr: (dpr: number) => void
    setEditor: (editor: boolean) => void
    setPlayerName: (name: string) => void
    setRenderer: (renderer: WebGLRenderer) => void
    sound: () => void
    toggleEditor: () => void
    toggleShadows: () => void
  }
  bestCheckpoint: number
  chassisBody: MutableRefObject<unknown>
  checkpoint: boolean
  checkpoints: number[]
  color: string
  controls: Controls
  debug: boolean
  dpr: number
  editor: boolean
  finished: number
  finishCount: number
  map: boolean
  playerName: string
  renderer: WebGLRenderer | null
  shadows: boolean
  sound: boolean
  started: number
  stats: boolean
  wheels: MutableRefObject<unknown>[]
}

const actions = (set: Setter, get: Getter) => ({
  onCheckpoint: () => {
    const { bestCheckpoint, checkpoints, started } = get()
    if (!started || bestCheckpoint === checkpoints.length) return
    set(({ checkpoints, bestCheckpoint }) => {
      checkpoints.push(performance.now() - started)
      bestCheckpoint++
    })
  },
  onFinish: () => {
    const { started, finishCount } = get()
    if (!started) return
    set((store) => {
      store.finished = performance.now() - started
      store.finishCount = finishCount + 1
      store.started = 0
    })
  },
  onStart: () => {
    set((store) => {
      store.started = performance.now()
      store.finished = 0
      store.checkpoints = []
      store.bestCheckpoint = 0
    })
  },
  reset: () => {
    set((store) => {
      store.finished = 0
      store.started = 0
      store.checkpoints = []
      store.bestCheckpoint = 0
    })
  },
  setColor: (color: string) => {
    set((store) => {
      store.color = color
    })
  },
  setDpr: (dpr: number) => {
    set((store) => {
      store.dpr = dpr
    })
  },
  setEditor: (editor: boolean) => {
    set((store) => {
      store.editor = editor
    })
  },
  setPlayerName: (name: string) => {
    set((store) => {
      store.playerName = name
    })
  },
  setRenderer: (renderer: WebGLRenderer) => {
    renderer.outputColorSpace = SRGBColorSpace
    set((store) => {
      store.renderer = renderer
    })
  },
  sound: () => {
    set((store) => {
      store.sound = !store.sound
    })
  },
  toggleEditor: () => {
    set((store) => {
      store.editor = !store.editor
    })
  },
  toggleShadows: () => {
    set((store) => {
      store.shadows = !store.shadows
    })
  },
})

const store = (set: Setter, get: Getter): IStore => ({
  actions: actions(set, get),
  bestCheckpoint: 0,
  chassisBody: createRef(),
  checkpoint: true,
  checkpoints: [],
  color: '#FFFF00',
  controls: {
    backward: false,
    boost: false,
    brake: false,
    forward: false,
    left: false,
    reset: false,
    right: false,
  },
  debug: false,
  dpr: 1.5,
  editor: false,
  finished: 0,
  finishCount: 0,
  map: true,
  playerName: '',
  renderer: null,
  shadows: true,
  sound: false,
  started: 0,
  stats: false,
  wheels: [createRef(), createRef(), createRef(), createRef()],
})

export const { getState, setState, subscribe, destroy } = create<IStore>()(subscribeWithSelector(set => store(set as unknown as Setter, getState as unknown as Getter)))
export const useStore = create<IStore>()(subscribeWithSelector(set => store(set as unknown as Setter, getState as unknown as Getter)))
