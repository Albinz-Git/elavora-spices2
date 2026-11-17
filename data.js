/* ==========================================================================
   Elavora Spices — site content
   Add, remove or edit items here; every page that lists them updates itself.

   PRODUCTS
   - id          unique, lowercase, no spaces (used by a future cart / checkout)
   - category    one of the keys in CATEGORIES below
   - status      "available"  -> shows pack sizes + "Order now"
                 "enquire"    -> shows "Ask on WhatsApp" (use until you add pack photos & prices)
   - variants    each pack size; add  price: 450  to show a price (blank = "Price on request")
   - featured    true = shown on the home page
   ========================================================================== */

window.CATEGORIES = [
  { key: "all", label: "All spices" },
  { key: "cardamom", label: "Cardamom" },
  { key: "pepper", label: "Pepper" },
  { key: "bark-buds", label: "Bark & buds" },
  { key: "roots-pods", label: "Roots & pods" }
];

window.PRODUCTS = [
  {
    id: "green-cardamom-seeds",
    name: "Green Cardamom Seeds",
    ml: "ഏലം",
    category: "cardamom",
    status: "available",
    featured: true,
    badge: "Our signature",
    summary: "Carefully selected from the hills, bringing you pure aroma, rich flavour and the goodness of nature.",
    tags: ["cardamom", "elaichi", "elam", "ഏലം", "green", "pods", "seeds", "idukki", "tea", "biryani", "sweets"],
    image: "cardamom-250g.jpg",
    variants: [
      { size: "100 g", pack: "Jar", image: "cardamom-100g.jpg", price: null },
      { size: "250 g", pack: "Pouch", image: "cardamom-250g.jpg", price: null },
      { size: "500 g", pack: "Pouch", image: "cardamom-500g.jpg", price: null },
      { size: "1 kg", pack: "Pouch", image: "cardamom-1kg.jpg", price: null }
    ],
    highlights: ["100% natural", "No preservatives", "Rich aroma"],
    // Values below are copied from the 100 g label design. Please verify them before publishing.
    nutrition: {
      per: "100 g (approx.)",
      rows: [["Energy", "311 kcal"], ["Protein", "10 g"], ["Carbohydrate", "68 g"], ["Total fat", "7 g"], ["Fibre", "28 g"]]
    },
    storage: "Store in a cool, dry place, away from direct sunlight. Keep the pack tightly closed after use. Best before 12 months from the date of packing."
  },
  {
    id: "black-pepper",
    name: "Black Pepper",
    ml: "കുരുമുളക്",
    category: "pepper",
    status: "enquire",
    featured: true,
    summary: "Bold, pungent peppercorns from Kerala’s spice country.",
    tags: ["pepper", "black pepper", "peppercorn", "kurumulaku", "കുരുമുളക്", "kali mirch", "idukki"],
    image: "black-pepper.png",
    variants: []
  },
  {
    id: "cloves",
    name: "Cloves",
    ml: "ഗ്രാമ്പൂ",
    category: "bark-buds",
    status: "enquire",
    featured: true,
    summary: "Intensely aromatic dried flower buds for biryani, chai and festive bakes.",
    tags: ["cloves", "clove", "grampoo", "ഗ്രാമ്പൂ", "laung", "biryani", "chai"],
    image: "cloves.png",
    variants: []
  },
  {
    id: "cinnamon",
    name: "Cinnamon",
    ml: "കറുവപ്പട്ട",
    category: "bark-buds",
    status: "enquire",
    featured: true,
    summary: "Sweet, warm bark quills for curries, desserts and spiced tea.",
    tags: ["cinnamon", "bark", "quills", "karuvapatta", "കറുവപ്പട്ട", "dalchini", "sticks"],
    image: "cinnamon.png",
    variants: []
  },
  {
    id: "star-anise",
    name: "Star Anise",
    ml: "തക്കോലം",
    category: "bark-buds",
    status: "enquire",
    summary: "Star-shaped pods with a liquorice-sweet aroma, essential in biryani and garam masala.",
    tags: ["star anise", "anise", "takkolam", "തക്കോലം", "chakra phool", "garam masala", "biryani"],
    image: "star-anise.png",
    variants: []
  },
  {
    id: "turmeric",
    name: "Turmeric",
    ml: "മഞ്ഞൾ",
    category: "roots-pods",
    status: "enquire",
    summary: "Golden roots that colour and warm everyday Kerala cooking.",
    tags: ["turmeric", "haldi", "manjal", "മഞ്ഞൾ", "root", "golden"],
    image: "turmeric.png",
    variants: []
  },
  {
    id: "nutmeg",
    name: "Nutmeg",
    ml: "ജാതിക്ക",
    category: "roots-pods",
    status: "enquire",
    summary: "Warm, sweet and nutty. Grate it fresh into sweets, sauces and milk drinks.",
    tags: ["nutmeg", "jathikka", "ജാതിക്ക", "jaiphal", "mace"],
    image: "nutmeg.png",
    variants: []
  },
  {
    id: "dried-chilli",
    name: "Dried Chilli",
    ml: "ഉണക്കമുളക്",
    category: "roots-pods",
    status: "enquire",
    summary: "Sun-dried red chillies for heat and colour.",
    tags: ["chilli", "chili", "red chilli", "dried chilli", "mulaku", "മുളക്", "ഉണക്കമുളക്", "lal mirch"],
    image: "dried-chilli.png",
    variants: []
  },
  {
    id: "vanilla",
    name: "Vanilla Beans",
    ml: "വാനില",
    category: "roots-pods",
    status: "enquire",
    summary: "Slow-cured beans with a rich, creamy fragrance for baking and desserts.",
    tags: ["vanilla", "vanilla beans", "വാനില", "pods", "baking", "dessert"],
    image: "vanilla.png",
    variants: []
  },
  {
    id: "bay-leaf",
    name: "Bay Leaf",
    ml: "",
    category: "bark-buds",
    status: "enquire",
    summary: "Fragrant leaves (tej patta) that add a gentle, woody depth to rice and curries.",
    tags: ["bay leaf", "bay leaves", "tej patta", "tejpatta", "leaf", "leaves", "rice"],
    image: "bay-leaf.png",
    variants: []
  }
];

