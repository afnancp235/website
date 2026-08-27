/**
 * Wedding Configuration File
 * Easily customize couple details, event dates, venues, map links, and text.
 */
const WEDDING_CONFIG = {
  // Couple Information
  couple: {
    groom: "Murshid",
    bride: "Shahana",
    monogramText: "M & S",
    tagline: "Together with their families, invite you to share in their joy as they celebrate their Nikkah & Wedding",
  },

  // Target Wedding Date for Live Countdown (YYYY-MM-DDTHH:mm:ss)
  weddingDate: "2026-12-26T10:30:00",

  // Quranic / Romantic Islamic Verse
  verse: {
    arabic: "وَخَلَقْنَاكُمْ أَزْوَاجًا",
    translation: "“And We created you in pairs.”",
    source: "Surah An-Naba [78:8]",
    blessing: "In the name of Allah, the Most Gracious, the Most Merciful. May Allah bless this union with love, mercy, and happiness for a lifetime.",
  },

  // Nikkah Details
  nikkah: {
    title: "The Nikkah Ceremony",
    dateFormatted: "Saturday, December 26, 2026",
    timeFormatted: "10:30 AM IST",
    venueName: "Grand Palace Auditorium",
    address: "Kochi-Trivandrum Highway, Calicut / Kochi, Kerala, India",
    googleMapsUrl: "https://maps.google.com/?q=Grand+Palace+Auditorium+Kochi",
    appleMapsUrl: "http://maps.apple.com/?q=Grand+Palace+Auditorium+Kochi",
    attire: "Traditional Luxury / Formal Ethnic",
    description: "The solemnization of holy matrimony in the presence of family and loved ones.",
  },

  // Reception / Walima Details
  reception: {
    title: "The Royal Reception",
    dateFormatted: "Saturday, December 26, 2026",
    timeFormatted: "06:30 PM Onwards",
    venueName: "The Leela Palace Ballroom",
    address: "Marine Drive, Kochi, Kerala, India",
    googleMapsUrl: "https://maps.google.com/?q=The+Leela+Palace+Kochi",
    appleMapsUrl: "http://maps.apple.com/?q=The+Leela+Palace+Kochi",
    attire: "Black Tie / Elegant Evening Wear",
    description: "An evening of celebration, feast, music, and joyful togetherness.",
  },

  // Map Embed URL for Interactive Modal
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.073245417865!2d76.2673041!3d9.9312328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d514abec6bf%3A0xbd057b408b68f174!2sKochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",

  // RSVP Options & Settings
  rsvp: {
    deadline: "December 10, 2026",
    events: [
      { id: "both", label: "Nikkah & Reception" },
      { id: "nikkah", label: "Nikkah Only" },
      { id: "reception", label: "Reception Only" },
      { id: "decline", label: "Regretfully Decline" },
    ],
    dietaryOptions: [
      "No Restrictions (Traditional Feast)",
      "Vegetarian",
      "Gluten Free",
      "Kid Friendly",
    ],
  },

  // Ambient Instrumental Music Settings
  audio: {
    enabled: true,
    // Smooth ambient background sound source (high quality soft acoustic instrumental)
    src: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=soft-ambient-111354.mp3",
    title: "Ambient Oud & String Ensemble",
  }
};

// Export to window scope
if (typeof window !== "undefined") {
  window.WEDDING_CONFIG = WEDDING_CONFIG;
}
