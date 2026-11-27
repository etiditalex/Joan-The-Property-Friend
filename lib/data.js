export const site = {
  name: "Joan Property Friend",
  tagline: "Your Property Partner",
  phone: "",
  whatsapp: "",
  email: "",
  address: "Nyali, Mombasa, Kenya",
  logo: "https://res.cloudinary.com/dyfnobo9r/image/upload/e_trim/c_limit,w_720/v1795767543/Joan_the_property_friend_logo_gjvoxa.jpg"
};

const photo = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const areas = ["Mombasa", "Kilifi", "Malindi", "Kwale"];

export const heroSlides = [
  {
    mark: "Joan",
    kicker: "Houses",
    title: "Nyali",
    sub: "As it should be lived",
    image: photo("photo-1600596542815-ffad4c1539a9"),
    href: "/for-sale?type=house"
  },
  {
    mark: "Joan",
    kicker: "Apartments",
    title: "Diani",
    sub: "Coast living, refined",
    image: photo("photo-1545324418-cc1a3fa10c00"),
    href: "/for-sale?type=apartment"
  },
  {
    mark: "Joan",
    kicker: "Land",
    title: "Malindi",
    sub: "Ground for what comes next",
    image: photo("photo-1500382017468-9049fed747ef"),
    href: "/for-sale?type=land"
  }
];

export const reasons = [
  {
    title: "Houses, apartments and land",
    text: "One place to look, whether you want a family house, a coast apartment, or a plot to build on."
  },
  {
    title: "Viewings, arranged",
    text: "Tell Joan what caught your eye. She sets the visit and walks the property with you."
  },
  {
    title: "A partner, not a pitch",
    text: "Straight talk on price, location, and fit, so you can decide without being rushed."
  },
  {
    title: "Paperwork, explained",
    text: "Before you commit, Joan walks you through the documents that belong with that property."
  },
  {
    title: "Clear prices",
    text: "Every listing shows a guide price. Ask Joan what is still open before you travel to see it."
  },
  {
    title: "Prime locations",
    text: "Mombasa, Kilifi, Malindi, and Kwale — chosen for how you will actually live or build."
  }
];

export const collections = [
  {
    title: "Houses",
    place: "Nyali & Diani",
    href: "/for-sale?type=house",
    image: photo("photo-1600585154340-be6161a56a0c", 1200)
  },
  {
    title: "Apartments",
    place: "Nyali & Mtwapa",
    href: "/for-sale?type=apartment",
    image: photo("photo-1545324418-cc1a3fa10c00", 1200)
  },
  {
    title: "Land",
    place: "Kilifi & Malindi",
    href: "/for-sale?type=land",
    image: photo("photo-1469474968028-56623f02e42e", 1200)
  },
  {
    title: "Family houses",
    place: "Mtwapa & Malindi",
    href: "/for-sale?type=house",
    image: photo("photo-1564013799919-ab600027ffc6", 1200)
  },
  {
    title: "Coast apartments",
    place: "Nyali & Diani",
    href: "/for-sale?type=apartment",
    image: photo("photo-1460317442991-0ec209397118", 1200)
  },
  {
    title: "Plots",
    place: "Kilifi & Kwale",
    href: "/for-sale?type=land",
    image: photo("photo-1500534314209-a25ddb2bd429", 1200)
  }
];