/* ==========================================================================
   EXPLORE — spice cut-outs (transparent PNGs in assets/img/spices)
   ========================================================================== */
window.SPICES = [
  { id: "cardamom", name: "Green Cardamom", ml: "ഏലം", img: "cardamom.png", theme: "dark",
    text: "The queen of spices. Idukki’s cool, misty hills are among India’s best-known cardamom country.",
    tags: ["cardamom", "elaichi", "ഏലം", "green", "pods", "idukki"], product: "green-cardamom-seeds" },
  { id: "black-pepper", name: "Black Pepper", ml: "കുരുമുളക്", img: "black-pepper.png", theme: "light",
    text: "Kerala’s “black gold”: pungent peppercorns that have travelled the spice route for centuries.",
    tags: ["pepper", "peppercorn", "കുരുമുളക്", "kali mirch"], product: "black-pepper" },
  { id: "cloves", name: "Cloves", ml: "ഗ്രാമ്പൂ", img: "cloves.png", theme: "dark",
    text: "Dried flower buds with a deep, sweet-spicy aroma for biryani, chai and festive baking.",
    tags: ["clove", "ഗ്രാമ്പൂ", "laung"], product: "cloves" },
  { id: "cinnamon", name: "Cinnamon", ml: "കറുവപ്പട്ട", img: "cinnamon.png", theme: "light",
    text: "Rolled bark quills, sweet and warm, for curries, desserts and spiced tea.",
    tags: ["cinnamon", "bark", "കറുവപ്പട്ട", "dalchini"], product: "cinnamon" },
  { id: "star-anise", name: "Star Anise", ml: "തക്കോലം", img: "star-anise.png", theme: "dark",
    text: "Star-shaped pods with a liquorice-sweet aroma, a quiet hero of garam masala.",
    tags: ["star anise", "anise", "തക്കോലം", "chakra phool"], product: "star-anise" },
  { id: "turmeric", name: "Turmeric", ml: "മഞ്ഞൾ", img: "turmeric.png", theme: "light",
    text: "Golden roots that colour and warm everyday cooking.",
    tags: ["turmeric", "haldi", "മഞ്ഞൾ", "root"], product: "turmeric" },
  { id: "nutmeg", name: "Nutmeg", ml: "ജാതിക്ക", img: "nutmeg.png", theme: "dark",
    text: "Warm, sweet and nutty. Grate it fresh into sweets, sauces and milk.",
    tags: ["nutmeg", "ജാതിക്ക", "jaiphal", "mace"], product: "nutmeg" },
  { id: "dried-chilli", name: "Dried Chilli", ml: "ഉണക്കമുളക്", img: "dried-chilli.png", theme: "light",
    text: "Sun-dried red chillies for heat, colour and tempering.",
    tags: ["chilli", "chili", "മുളക്", "ഉണക്കമുളക്", "lal mirch"], product: "dried-chilli" },
  { id: "vanilla", name: "Vanilla Beans", ml: "വാനില", img: "vanilla.png", theme: "dark",
    text: "Slow-cured beans with a rich, creamy fragrance for baking and desserts.",
    tags: ["vanilla", "വാനില", "pods"], product: "vanilla" },
  { id: "bay-leaf", name: "Bay Leaf", ml: "", img: "bay-leaf.png", theme: "light",
    text: "Fragrant tej patta leaves that add a gentle, woody depth to rice and curries.",
    tags: ["bay leaf", "tej patta", "leaf", "leaves"], product: "bay-leaf" }
];

