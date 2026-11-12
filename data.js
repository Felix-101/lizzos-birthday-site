// ─────────────────────────────────────────────────────────────
//  All the words, photos and songs live here.
//  Edit this file — you shouldn't need to touch the others.
//  Photo paths must match the file names you drop into /images.
// ─────────────────────────────────────────────────────────────

const SITE = {
  hero: {
    image: "images/hero/us.jpg",
    // Which part of the photo stays in view on wide screens (higher % = shows more of the bottom)
    position: "center 40%",
    titleLines: ["For Lizzie,", "from Migwo"],
    subtitle:
      "Who could have guessed that meeting you would become the single catalyst for so much change in my life?",
  },

  // Background music. Drop the MP3 into /music with this exact name.
  music: {
    src: "music/background.mp3",
    label: "Dive — Olivia Dean",
  },

  story: {
    intro:
      "The hair compliment that started it all and then there was Nyberg...",
    moments: [
      { image: "images/story/1.jpg", date: "October 4th", caption: "The first photo we ever took together" },
      // position = which part of the photo shows in the polaroid ("center 10%" = near the top)
      // date is optional: leave it out and no date tag shows
      { image: "images/story/2.jpg", position: "center 30%", caption: "Liz is so mwah." },
      { image: "images/story/3.jpg", position: "center 10%", caption: "Officially Super BFFs: each other's #1 for two months in a row." },
      // A blank line (\n\n) in a caption starts a new paragraph
      {
        image: "images/story/4.jpg",
        position: "center 60%",
        caption:
          "A little reminder that I'm really glad life brought us into each other's orbit. You're such a lovely person to have around, and I hope you never forget how special you are. Thank you for the laughs, the random moments, the comfort and simply being you.\n\n" +
          "I hope life is always kind to you, that you get everything your heart desires and that you never run out of reasons to smile.\n\n" +
          "I'm really, really glad I know you. Here's to many more memories, inside jokes and years of being in each other's lives. Love you, always. ♡",
      },
    ],
  },

  // Each song can have:
  //   link:     a Spotify link (Share → Copy Song Link) or a YouTube / YouTube Music link
//             (Share → Copy link). Either one shows a playable player on the card.
  //   images:   screenshots saved in /images/songs. Tap one on the site to see it full size.
  //             Use { src, position } to choose which part shows in the thumbnail ("center 30%" = nearer the top).
  //   featured: true makes the card twice as wide
  // With no link and no images, it shows a spinning vinyl with the title and artist.
  songs: [
    {
      title: "Made For You",
      artist: "Banky W",
      featured: true,
      link: "https://open.spotify.com/track/4duswgfUluu0nOc07O4lMI",
      images: [
        { src: "images/songs/made-for-you.jpg", position: "center 35%" },
        { src: "images/songs/made-for-you-lyrics.jpg", position: "center 40%" },
      ],
      note: "Our song. Always.",
    },
    { title: "So Easy (To Fall in Love)", artist: "Olivia Dean", link: "", images: [], note: "Your favourite artist, obviously." },
    {
      title: "Jies",
      artist: "BNXN",
      link: "https://open.spotify.com/track/6dmuFoJ8jYh7kzai2twWNo",
      images: [{ src: "images/songs/jies.jpg", position: "center bottom" }],
      note: "[Why this one is ours]",
    },
    { title: "[Song title]", artist: "[Artist]", link: "", images: [], note: "[Why this one is ours]" },
  ],

  gallery: {
    intro: "Proof that we actually leave the house.",
    // Add as many as you like. Captions are optional: { src: "...", caption: "..." }
    photos: [
      "images/gallery/1.jpg",
      "images/gallery/2.jpg",
      "images/gallery/3.jpg",
      "images/gallery/4.jpg",
    ],
  },

  finale: {
    title: "I love you, Lizzie",
    message: "Happy birthday. Here's to many more years of us.",
    signature: "— Migwo",
  },
};
