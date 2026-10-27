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
    label: "So Easy (To Fall in Love) — Olivia Dean",
  },

  story: {
    intro:
      "[Write a few lines about how you two met — where you were, what you first thought of her, the moment you knew you'd be friends.]",
    moments: [
      { image: "images/story/1.jpg", date: "[When]", caption: "[The first photo we ever took together]" },
      // position = which part of the photo shows in the polaroid ("center 10%" = near the top)
      { image: "images/story/2.jpg", position: "center 30%", date: "[When]", caption: "Liz is so mwah. [What was happening here?]" },
      { image: "images/story/3.jpg", position: "center 10%", date: "[When]", caption: "Officially Super BFFs: each other's #1 for two months in a row." },
    ],
  },

  // Each song can have:
  //   spotify:  the link from Spotify → Share → Copy Song Link (shows a playable player)
  //   images:   screenshots saved in /images/songs. Tap one on the site to see it full size.
  //             Use { src, position } to choose which part shows in the thumbnail ("center 30%" = nearer the top).
  //   featured: true makes the card twice as wide
  // With no spotify link and no images, it shows a spinning vinyl with the title and artist.
  songs: [
    {
      title: "Made For You",
      artist: "Banky W",
      featured: true,
      spotify: "",
      images: [
        { src: "images/songs/made-for-you.jpg", position: "center 35%" },
        { src: "images/songs/made-for-you-lyrics.jpg", position: "center 40%" },
      ],
      note: "Our song. Always.",
    },
    { title: "So Easy (To Fall in Love)", artist: "Olivia Dean", spotify: "", images: [], note: "Your favourite artist, obviously." },
    {
      title: "Jies",
      artist: "BNXN",
      spotify: "",
      images: [{ src: "images/songs/jies.jpg", position: "center bottom" }],
      note: "[Why this one is ours]",
    },
    { title: "[Song title]", artist: "[Artist]", spotify: "", images: [], note: "[Why this one is ours]" },
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
