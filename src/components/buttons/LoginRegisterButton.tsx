interface LoginRegisterButtonProps {
    text: string
}

export const LoginRegisterButton = ({text}: LoginRegisterButtonProps) => {
  return (
    <button
      className="text-zinc-200 border border-zinc-200 py-0.5 px-2 rounded-md hover:border-orange-600 hover:text-orange-600 cursor-pointer my-8"
      type="submit"
    >
      {text}
    </button>
  );
};
