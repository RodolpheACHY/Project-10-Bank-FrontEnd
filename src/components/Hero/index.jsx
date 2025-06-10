function Hero({ subtitles, mainText }) {
    return (
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          {subtitles.map((subtitle, index) => (
            <p key={index} className="subtitle">{subtitle}</p>
          ))}
          <p className="text">{mainText}</p>
        </section>
      </div>
    );
  }

  export default Hero;
  