export default function Ticker({ headlines }) {
  if (!headlines || headlines.length === 0) return null;
  const doubled = [...headlines, ...headlines];

  return (
    <div className="ticker-bar">
      <div className="ticker-tag">LATEST</div>
      <div className="ticker-track">
        {doubled.map((headline, i) => (
          <span key={i} dangerouslySetInnerHTML={{ __html: headline }} />
        ))}
      </div>
    </div>
  );
}
