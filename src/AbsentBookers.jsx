function AbsentBookers({ absentBookers }) {
  if (absentBookers.length === 0) {
    return null;
  }
  return (
    <div>
      <p className="no-space-after">
        <b>Absent bookers...</b>
      </p>
      <ol className="lno-space">
        {absentBookers.map((booker, index) => (
          <li key={index}>{booker.FirstName + " " + booker.LastName}</li>
        ))}
      </ol>
    </div>
  );
}

export default AbsentBookers;
