import React, {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import useResizeObserver from 'use-resize-observer'

const Accordion = ({
  open,
  children,
  className = '',
  startingState = 'closed',
  timeSelector = false,
  setHeight,
  responcivePosition,
  topPos,
}: {
  open: boolean
  children: any
  responcivePosition?: boolean
  className?: string
  startingState?: 'open' | 'closed'
  timeSelector?: boolean
  setHeight?: (arg: number) => void
  topPos?: boolean
}) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>
  const [currentHeight, setCurrentHeight] = useState(0)
  useEffect(() => {
    setHeight && setHeight(currentHeight)
  }, [currentHeight])

  const { ref: child } = useResizeObserver({
    onResize: (size) => {
      if (ref.current) {
        ref.current.style.setProperty('--h', `${size.height}px`)
        size.height && responcivePosition && setCurrentHeight(size.height)
      }
    },
  })

  useLayoutEffect(() => {
    if (startingState === 'open') {
      ref.current.addEventListener(
        'animationend',
        () => {
          ref.current.removeAttribute('closing')
        },
        { once: true }
      )
      ref.current.setAttribute('closing', '')
    }
  }, [])

  useLayoutEffect(() => {
    if (open) {
      ref.current.setAttribute('closing', '')
    }

    return () => {}
  }, [open])

  return (
    <div
      {...(className ? { className } : {})}
      className={`${
        topPos
          ? 'absolute bottom-12 w-full bg-inherit rounded-t-lg'
          : `${className}`
      }`}
    >
      <div
        ref={ref}
        {...{ open }}
        className="accordion "
        starting-state={startingState}
      >
        <div ref={child}>{children}</div>
      </div>
    </div>
  )
}

export default Accordion
