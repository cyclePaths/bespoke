// import React, { useRef } from 'react';
// import 'keen-slider/keen-slider.min.css'
// import { useKeenSlider,
//   KeenSliderOptions,
//   TrackDetails,
// } from 'keen-slider/react'


// export default function Wheel(props: {
//   initIdx?: number
//   label?: string
//   length: number
//   loop?: boolean
//   perspective?: "left" | "right" | "center"
//   setValue?: (relative: number, absolute: number) => string
//   width: number
// }) {
//   const perspective = props.perspective || "center"
//   const wheelSize = 20
//   const slides = props.length
//   const slideDegree = 360 / wheelSize
//   const slidesPerView = props.loop ? 9 : 1
//   const [sliderState, setSliderState] = React.useState<TrackDetails | null>(
//     null
//   )
//   const size = useRef(0)
//   const options = useRef<KeenSliderOptions>({
//     slides: {
//       number: slides,
//       origin: props.loop ? "center" : "auto",
//       perView: slidesPerView,
//     },

//     vertical: true,

//     initial: props.initIdx || 0,
//     loop: props.loop,
//     dragSpeed: (val) => {
//       const height = size.current
//       return (
//         val *
//         (height /
//           ((height / 2) * Math.tan(slideDegree * (Math.PI / 180))) /
//           slidesPerView)
//       )
//     },
//     created: (s) => {
//       size.current = s.size
//     },
//     updated: (s) => {
//       size.current = s.size
//     },
//     detailsChanged: (s) => {
//       setSliderState(s.track.details)
//     },
//     rubberband: !props.loop,
//     mode: "free-snap",
//   })

//   const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(options.current)

//   const [radius, setRadius] = React.useState(0)

//   React.useEffect(() => {
//     if (slider.current) setRadius(slider.current.size / 2)
//   }, [slider])

//   function slideValues() {
//     if (!sliderState) return []
//     const offset = props.loop ? 1 / 2 - 1 / slidesPerView / 2 : 0

//     const values: { style: React.CSSProperties, value: string | number }[] = [];
//     // const values = []
//     for (let i = 0; i < slides; i++) {
//       const distance = sliderState
//         ? (sliderState.slides[i].distance - offset) * slidesPerView
//         : 0
//       const rotate =
//         Math.abs(distance) > wheelSize / 2
//           ? 180
//           : distance * (360 / wheelSize) * -1
//       const style = {
//         transform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
//         WebkitTransform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
//       }
//       const value = props.setValue
//         ? props.setValue(i, sliderState.abs + Math.round(distance))
//         : i
//       values.push({ style, value })
//     }
//     return values
//   }
// // console.log(props)

//   return (
//     <div
//       className={"wheel keen-slider wheel--perspective-" + perspective}
//       ref={sliderRef}
//     >
//       <div
//         className="wheel__shadow-top"
//         style={{
//           transform: `translateZ(${radius}px)`,
//           WebkitTransform: `translateZ(${radius}px)`,
//         }}
//       />
//       <div className="wheel__inner">
//         <div className="wheel__slides" style={{ width: props.width + "px" }}>
//           {slideValues().map(({ style, value }, idx) => (
//             <div className="wheel__slide" style={style} key={idx}>
//               <span>{value}</span>
//             </div>
//           ))}
//         </div>
//         {props.label && (
//           <div
//             className="wheel__label"
//             style={{
//               transform: `translateZ(${radius}px)`,
//               WebkitTransform: `translateZ(${radius}px)`,
//             }}
//           >
//             {props.label}
//           </div>
//         )}
//       </div>
//       <div
//         className="wheel__shadow-bottom"
//         style={{
//           transform: `translateZ(${radius}px)`,
//           WebkitTransform: `translateZ(${radius}px)`,
//         }}
//       />
//     </div>
//   )
// }








import React, { useRef } from 'react';
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider, KeenSliderOptions, TrackDetails } from 'keen-slider/react'

