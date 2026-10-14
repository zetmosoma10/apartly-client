const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <p role="alert" className="text-sm font-semibold text-center text-error">
      {errorMessage}
    </p>
  );
};

export default ErrorMessage;
