export default function Footer() {
  return (
    <footer style={{ padding: '50px 0 40px', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', position: 'relative', zIndex: 2 }}>
      <div className="pf-container">
        <p style={{ fontSize: 13, color: '#a0a0b0', marginBottom: 6 }}>
          Abhishek Mani Tripathi &nbsp;•&nbsp; Designed &amp; Built with AI &nbsp;•&nbsp; {new Date().getFullYear()}
        </p>
        <p style={{ fontSize: 11, color: '#00d4ff', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Powered by Base44 + AI
        </p>
      </div>
    </footer>
  );
}