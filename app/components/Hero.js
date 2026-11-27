import Link from "next/link";

const poster = "https://res.cloudinary.com/dyfnobo9r/image/upload/v1795773542/image_5_jxdbdu.jpg";

export function Hero() {
  return (
    <section className="hero" aria-label="Land along Mtondia Highway">
      <div className="hero-poster">
        <img src={poster} alt="Land along Mtondia Highway" />
        <Link className="view-btn" href="/contact#enquire">Arrange Private Viewing</Link>
      </div>
    </section>
  );
}
