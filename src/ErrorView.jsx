function ErrorView({ error }) {
  return (
    <div>
      <h2>Oops, something went wrong</h2>
      <p>{error}</p>
      <p>Try following the personal link in the most recently received email</p>
    </div>
  );
}

export default ErrorView;
