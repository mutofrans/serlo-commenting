import { ReactElement } from "react";

const Highlight = ({ text, children, start, end, data }: { text?: string, children?: ReactElement<HTMLElement>, start: number, end: number, data: string | undefined }) => {

  return (
    <>
      {children}
    </>
  );
}

export default Highlight;