type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const GithubLogo: React.FC<Props> = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      {...props}
    >
      <path
        d="M5.6875 12.6875V10.5C5.6875 10.0359 5.87187 9.59075 6.20006 9.26256C6.52825 8.93438 6.97337 8.75 7.4375 8.75C7.90163 8.75 8.34675 8.93438 8.67494 9.26256C9.00313 9.59075 9.1875 10.0359 9.1875 10.5V12.6875M5.6875 11.375H3.9375C3.47337 11.375 3.02825 11.1906 2.70006 10.8624C2.37187 10.5342 2.1875 10.0891 2.1875 9.625C2.1875 9.16087 2.00313 8.71575 1.67494 8.38756C1.34675 8.05938 0.901629 7.875 0.4375 7.875M6.5532 3.0625C6.29603 2.66004 5.94163 2.32884 5.52272 2.09946C5.1038 1.87007 4.63386 1.74989 4.15625 1.75C3.9438 2.11731 3.81638 2.52756 3.78335 2.9506C3.75032 3.37364 3.81252 3.7987 3.96539 4.19453C3.66611 4.63525 3.50416 5.15478 3.5 5.6875V6.125C3.5 6.82119 3.77656 7.48887 4.26885 7.98116C4.76113 8.47344 5.42881 8.75 6.125 8.75H8.75C9.44619 8.75 10.1139 8.47344 10.6062 7.98116C11.0984 7.48887 11.375 6.82119 11.375 6.125V5.6875C11.3708 5.15478 11.2089 4.63525 10.9096 4.19453C11.0625 3.7987 11.1247 3.37364 11.0917 2.9506C11.0586 2.52756 10.9312 2.11731 10.7188 1.75C10.2411 1.74989 9.7712 1.87007 9.35228 2.09946C8.93337 2.32884 8.57897 2.66004 8.3218 3.0625H6.5532Z"
        stroke="currentColor"
        strokeWidth="0.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default GithubLogo;
