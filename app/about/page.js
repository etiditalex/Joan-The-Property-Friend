import Link from "next/link";

export const metadata = {
  title: "About Us | Joan Property Friend",
  description: "Joan Property Friend helps you buy a house, an apartment, or land from Nyali, across Mombasa, Kilifi, Malindi, and Kwale."
};

const photo = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

function Icon({ d }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const principles = [
  {
    title: "Our Mission",
    icon: "M32 10a22 22 0 1 0 0 44 22 22 0 0 0 0-44ZM32 22v10l8 4",
    text: "Tell you the truth about the place, the price, and the paperwork, and stay with you until you have stood on it yourself."
  },
  {
    title: "The Viewing",
    icon: "M14 30V18h14l6 6h16v28H14V30Zm18-2v8h8",
    text: "Joan arranges the visit, walks the property with you, and explains the documents before you reserve."
  },
  {
    title: "The List",
    icon: "M32 54s18-14 18-26a18 18 0 1 0-36 0c0 12 18 26 18 26Zm0-20a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z",
    text: "Houses, apartments, and land across Mombasa, Kilifi, Malindi, and Kwale, chosen for how you will live or build."
  }
];

const services = [
  {
    title: "Houses",
    image: photo("photo-1600585154340-be6161a56a0c"),
    text: "Family houses and villas, from a Malindi bungalow to a larger home in Nyali or Diani. Joan walks the house with you and talks through the price before you reserve."
  },
  {
    title: "Apartments",
    image: photo("photo-1502672260266-1c1ef2d93688"),
    text: "Studios and larger apartments for a first home, a coast base, or a place you intend to let. Ask which ones are still open before you travel."
  },
  {
    title: "Land",
    image: photo("photo-1500382017468-9049fed747ef"),
    text: "Residential plots and larger parcels in Bamburi, Kilifi, Malindi, and Kwale. The beacons and the title are explained before you pay."
  }
];

export default function AboutPage() {
  return (
    <div className="about-page">
      <nav className="sale-crumb" aria-label="Breadcrumb">
        <Link href="/" aria-label="Home">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" /></svg>
        </Link>
        <span aria-hidden="true">›</span>
        <span>About Us</span>
      </nav>

      <div className="about-intro">
        <h1>About Us</h1>
        <p>How Joan works with you, from the first shortlist to the viewing.</p>
      </div>

      <section className="about-principles" aria-label="How Joan works">
        {principles.map((item) => (
          <article className="about-card" key={item.title}>
            <Icon d={item.icon} />
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="about-story">
        <h2>Joan works from Nyali. The properties run across Mombasa, Kilifi, Malindi, and Kwale.</h2>
        <div className="about-story-grid">
          <div>
            <p>The list is three things people actually come looking for: a house, an apartment, or land.</p>
            <p>Nyali and Diani when you want a home with a garden. Nyali, Mtwapa, Kilifi, and Malindi when you want an apartment. Bamburi, Kilifi, Malindi, and Kwale when you want ground to build on.</p>
            <p>“You will not be handed a set of keys and left to guess.”</p>
          </div>
          <img src={photo("photo-1600596542815-ffad4c1539a9")} alt="A house with a garden, the kind of home Joan arranges viewings for" />
        </div>
      </section>

      <section className="about-services">
        <h2>Our Services</h2>
        {services.map((item, index) => (
          <article className={index % 2 ? "about-service is-flip" : "about-service"} key={item.title}>
            <img src={item.image} alt="" />
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
