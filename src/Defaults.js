import stop from './assets/stop.png'
import solution from './assets/solution.png'
import Check from './assets/check.png'
import agenda from './assets/agenda.png'
import summary from './assets/summary.png'
import idea from './assets/idea.png'
import balance from './assets/balance.png'

export const MARKER_SIZE = 20

export const DOWN_SCALE_FACTOR = 0.6
export const LOST_PETAL_DOWN_SCALE_FACTOR = 1

export const MAGNIFY_SPEED = 600
export const UNMAGNIFY_SPEED = 800

export const NAVBAR_HEIGHT = 60
export const SIDEBAR_WIDTH = 320

export const FLAVORS = [
  {
    name: 'Contradiction',
    type: 'contra',
    color: '#E74949',
    icon: stop
  },
  {
    name: 'Support',
    type: 'pro',
    color: '#36B37E',
    icon: Check
  },
  {
    name: 'Neutral',
    type: 'neutral',
    color: '#36B37E',
    icon: balance
  },
  {
    name: 'Solution',
    type: 'solution',
    color: '#7A869A',
    icon: solution
  },

  {
    name: 'Idea',
    type: 'idea',
    color: '#6554C0',
    icon: idea
  },
  {
    name: 'Agenda Topic',
    type: 'agenda',
    color: '#ffAB00',
    icon: agenda
  },
  {
    name: 'Summary',
    type: 'summary',
    color: '#2684FF',
    icon: summary,
    size: 41
  }
]

export function getFlavor (type) {
  return FLAVORS.find(element => {
    return element.type === type
  })
}
