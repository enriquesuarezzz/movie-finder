import { SVGProps } from 'react'

interface LogoProps extends SVGProps<SVGSVGElement> {
  color?: 'black' | 'white'
}

export function Logo({ color = 'black', ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 36 36"
      {...props}
    >
      <path
        fill={color}
        d="M30 4H6a2 2 0 0 0-2 2v24a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 26H6V6h24Z"
        className="clr-i-outline clr-i-outline-path-1"
      />
      <path
        fill={color}
        d="M14.6 23.07a1.29 1.29 0 0 0 1.24.09l8.73-4a1.3 1.3 0 0 0 0-2.37l-8.73-4A1.3 1.3 0 0 0 14 14v8a1.29 1.29 0 0 0 .6 1.07m1-8.6L23.31 18l-7.71 3.51Z"
        className="clr-i-outline clr-i-outline-path-2"
      />
      <path
        fill={color}
        d="M8 7h2v3H8z"
        className="clr-i-outline clr-i-outline-path-3"
      />
      <path
        fill={color}
        d="M14 7h2v3h-2z"
        className="clr-i-outline clr-i-outline-path-4"
      />
      <path
        fill={color}
        d="M20 7h2v3h-2z"
        className="clr-i-outline clr-i-outline-path-5"
      />
      <path
        fill={color}
        d="M26 7h2v3h-2z"
        className="clr-i-outline clr-i-outline-path-6"
      />
      <path
        fill={color}
        d="M8 26h2v3H8z"
        className="clr-i-outline clr-i-outline-path-7"
      />
      <path
        fill={color}
        d="M14 26h2v3h-2z"
        className="clr-i-outline clr-i-outline-path-8"
      />
      <path
        fill={color}
        d="M20 26h2v3h-2z"
        className="clr-i-outline clr-i-outline-path-9"
      />
      <path
        fill={color}
        d="M26 26h2v3h-2z"
        className="clr-i-outline clr-i-outline-path-10"
      />
      <path fill="none" d="M0 0h36v36H0z" />
    </svg>
  )
}
