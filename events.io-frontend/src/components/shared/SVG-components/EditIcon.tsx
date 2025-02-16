type EditIconProps = {
  fill?: string;
  color?: string;
  width?: string;
  height?: string;
};

const EditIcon: React.FC<EditIconProps> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  // const { color="#110C22" } = props;

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#f9071ooy0a)">
        <path
          d="M9.167 3.333h-3.5c-1.4 0-2.1 0-2.635.273a2.5 2.5 0 0 0-1.093 1.092c-.272.535-.272 1.235-.272 2.635v7c0 1.4 0 2.1.272 2.635a2.5 2.5 0 0 0 1.093 1.093c.535.272 1.235.272 2.635.272h7c1.4 0 2.1 0 2.635-.272a2.5 2.5 0 0 0 1.093-1.093c.272-.535.272-1.235.272-2.635v-3.5m-10 2.5h1.395c.408 0 .612 0 .804-.046.17-.04.332-.108.481-.2.169-.102.313-.246.601-.535l7.969-7.969a1.768 1.768 0 0 0-2.5-2.5l-7.969 7.97c-.288.287-.432.432-.535.6-.092.149-.16.311-.2.482-.046.191-.046.395-.046.803v1.395z"
          stroke="currentColor"
          strokeWidth="1.667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="f9071ooy0a">
          <path fill="#fff" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default EditIcon;