export const properties = [
  {
    id: "nyali-house",
    type: "house",
    typeLabel: "House",
    area: "Mombasa",
    title: "Nyali | 4 Bedroom House",
    place: "Nyali, Mombasa",
    price: 42000000,
    status: "Available",
    beds: 4,
    baths: 4,
    size: "280 sqm",
    extra: "Garden compound",
    summary: "A family house in Nyali, with a garden, a staff quarter, and the beach a short drive away.",
    description:
      "Set in a quiet Nyali court, this four-bedroom house is built for everyday family life on the coast. The living rooms open toward the garden, the bedrooms are ensuite, and there is a separate staff quarter. Nyali beach, the shopping, and the links road are close. Joan will walk the house with you and take you through the paperwork before you commit.",
    points: ["All bedrooms ensuite", "Staff quarter", "Garden compound", "Covered parking"],
    image: photo("photo-1600585154340-be6161a56a0c"),
    gallery: [photo("photo-1600585154340-be6161a56a0c"), photo("photo-1600607687939-ce8a6c25118c"), photo("photo-1600566753086-00f18fb6b3ea")]
  },
  {
    id: "diani-villa",
    type: "house",
    typeLabel: "House",
    area: "Kwale",
    title: "Diani | 5 Bedroom Villa",
    place: "Diani, Kwale",
    price: 65000000,
    status: "Available",
    beds: 5,
    baths: 5,
    size: "420 sqm",
    extra: "Pool court",
    summary: "A generous Diani villa with a pool court, a family wing, and the beach within reach.",
    description:
      "This five-bedroom villa sits on a wide Diani plot with a pool, a covered terrace, and a separate family wing. The ground floor opens from the kitchen through to the garden. Viewing is by appointment with Joan.",
    points: ["Swimming pool", "Family wing", "Double garage", "Borehole"],
    image: photo("photo-1613490493576-7fde63acd811"),
    gallery: [photo("photo-1613490493576-7fde63acd811"), photo("photo-1600596542815-ffad4c1539a9"), photo("photo-1600210492486-724fe5c67fb0")]
  },
  {
    id: "mtwapa-family",
    type: "house",
    typeLabel: "House",
    area: "Kilifi",
    title: "Mtwapa | 4 Bedroom House",
    place: "Mtwapa, Kilifi",
    price: 18500000,
    status: "Available",
    beds: 4,
    baths: 3,
    size: "210 sqm",
    extra: "Gated court",
    summary: "A modern four-bedroom house in a gated Mtwapa court, practical for a family based on the north coast.",
    description:
      "A contemporary four-bedroom house with a small garden, a staff room, and parking inside a gated court in Mtwapa. Joan can arrange a viewing on a weekday evening or a Saturday.",
    points: ["Gated court", "Staff room", "Fitted kitchen", "Two parking bays"],
    image: photo("photo-1564013799919-ab600027ffc6"),
    gallery: [photo("photo-1564013799919-ab600027ffc6"), photo("photo-1600047509807-ba8f99d2cdbc"), photo("photo-1600573472592-401b489a3cdc")]
  },
  {
    id: "malindi-bungalow",
    type: "house",
    typeLabel: "House",
    area: "Malindi",
    title: "Malindi | 3 Bedroom Bungalow",
    place: "Malindi",
    price: 14500000,
    status: "Available",
    beds: 3,
    baths: 2,
    size: "160 sqm",
    extra: "Own compound",
    summary: "A single-storey family bungalow in Malindi, with a yard and room to extend later.",
    description:
      "A three-bedroom bungalow on its own compound in Malindi. Joan will confirm what is included in the guide price before you view.",
    points: ["Own compound", "Room to extend", "Water storage", "Close to town"],
    image: photo("photo-1570129477492-45c003edd2be"),
    gallery: [photo("photo-1570129477492-45c003edd2be"), photo("photo-1605276374104-dee2a0ed3cd6"), photo("photo-1560185007-cde436f6a4d0")]
  },
  {
    id: "nyali-apartment",
    type: "apartment",
    typeLabel: "Apartment",
    area: "Mombasa",
    title: "Nyali | 2 Bedroom Apartment",
    place: "Nyali, Mombasa",
    price: 16500000,
    status: "Available",
    beds: 2,
    baths: 2,
    size: "96 sqm",
    extra: "1 parking bay",
    summary: "A bright two-bedroom apartment in Nyali, sized for a couple or a small family who want the beach close.",
    description:
      "Two bedrooms, two baths, a fitted kitchen, and one parking bay. Nyali puts the beach, the shops, and the links road within a short drive. Joan can show the unit and talk through the service charge.",
    points: ["Two bathrooms", "Fitted kitchen", "Backup generator", "Lift access"],
    image: photo("photo-1502672260266-1c1ef2d93688"),
    gallery: [photo("photo-1502672260266-1c1ef2d93688"), photo("photo-1560448204-e02f11c3d0e2"), photo("photo-1493809842364-78817add7ffb")]
  },
  {
    id: "kilifi-apartment",
    type: "apartment",
    typeLabel: "Apartment",
    area: "Kilifi",
    title: "Kilifi | Studio Apartment",
    place: "Kilifi",
    price: 6200000,
    status: "Available",
    beds: 0,
    baths: 1,
    size: "38 sqm",
    extra: "Furnished option",
    summary: "A compact Kilifi studio for a first coast home or a place you intend to let.",
    description:
      "A studio with a separate bath and a kitchenette, with the option to take it furnished. Ask Joan for the current service charge and what similar units nearby are letting for.",
    points: ["Kitchenette", "24-hour desk", "Borehole water", "Close to the creek"],
    image: photo("photo-1522708323590-d24dbb6b0267"),
    gallery: [photo("photo-1522708323590-d24dbb6b0267"), photo("photo-1536376072261-38c75010e6c9"), photo("photo-1502672023488-70e25813eb80")]
  },
  {
    id: "diani-residence",
    type: "apartment",
    typeLabel: "Apartment",
    area: "Kwale",
    title: "Diani | 3 Bedroom Apartment",
    place: "Diani, Kwale",
    price: 28500000,
    status: "Few remaining",
    beds: 3,
    baths: 3,
    size: "165 sqm",
    extra: "2 parking bays",
    summary: "A large three-bedroom residence in Diani, with a second parking bay and a quiet court.",
    description:
      "Three ensuite bedrooms, a separate dining room, and two parking bays in a low court off a Diani road. Joan will confirm which floor plans remain before you book a viewing.",
    points: ["All ensuite", "Two parking bays", "Quiet court", "Separate dining"],
    image: photo("photo-1545324418-cc1a3fa10c00"),
    gallery: [photo("photo-1545324418-cc1a3fa10c00"), photo("photo-1600607687644-c7171b42498b"), photo("photo-1600210492493-0946911123ea")]
  },
  {
    id: "malindi-apartment",
    type: "apartment",
    typeLabel: "Apartment",
    area: "Malindi",
    title: "Malindi | 2 Bedroom Apartment",
    place: "Malindi",
    price: 9800000,
    status: "Available",
    beds: 2,
    baths: 2,
    size: "78 sqm",
    extra: "Garden court",
    summary: "A two-bedroom apartment in Malindi for buyers who want more space than a studio, close to town.",
    description:
      "Two bedrooms, two baths, and a balcony looking onto a garden court. Joan can compare this with the houses in Mtwapa if you are deciding between the two.",
    points: ["Balcony", "Two bathrooms", "Assigned parking", "Close to town"],
    image: photo("photo-1460317442991-0ec209397118"),
    gallery: [photo("photo-1460317442991-0ec209397118"), photo("photo-1560448204-e02f11c3d0e2"), photo("photo-1616594039964-ae9021a400a0")]
  },
  {
    id: "bamburi-plot",
    type: "land",
    typeLabel: "Land",
    area: "Mombasa",
    title: "Bamburi | 1/8 Acre Plot",
    place: "Bamburi, Mombasa",
    price: 8500000,
    status: "Available",
    beds: null,
    baths: null,
    size: "1/8 acre",
    extra: "Residential",
    summary: "An eighth-acre residential plot in Bamburi, with room for a family house on the north coast.",
    description:
      "A residential eighth-acre in Bamburi, sized for a bungalow and a small yard. The approach road is already in use. Joan will show you the beacons and walk you through the title documents before you reserve.",
    points: ["Beaconed", "Residential use", "Accessible road", "Ready to build"],
    image: photo("photo-1469474968028-56623f02e42e"),
    gallery: [photo("photo-1469474968028-56623f02e42e"), photo("photo-1500530855697-b586d89ba3ee"), photo("photo-1472214103451-9374bd1c798e")]
  },
  {
    id: "kilifi-plot",
    type: "land",
    typeLabel: "Land",
    area: "Kilifi",
    title: "Kilifi | 50 x 100 Plot",
    place: "Kilifi",
    price: 3200000,
    status: "Available",
    beds: null,
    baths: null,
    size: "50 x 100 ft",
    extra: "Residential",
    summary: "A fifty-by-one-hundred residential plot in Kilifi for a buyer who wants to build in stages.",
    description:
      "A standard fifty-by-one-hundred plot in Kilifi, suitable for a starter house you build over time. Ask Joan which plots are still open and what the access road is like after rain.",
    points: ["50 x 100 ft", "Controlled development", "Staged building welcome", "Guide price per plot"],
    image: photo("photo-1500534314209-a25ddb2bd429"),
    gallery: [photo("photo-1500534314209-a25ddb2bd429"), photo("photo-1500382017468-9049fed747ef"), photo("photo-1441974231531-c6227db76b6e")]
  },
  {
    id: "malindi-acre",
    type: "land",
    typeLabel: "Land",
    area: "Malindi",
    title: "Malindi | 1 Acre Plot",
    place: "Malindi",
    price: 18000000,
    status: "Available",
    beds: null,
    baths: null,
    size: "1 acre",
    extra: "Coastal",
    summary: "A one-acre parcel near Malindi for a holiday house or a longer hold.",
    description:
      "One acre near Malindi. Joan will confirm the access, the setbacks, and the documents on a call before you travel to see it.",
    points: ["One acre", "Coastal address", "Holiday or hold", "Viewing by arrangement"],
    image: photo("photo-1507525428034-b723cf961d3e"),
    gallery: [photo("photo-1507525428034-b723cf961d3e"), photo("photo-1471922694854-ff1b63b20054"), photo("photo-1510414842594-a61c69b5ae57")]
  },
  {
    id: "kwale-acre",
    type: "land",
    typeLabel: "Land",
    area: "Kwale",
    title: "Kwale | 1 Acre Plot",
    place: "Ukunda, Kwale",
    price: 7500000,
    status: "Available",
    beds: null,
    baths: null,
    size: "1 acre",
    extra: "South coast",
    summary: "An acre on the Kwale side for a buyer thinking further ahead than a ready house.",
    description:
      "An acre near Ukunda. Joan will show you where it sits relative to the Diani road and explain the title before you pay a reservation.",
    points: ["One acre", "South coast", "Longer-term hold", "Title explained on viewing"],
    image: photo("photo-1500382017468-9049fed747ef"),
    gallery: [photo("photo-1500382017468-9049fed747ef"), photo("photo-1464226184884-fa280b87c399"), photo("photo-1472214103451-9374bd1c798e")]
  }
];

export function formatPrice(amount) {
  return "KES " + Number(amount).toLocaleString("en-KE");
}

export function getProperty(id) {
  return properties.find((item) => item.id === id) || null;
}

export function phoneLabel() {
  if (!site.phone) return "";
  const digits = site.phone.replace(/\D/g, "");
  if (digits.startsWith("254")) return "+" + digits.slice(0, 3) + " " + digits.slice(3, 6) + " " + digits.slice(6);
  return "+" + digits;
}
