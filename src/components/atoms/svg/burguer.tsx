import { SVGProps } from 'react'
export default function Burguer(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_105_1724)">
        <path
          d="M3 6.00098H21M3 12.001H21M3 18.001H21"
          stroke="#292929"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
      <defs>
        <clipPath id="clip0_105_1724">
          <rect
            fill="white"
            height="24"
            transform="translate(0 0.000976562)"
            width="24"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
