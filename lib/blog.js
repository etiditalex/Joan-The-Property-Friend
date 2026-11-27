const photo = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

export const posts = [
  {
    slug: "house-apartment-or-land",
    title: "House, apartment, or land: how to choose before you view",
    date: "November 27, 2026",
    excerpt:
      "A house, an apartment, and a plot answer different lives. Here is how to decide which one to view first, before anyone books the afternoon.",
    image: photo("photo-1600585154340-be6161a56a0c"),
    blocks: [
      {
        type: "p",
        text: "Buyers often start with a beach and only later discover they were looking at the wrong kind of property. A Nyali house, a Diani apartment, and a Kilifi plot can sit in the same budget conversation and still suit completely different weeks. Joan works from Nyali, and the list runs across Mombasa, Kilifi, Malindi, and Kwale. She asks three questions before she sets a viewing: when you want to move, who will live there, and whether you want to build."
      },
      {
        type: "h2",
        text: "What should you buy if you want to move in soon?"
      },
      {
        type: "p",
        text: "If the move has a date on it, start with something that is already built. A house gives you the compound, the parking, and the rooms as they stand. An apartment gives you a smaller home that is already finished, usually with a service charge and a set parking bay. Land is the opposite: you own the ground, then you spend the next season designing and building."
      },
      {
        type: "sub",
        text: "Houses"
      },
      {
        type: "ul",
        items: [
          "Best when a family wants a garden, a staff quarter, and more than one living room.",
          "Nyali, Diani, Mtwapa, and Malindi are the places Joan starts that conversation.",
          "Ask what the guide price includes before you drive out: fittings, the staff room, and the borehole are not always in the number on the page."
        ]
      },
      {
        type: "sub",
        text: "Apartments"
      },
      {
        type: "ul",
        items: [
          "Best for a first home, a smaller household, or someone who wants the city close.",
          "Nyali, Kilifi, Malindi, and Diani cover studios through three-bedroom residences.",
          "Ask about the service charge, the generator, and which floor plans are still open."
        ]
      },
      {
        type: "sub",
        text: "Land"
      },
      {
        type: "ul",
        items: [
          "Best when you are happy to build, or to hold the plot while you plan.",
          "Bamburi, Kilifi, Malindi, and Kwale are the plots Joan is walking buyers through.",
          "The viewing is about beacons, the access road, and the title, not about a kitchen."
        ]
      },
      {
        type: "h2",
        text: "How should the budget change the choice?"
      },
      {
        type: "p",
        text: "The same money does not buy the same life in every part of the coast. A sum that buys a bungalow in Malindi may only buy a two-bedroom apartment in Nyali, and it may buy an acre in Kwale. Joan treats every price on the site as a guide. She confirms what is still available, then she tells you what that price does not cover."
      },
      {
        type: "ul",
        items: [
          "Under the apartment range, look at studios in Kilifi, Malindi apartments, and the smaller plots.",
          "In the middle, compare a Mtwapa family house with a larger Diani apartment.",
          "At the top of the list, the choice is usually a Nyali or Diani house against an acre you will not live on yet.",
          "Leave room for stamp duty, legal fees, and, on an apartment, the service charge."
        ]
      },
      {
        type: "h2",
        text: "What should you ask before the viewing?"
      },
      {
        type: "p",
        text: "A good viewing is short because the questions were asked first. Send Joan the listing you like and she will answer these before she puts a time in the diary."
      },
      {
        type: "ul",
        items: [
          "Is the guide price still the number the owner will discuss?",
          "What is included, and what will you pay for separately?",
          "For a house or apartment: how many bedrooms and parking bays, and what is the service or staffing cost?",
          "For land: is it beaconed, what is the use, and how does the road behave after rain?",
          "Which documents will she walk you through before you reserve?"
        ]
      },
      {
        type: "h2",
        text: "Which neighbourhood fits which purchase?"
      },
      {
        type: "p",
        text: "Match the property to the week you actually live, not to the photograph."
      },
      {
        type: "ul",
        items: [
          "Nyali, Mombasa: family houses and apartments, close to the beach, the shops, and the links road.",
          "Kilifi and Mtwapa: houses, a studio, and plots for a buyer based on the north coast.",
          "Malindi: a bungalow, an apartment, or an acre, for a holiday house or a longer hold.",
          "Diani and Kwale: villas, larger apartments, and plots on the south coast.",
          "Wherever you look, Joan explains the title and the guide price before you reserve."
        ]
      },
      {
        type: "h2",
        text: "Conclusion"
      },
      {
        type: "p",
        text: "Choose the kind of property first, then the neighbourhood, then the afternoon. Joan will show you one house, one apartment, or one plot that fits that order, and she will explain the paperwork before you commit. If you already know which way you are leaning, start with the list and tell her which one to open."
      },
      {
        type: "h2",
        text: "FAQ"
      },
      {
        type: "h3",
        text: "Can Joan show more than one kind of property in a day?"
      },
      {
        type: "p",
        text: "Yes, if they sit near each other. A Nyali house and a Nyali apartment can share an afternoon. A Malindi plot cannot share a morning with a Diani villa."
      },
      {
        type: "h3",
        text: "Are the prices on the site the final price?"
      },
      {
        type: "p",
        text: "They are guide prices. Ask Joan what is still open, and what the number includes, before you travel to see it."
      },
      {
        type: "h3",
        text: "What if I am not sure yet?"
      },
      {
        type: "p",
        text: "Say so on the enquiry form. Tell her your budget, who will live there, and whether you want to move in or build. She will narrow the list before she suggests a viewing."
      }
    ]
  }
];

export function getPost(slug) {
  return posts.find((post) => post.slug === slug) || null;
}
