import { Link } from "react-router-dom";

interface HeaderBottomProps {
  to: string;
  text: string;
}

export const HeaderBottom = ({ to, text }: HeaderBottomProps) => {
  return (
    <Link
      className="text-zinc-200 border border-zinc-200 py-0.5 px-2 rounded-md hover:border-orange-600 hover:text-orange-600"
      to={to}
    >
      {text}
    </Link>
  );
};