/* ==========================================================================
   GALLERY — photos (assets/img/gallery). tags: packs | cardamom | pepper | brand
   ========================================================================== */
window.GALLERY = [
  { src: "pouch-range.jpg", alt: "Elavora green cardamom pouches in 250 g, 500 g and 1 kg", caption: "Pouch range: 250 g, 500 g and 1 kg", tags: ["packs", "cardamom", "pouch", "250g", "500g", "1kg"] },
  { src: "jar-and-labels.jpg", alt: "100 g green cardamom jar with its front and back labels", caption: "The 100 g jar, front and back labels", tags: ["packs", "cardamom", "jar", "100g", "label"] },
  { src: "cardamom-bowl.jpg", alt: "Green cardamom pods in a wooden bowl", caption: "Green cardamom in a wooden bowl", tags: ["cardamom", "bowl", "pods"] },
  { src: "pepper-heap.jpg", alt: "A heap of black peppercorns on a wooden table", caption: "Black peppercorns", tags: ["pepper", "peppercorn", "heap"] },
  { src: "jar-lid.jpg", alt: "Elavora Spices jar lid with the gold emblem", caption: "The Elavora lid", tags: ["packs", "brand", "jar", "lid"] },
  { src: "cardamom-pile.jpg", alt: "Pile of cardamom pods with the Natural Goodness seal", caption: "Natural goodness in every pinch", tags: ["cardamom", "brand", "pile"] },
  { src: "pepper-bowl.jpg", alt: "Black pepper in a wooden bowl", caption: "Pepper, bowl-fresh", tags: ["pepper", "bowl"] },
  { src: "label-back.jpg", alt: "Back label with ingredients, nutrition and storage notes", caption: "Back label: ingredients and storage", tags: ["packs", "label", "cardamom"] },
  { src: "pepper-spoon.jpg", alt: "Pepper and cardamom on a wooden spoon", caption: "Pepper and cardamom, hand-picked", tags: ["pepper", "cardamom", "spoon"] },
  { src: "cardamom-table.jpg", alt: "Cardamom pods beside a wooden bowl on a table", caption: "Cardamom, table-side", tags: ["cardamom", "table"] },
  { src: "badge-premium.jpg", alt: "Premium quality guaranteed seal", caption: "Premium quality, guaranteed", tags: ["brand", "seal"] },
  { src: "badge-natural.jpg", alt: "Natural goodness in every pinch seal over cardamom", caption: "Natural goodness seal", tags: ["brand", "seal", "cardamom"] },
  { src: "brand-header.jpg", alt: "Elavora Spices logo and tagline: Pure spices. Rich aroma. Timeless taste.", caption: "Pure spices. Rich aroma. Timeless taste.", tags: ["brand", "logo"] }
];

window.GALLERY_FILTERS = [
  { key: "all", label: "All photos" },
  { key: "packs", label: "Packs" },
  { key: "cardamom", label: "Cardamom" },
  { key: "pepper", label: "Pepper" },
  { key: "brand", label: "Brand" }
];

/* ==========================================================================
   INSTAGRAM HIGHLIGHT CIRCLES (they all open the Instagram profile)
   ========================================================================== */
window.HIGHLIGHTS = [
  { label: "Cardamom", img: "cardamom-bowl.jpg" },
  { label: "Pepper", img: "pepper-bowl.jpg" },
  { label: "Our packs", img: "pouch-range.jpg" },
  { label: "The jar", img: "jar-lid.jpg" },
  { label: "Spices", img: "cinnamon.png", art: true },
  { label: "Idukki", img: "cardamom-pile.jpg" }
];