export default function Wheel(props: {
  initIdx?: number
  label?: string
  length: number
  loop?: boolean
  perspective?: "left" | "right" | "center"
  setValue?: (relative: number, absolute: number) => string
  width: number
}) {
  const perspective = props.perspective || "center"
  const wheelSize = 20
  const slides = props.length
  const slideDegree = 360 / wheelSize
  const slidesPerView = props.loop ? 9 : 1

  // Define state variables to capture the displayed values
  const [displayedValue23, setDisplayedValue23] = React.useState<number>(0)
  const [displayedValue59, setDisplayedValue59] = React.useState<number>(0)

  const [sliderState, setSliderState] = React.useState<TrackDetails | null>(
    null
  )
  const size = useRef(0)
  const options = useRef<KeenSliderOptions>({
    slides: {
      number: slides,
      origin: props.loop ? "center" : "auto",
      perView: slidesPerView,
    },
    vertical: true,
    initial: props.initIdx || 0,
    loop: props.loop,
    dragSpeed: (val) => {
      const height = size.current
      return (
        val *
        (height /
          ((height / 2) * Math.tan(slideDegree * (Math.PI / 180))) /
          slidesPerView)
      )
    },
    created: (s) => {
      size.current = s.size
    },
    updated: (s) => {
      size.current = s.size
    },
    detailsChanged: (s) => {
      setSliderState(s.track.details)

      // Update the displayed values whenever the slider state changes
      const rel23 = s.track.details ? s.track.details.rel * 24 : 0
      console.log("rel23", rel23)  ////////////////////////////////////////////////////////////////////////EACH NUMBER IN THE HOURS COLUMN = 60
      console.log("loop", props.loop)
      setDisplayedValue23(props.loop ? Math.floor(rel23) % 24 : Math.round(rel23))

      const rel59 = s.track.details ? s.track.details.rel * 60 : 0
      console.log("rel59", rel59)   //////////////////////////////////////////////////////////////////////EACH NUMBER IN THE MINUTES COLUMN = 60
      console.log("loop", props.loop)
      setDisplayedValue59(props.loop ? Math.floor(rel59) % 60 : Math.round(rel59))
    },

    rubberband: !props.loop,
    mode: "free-snap",
  })

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(options.current)

  const [radius, setRadius] = React.useState(0)

  React.useEffect(() => {
    if (slider.current) setRadius(slider.current.size / 2)
  }, [slider])

  function slideValues() {
    if (!sliderState) return []

    const offset = props.loop ? 1 / 2 - 1 / slidesPerView / 2 : 0

    const values: { style: React.CSSProperties, value: string | number }[] = []
    for (let i = 0; i < slides; i++) {
      const distance = sliderState
        ? (sliderState.slides[i].distance - offset) * slidesPerView
        : 0
      const rotate =
        Math.abs(distance) > wheelSize / 2
          ? 180
          : distance * (360 / wheelSize) * -1
      const style = {
        transform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
        WebkitTransform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
      }
      const value = props.setValue
        ? props.setValue(i, sliderState.abs + Math.round(distance))
        : i
      values.push({ style, value })
    }

    return values
  }


  return (
        <div
          className={"wheel keen-slider wheel--perspective-" + perspective}
          ref={sliderRef}
        >
          <div
            className="wheel__shadow-top"
            style={{
              transform: `translateZ(${radius}px)`,
              WebkitTransform: `translateZ(${radius}px)`,
            }}
          />
          <div className="wheel__inner">
            <div className="wheel__slides" style={{ width: props.width + "px" }}>
              {slideValues().map(({ style, value }, idx) => (
                <div className="wheel__slide" style={style} key={idx}>
                  <span>{value}</span>
                </div>
              ))}
            </div>
            {props.label && (
              <div
                className="wheel__label"
                style={{
                  transform: `translateZ(${radius}px)`,
                  WebkitTransform: `translateZ(${radius}px)`,
                }}
              >
                {props.label}
              </div>
            )}
          </div>
          <div
            className="wheel__shadow-bottom"
            style={{
              transform: `translateZ(${radius}px)`,
              WebkitTransform: `translateZ(${radius}px)`,
            }}
          />
        </div>
      )
          }