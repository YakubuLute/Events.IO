import * as React from "react"
import { SVGProps } from "react"
const SettingIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    {...props}
  >
    <path
      stroke="#4F4B5C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      d="M2 5.332h8m0 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm-4 5.333h8m-8 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
    />
  </svg>
)
export default SettingIcon
