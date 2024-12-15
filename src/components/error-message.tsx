import { FieldError } from "react-hook-form";

type ErrorMessageProps = {
  error: FieldError | undefined;
};

export default function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null;

  return <p className="mb-2 text-red-500 text-sm">{error.message}</p>;
};

