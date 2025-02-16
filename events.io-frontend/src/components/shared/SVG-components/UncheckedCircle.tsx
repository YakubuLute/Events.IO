type CheckProps = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
  viewBox?: string;
};

const UncheckedCircle: React.FC<CheckProps> = (props: React.SVGProps<SVGSVGElement>) => {
  // const { color="#D9D8DC" } = props;

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="1" y="1" width="22" height="22" rx="11" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default UncheckedCircle;
