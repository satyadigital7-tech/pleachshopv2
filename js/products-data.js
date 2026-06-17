/**
 * Pleach Shop - E-Commerce Products Database (30 Heritage Products mapped to assets)
 */

const PRODUCTS_DATA = [
  // --- T-SHIRTS (5 Products) ---
  {
    id: "prod-tee-01",
    name: "Heritage Mandala Print Tee",
    brand: "Pleach Wear",
    category: "T-Shirts",
    price: 1399,
    originalPrice: 2499,
    discount: 44,
    rating: 4.9,
    reviewsCount: 121,
    image: "assets/image 16.png",
    additionalImages: ["assets/image 16.png"],
    availability: true,
    deliveryDays: 3,
    description: "Premium black cotton tee presenting fine floral symmetry and traditional mandala aesthetics. Screenprinted with high-durability golden and silver metallic inks that resist cracking and fading over time.",
    specifications: {
      "Material": "100% Long-Staple Ring-spun Cotton",
      "Fit": "Regular Fit",
      "Print": "Metallic Screenprint (Mandala Pattern)",
      "Style": "Unisex Crew Neck",
      "Origin": "Made in India",
      "Care Instructions": "Machine wash cold inside out, tumble dry low"
    },
    faqs: [
      { q: "Is the print texture scratchy?", a: "No, the screenprint is cured using soft-hand inks which feel smooth against the skin." },
      { q: "Does the size run true?", a: "Yes, it runs true to standard international sizing. Order your usual size for a comfortable regular fit." }
    ],
    isDeal: true,
    isBestSeller: true
  },
  {
    id: "prod-tee-02",
    name: "Sanchi Stupa Archway Tee",
    brand: "Pleach Wear",
    category: "T-Shirts",
    price: 1499,
    originalPrice: 2799,
    discount: 46,
    rating: 4.8,
    reviewsCount: 87,
    image: "assets/image 17.png",
    additionalImages: ["assets/image 17.png"],
    availability: true,
    deliveryDays: 3,
    description: "Detailed graphic print of the historic gateways of the Sanchi Stupa on premium soft fabric. Captures the architectural grandeur of Buddhist ancient carvings with exquisite line drawings on a charcoal base.",
    specifications: {
      "Material": "100% Long-Staple Cotton",
      "Fit": "Relaxed Fit",
      "Print": "Monochrome Architectural Line Art",
      "Style": "Unisex Drop Shoulder",
      "Origin": "Made in India",
      "Care Instructions": "Wash inside out with similar colors"
    },
    faqs: [
      { q: "Is the material heavy?", a: "It is a comfortable 220 GSM heavyweight cotton, providing a premium fall and structured look." }
    ],
    isDeal: false,
    isBestSeller: true
  },
  {
    id: "prod-tee-03",
    name: "Floral Motif Royal Tee",
    brand: "Pleach Wear",
    category: "T-Shirts",
    price: 1299,
    originalPrice: 2299,
    discount: 43,
    rating: 4.7,
    reviewsCount: 64,
    image: "assets/image 22.png",
    additionalImages: ["assets/image 22.png"],
    availability: true,
    deliveryDays: 4,
    description: "Elegant t-shirt displaying stylized botanical design structures inspired by heritage palace walls and arches. Perfect for blending casual comfort with royal aesthetics.",
    specifications: {
      "Material": "Ringspun Cotton Blend (85% Cotton, 15% Polyester)",
      "Fit": "Regular Fit",
      "Print": "Palace Floral Motif Line Art",
      "Style": "Unisex Crew Neck",
      "Origin": "Made in India",
      "Care Instructions": "Do not iron directly on print"
    },
    faqs: [
      { q: "Is it pre-shrunk?", a: "Yes, all our tees undergo a pre-shrinking process to ensure they retain their shape after washing." }
    ],
    isDeal: true,
    isBestSeller: false
  },
  {
    id: "prod-tee-04",
    name: "Geometric Pillar Draft Tee",
    brand: "Pleach Wear",
    category: "T-Shirts",
    price: 1399,
    originalPrice: 2499,
    discount: 44,
    rating: 4.9,
    reviewsCount: 43,
    image: "assets/image 23.png",
    additionalImages: ["assets/image 23.png"],
    availability: true,
    deliveryDays: 3,
    description: "Modern line drawings of temple pillars and geometric drafts screenprinted in metallic paint colors. Gives a bold, retro-technical architectural vibe.",
    specifications: {
      "Material": "100% Premium Combed Cotton",
      "Fit": "Structured Fit",
      "Print": "Blueprint Line Work",
      "Style": "Unisex Crew Neck",
      "Origin": "Made in India",
      "Care Instructions": "Machine wash cold inside out"
    },
    faqs: [
      { q: "Does the print fade over time?", a: "No, we use high-grade plastisol ink which is cured at high temperatures to ensure lifetime durability." }
    ],
    isDeal: false,
    isBestSeller: false
  },
  {
    id: "prod-tee-05",
    name: "Sacred Archway Sketch Tee",
    brand: "Pleach Wear",
    category: "T-Shirts",
    price: 1449,
    originalPrice: 2699,
    discount: 46,
    rating: 4.8,
    reviewsCount: 59,
    image: "assets/image 24.png",
    additionalImages: ["assets/image 24.png"],
    availability: true,
    deliveryDays: 3,
    description: "Finely sketched historic gate archways on a lightweight breathable organic canvas tee. Features minimal and crisp aesthetic lines suitable for streetwear styling.",
    specifications: {
      "Material": "100% Certified Organic Cotton",
      "Fit": "Relaxed Regular Fit",
      "Print": "Fine Sketch Line Art Overlay",
      "Style": "Unisex Ribbed Neck",
      "Origin": "Made in India",
      "Care Instructions": "Tumble dry low, warm iron if needed"
    },
    faqs: [
      { q: "Is it transparent?", a: "No, it is a high-density 180 GSM cotton fabric that is completely opaque and durable." }
    ],
    isDeal: true,
    isBestSeller: false
  },

  // --- CAPS (6 Products) ---
  {
    id: "prod-cap-01",
    name: "Lotus Pillars Embroidered Cap",
    brand: "Pleach Sports",
    category: "Caps",
    price: 699,
    originalPrice: 1299,
    discount: 46,
    rating: 4.8,
    reviewsCount: 140,
    image: "assets/side-angle-baseball-cap-mockup-in-white-studio-0026 1.png",
    additionalImages: [
      "assets/side-angle-baseball-cap-mockup-in-white-studio-0026 1.png",
      "assets/young-model-wearing-basecall-cap-mockup-in-street-during-the-day-0027 1.png"
    ],
    availability: true,
    deliveryDays: 3,
    description: "Intricate 3D embroidery detailing of classic lotus pillar capitals on a clean white baseball cap. Features premium structured panels and an adjustable metal buckle strapback closure for a customizable fit.",
    specifications: {
      "Material": "100% Brushed Cotton Twill",
      "Style": "6-Panel Structured Baseball Cap",
      "Design": "Lotus Pillar Capital Embroidery",
      "Closure": "Adjustable Metal Strapback Buckle",
      "Origin": "Made in India",
      "Size": "Free Size (Adjustable)"
    },
    faqs: [
      { q: "Is the strap adjustable?", a: "Yes, it features a premium sliding metal buckle that allows you to easily adjust the cap's circumference." },
      { q: "How should I clean the cap?", a: "Hand wash in cold water with mild detergent is recommended to protect the structured front panel and embroidery." }
    ],
    isDeal: true,
    isBestSeller: true
  },
  {
    id: "prod-cap-02",
    name: "Royal Arch Heritage Cap",
    brand: "Pleach Sports",
    category: "Caps",
    price: 749,
    originalPrice: 1499,
    discount: 50,
    rating: 4.9,
    reviewsCount: 110,
    image: "assets/young-model-wearing-basecall-cap-mockup-in-street-during-the-day-0027 1.png",
    additionalImages: [
      "assets/young-model-wearing-basecall-cap-mockup-in-street-during-the-day-0027 1.png",
      "assets/side-angle-baseball-cap-mockup-in-white-studio-0026 1.png"
    ],
    availability: true,
    deliveryDays: 2,
    description: "Stylized premium model cap printed with fine red and gold arch contours. Blends classic streetwear vibes with rich historical structural details, perfect for everyday outdoor sun protection.",
    specifications: {
      "Material": "Premium Cotton Twill Blend",
      "Style": "6-Panel Low Profile Cap",
      "Design": "Royal Arch Geometric Patterns",
      "Closure": "Snapback closure",
      "Origin": "Made in India",
      "Size": "Standard Adjustable"
    },
    faqs: [
      { q: "Is the cap unisex?", a: "Yes, all Pleach Caps are designed for both men and women." }
    ],
    isDeal: false,
    isBestSeller: true
  },
  {
    id: "prod-cap-03",
    name: "Mandala Embroidered Cap",
    brand: "Pleach Sports",
    category: "Caps",
    price: 699,
    originalPrice: 1299,
    discount: 46,
    rating: 4.8,
    reviewsCount: 76,
    image: "assets/mockup_18 1.jpg",
    additionalImages: ["assets/mockup_18 1.jpg"],
    availability: true,
    deliveryDays: 3,
    description: "Features a rich center mandala embroidered in high-density gold threads on a black cotton twill base. Designed to add a statement art detail to simple urban streetwear ensembles.",
    specifications: {
      "Material": "Embroidered Twill Canvas Cotton",
      "Style": "5-Panel Structured A-Frame",
      "Design": "Radial Mandala Gold Embroidery",
      "Closure": "Adjustable Strapback with metal clasp",
      "Size": "Free Size (Adjustable)"
    },
    faqs: [
      { q: "Is the embroidery gold thread metallic?", a: "Yes, it uses premium gold embroidery thread which has a subtle, premium sheen." }
    ],
    isDeal: true,
    isBestSeller: false
  },
  {
    id: "prod-cap-04",
    name: "Sacred Geometry Casual Cap",
    brand: "Pleach Sports",
    category: "Caps",
    price: 649,
    originalPrice: 1199,
    discount: 45,
    rating: 4.7,
    reviewsCount: 59,
    image: "assets/image 18.jpg",
    additionalImages: ["assets/image 18.jpg"],
    availability: true,
    deliveryDays: 3,
    description: "Adjustable strapback hat displaying historical sacred geometry designs. Features a semi-structured crown and matching eyelets for breathability.",
    specifications: {
      "Material": "100% Cotton Canvas",
      "Style": "6-Panel Semi-Structured Cap",
      "Design": "Geometric Contour Print",
      "Closure": "Adjustable Fabric Buckle Strap",
      "Size": "Adjustable (55-60 cm)"
    },
    faqs: [
      { q: "Is it breathable?", a: "Yes, it features embroidered ventilation eyelets which keep your head cool during workouts." }
    ],
    isDeal: false,
    isBestSeller: false
  },
  {
    id: "prod-cap-05",
    name: "Temple Blueprints Casual Hat",
    brand: "Pleach Sports",
    category: "Caps",
    price: 699,
    originalPrice: 1399,
    discount: 50,
    rating: 4.8,
    reviewsCount: 48,
    image: "assets/image 15.jpg",
    additionalImages: ["assets/image 15.jpg"],
    availability: true,
    deliveryDays: 3,
    description: "Stylish blueprint sketches of sacred sites detailed on structured panels. White architectural drafting lines on a premium dark gray crown.",
    specifications: {
      "Material": "Heavy Cotton Twill",
      "Style": "Classic Structured Cap",
      "Design": "Temple Blueprint Ink Print",
      "Closure": "Slide buckle back strap",
      "Size": "Free Size"
    },
    faqs: [
      { q: "Will the ink run if it gets wet?", a: "No, we use water-proof screenprinting inks that do not bleed or smudge in the rain or during sweats." }
    ],
    isDeal: false,
    isBestSeller: false
  },
  {
    id: "prod-cap-06",
    name: "Ancient Motifs Classic Cap",
    brand: "Pleach Sports",
    category: "Caps",
    price: 699,
    originalPrice: 1299,
    discount: 46,
    rating: 4.9,
    reviewsCount: 32,
    image: "assets/image 14.png",
    additionalImages: ["assets/image 14.png"],
    availability: true,
    deliveryDays: 3,
    description: "A comfortable heritage dad hat embroidered with small ancient monument outlines. Made from washed twill cotton for a pre-worn vintage look.",
    specifications: {
      "Material": "Brushed Twill Cotton (Washed finish)",
      "Style": "Unstructured Dad Hat",
      "Design": "Minimal Heritage Monuments Embroidery",
      "Closure": "Adjustable brass buckle strap",
      "Size": "Adjustable"
    },
    faqs: [
      { q: "Is the cap structured or soft?", a: "It is unstructured and soft, giving a relaxed vintage fit that conforms to your head shape." }
    ],
    isDeal: true,
    isBestSeller: false
  },

  // --- MUGS (5 Products) ---
  {
    id: "prod-mug-01",
    name: "Ajanta Caves Heritage Mug",
    brand: "Pleach Living",
    category: "Mugs",
    price: 649,
    originalPrice: 1199,
    discount: 45,
    rating: 4.9,
    reviewsCount: 58,
    image: "assets/image 19.png",
    additionalImages: ["assets/image 19.png"],
    availability: true,
    deliveryDays: 3,
    description: "A gorgeous dark glazed ceramic mug featuring historical reliefs and artwork of the Ajanta Caves. Brings historical luxury to your early morning coffee or evening tea routine.",
    specifications: {
      "Material": "High-Quality Glazed Ceramic",
      "Capacity": "350 ml",
      "Finish": "Glossy Dark Glaze",
      "Safety": "Microwave and Dishwasher Safe",
      "Origin": "Made in India",
      "Weight": "320g"
    },
    faqs: [
      { q: "Is the print dishwasher safe?", a: "Yes, the glaze coating is fired at 1200 degrees Celsius, making the design permanent and dishwasher safe." }
    ],
    isDeal: false,
    isBestSeller: false
  },
  {
    id: "prod-mug-02",
    name: "Imperial Palace Stone Mug",
    brand: "Pleach Living",
    category: "Mugs",
    price: 649,
    originalPrice: 1199,
    discount: 45,
    rating: 4.8,
    reviewsCount: 142,
    image: "assets/image 20.png",
    additionalImages: ["assets/image 20.png"],
    availability: true,
    deliveryDays: 4,
    description: "A matte-finish ceramic mug styled with stone carving linework details representing palace pillars. Features an ergonomic, comfortable handle for a sturdy grip.",
    specifications: {
      "Material": "Ceramic Stoneware",
      "Capacity": "330 ml",
      "Finish": "Matte Stone Finish",
      "Safety": "Microwave Safe, Hand wash recommended",
      "Origin": "Made in India"
    },
    faqs: [
      { q: "Does the matte surface scratch easily?", a: "No, it features a scratch-resistant hard-baked stoneware layer to handle daily metal spoon usage." }
    ],
    isDeal: true,
    isBestSeller: true
  },
  {
    id: "prod-mug-03",
    name: "Lotus Petal Line Art Mug",
    brand: "Pleach Living",
    category: "Mugs",
    price: 599,
    originalPrice: 1099,
    discount: 45,
    rating: 4.7,
    reviewsCount: 79,
    image: "assets/image 25.png",
    additionalImages: ["assets/image 25.png"],
    availability: true,
    deliveryDays: 3,
    description: "Elegant lotus capital pillar details wrapped around high-fire ceramic stoneware. Incorporates classic architectural relief lines into a premium white ceramic outline.",
    specifications: {
      "Material": "High-Fire Stoneware Ceramic",
      "Capacity": "350 ml",
      "Finish": "Semi-Glossy White Glaze",
      "Safety": "Microwave & Dishwasher Safe",
      "Origin": "Made in India"
    },
    faqs: [
      { q: "Is the interior stained by coffee?", a: "The inner glazed layer is non-porous and will not stain if rinsed after use." }
    ],
    isDeal: false,
    isBestSeller: false
  },
  {
    id: "prod-mug-04",
    name: "Ancient Columns Ceramic Mug",
    brand: "Pleach Living",
    category: "Mugs",
    price: 699,
    originalPrice: 1299,
    discount: 46,
    rating: 4.9,
    reviewsCount: 95,
    image: "assets/image 26.png",
    additionalImages: ["assets/image 26.png"],
    availability: true,
    deliveryDays: 3,
    description: "A heavyweight coffee mug with detailed sketches of classical temple pillars. Excellent gift choice for architects, history buffs, and art collectors.",
    specifications: {
      "Material": "Glazed Stoneware Ceramic",
      "Capacity": "400 ml (Large)",
      "Finish": "Glossy Glaze Finish",
      "Safety": "Microwave and Dishwasher safe",
      "Origin": "Made in India"
    },
    faqs: [
      { q: "Is the mug heavy?", a: "Yes, it is a sturdy 380g stoneware mug designed with thick walls to keep your beverage hot for longer." }
    ],
    isDeal: true,
    isBestSeller: true
  },
  {
    id: "prod-mug-05",
    name: "Sacred Radial Mandala Mug",
    brand: "Pleach Living",
    category: "Mugs",
    price: 599,
    originalPrice: 1099,
    discount: 45,
    rating: 4.8,
    reviewsCount: 110,
    image: "assets/image 27.png",
    additionalImages: ["assets/image 27.png"],
    availability: true,
    deliveryDays: 3,
    description: "Featuring a radial mandalic outline in golden metallic foil print detailing on a white stoneware backdrop. Adds a high-end luxury feel to your tea-time setup.",
    specifications: {
      "Material": "Stoneware with Metallic Gold Foiling",
      "Capacity": "330 ml",
      "Finish": "Metallic Foil Accent Glossy Glaze",
      "Safety": "Hand Wash Only (Do NOT microwave)",
      "Origin": "Made in India"
    },
    faqs: [
      { q: "Why can't this be placed in the microwave?", a: "The design is printed using real metallic gold elements, which will trigger sparks in a microwave." }
    ],
    isDeal: false,
    isBestSeller: false
  },

  // --- TOTE BAGS (5 Products) ---
  {
    id: "prod-tote-01",
    name: "Monolithic Temple Canvas Tote",
    brand: "Pleach Bags",
    category: "Tote Bags",
    price: 849,
    originalPrice: 1599,
    discount: 46,
    rating: 4.7,
    reviewsCount: 93,
    image: "assets/image 21.png",
    additionalImages: ["assets/image 21.png"],
    availability: true,
    deliveryDays: 3,
    description: "Heavy canvas carrier displaying detailed blueprints of a monolithic shrine. Sturdy build makes it ideal for carrying laptops, textbooks, groceries, or daily travel essentials.",
    specifications: {
      "Material": "12oz Heavy Organic Cotton Canvas",
      "Dimensions": "15 x 16 Inches (Flat)",
      "Handle Length": "11 Inches (Comfortable drop)",
      "Interior Pocket": "Yes (Zippered for phone/keys)",
      "Origin": "Made in India",
      "Wash Care": "Hand wash cold, line dry"
    },
    faqs: [
      { q: "Is it zippered at the top?", a: "No, this is a classic open-top tote bag, but it features an interior zippered pouch for secure item organization." }
    ],
    isDeal: true,
    isBestSeller: true
  },
  {
    id: "prod-tote-02",
    name: "Lotus Capital Sketch Tote",
    brand: "Pleach Bags",
    category: "Tote Bags",
    price: 799,
    originalPrice: 1499,
    discount: 46,
    rating: 4.8,
    reviewsCount: 72,
    image: "assets/image 28.png",
    additionalImages: ["assets/image 28.png"],
    availability: true,
    deliveryDays: 4,
    description: "Stylish eco-friendly tote bag depicting architectural capital reliefs and organic patterns. Features clean lines screenprinted on a natural cotton backdrop.",
    specifications: {
      "Material": "100% Unbleached Cotton Canvas",
      "Dimensions": "14 x 16 inches",
      "Handle Drop": "10.5 inches",
      "Features": "Double-stitched seams for extra strength",
      "Origin": "Made in India"
    },
    faqs: [
      { q: "Can this bag hold a 15-inch laptop?", a: "Yes, it easily holds laptops up to 15.6 inches along with chargers and notebook files." }
    ],
    isDeal: false,
    isBestSeller: false
  },
  {
    id: "prod-tote-03",
    name: "Historical Monolith Columns Tote",
    brand: "Pleach Bags",
    category: "Tote Bags",
    price: 899,
    originalPrice: 1699,
    discount: 47,
    rating: 4.9,
    reviewsCount: 61,
    image: "assets/image 29.png",
    additionalImages: ["assets/image 29.png"],
    availability: true,
    deliveryDays: 3,
    description: "Features majestic columns and motifs from traditional South Asian temple ruins. Crafted with reinforced base elements to prevent sagging and handle high loads.",
    specifications: {
      "Material": "14oz Heavyweight Canvas Cotton",
      "Dimensions": "16 x 15 x 3 inches (Gusseted bottom)",
      "Handle Drop": "11 inches",
      "Safety": "Magnetic button main closure",
      "Origin": "Made in India"
    },
    faqs: [
      { q: "Does it have a bottom gusset?", a: "Yes, it has a 3-inch bottom gusset that allows the bag to expand and stand structured when filled." }
    ],
    isDeal: true,
    isBestSeller: true
  },
  {
    id: "prod-tote-04",
    name: "Mandala Patterned Heavy Tote",
    brand: "Pleach Bags",
    category: "Tote Bags",
    price: 949,
    originalPrice: 1899,
    discount: 50,
    rating: 4.8,
    reviewsCount: 84,
    image: "assets/image 30.png",
    additionalImages: ["assets/image 30.png"],
    availability: true,
    deliveryDays: 3,
    description: "Premium large storage tote bag with radial mandalas on both sides. Heavy duty 16oz canvas makes it the most robust utility bag in our collection.",
    specifications: {
      "Material": "16oz Extra-Thick Cotton Canvas",
      "Dimensions": "17 x 15 x 4 inches",
      "Closure": "Full metal zipper closure",
      "Pockets": "1 Outer slip pocket + 1 Inner zipped pocket",
      "Origin": "Made in India"
    },
    faqs: [
      { q: "Is the zipper durable?", a: "Yes, it features a heavy-duty YKK brass zipper for smooth, long-term operation." }
    ],
    isDeal: false,
    isBestSeller: false
  },
  {
    id: "prod-tote-05",
    name: "Ajanta Fresco Royal Tote",
    brand: "Pleach Bags",
    category: "Tote Bags",
    price: 899,
    originalPrice: 1699,
    discount: 47,
    rating: 4.9,
    reviewsCount: 37,
    image: "assets/mockup_11 1.png",
    additionalImages: ["assets/mockup_11 1.png"],
    availability: true,
    deliveryDays: 3,
    description: "Artistic historical print layout on a premium thick cotton canvas tote bag. Features classical cave fresco vectors that represent a milestone in ancient Indian painting.",
    specifications: {
      "Material": "12oz Premium Canvas Cotton",
      "Dimensions": "15 x 15 Inches",
      "Handle Drop": "11 Inches",
      "Print Method": "Eco-friendly screen-printing dyes",
      "Origin": "Made in India"
    },
    faqs: [
      { q: "Will the colors bleed if washed?", a: "No, the pigments are heat-set into the canvas fibers. Wash in cold water to keep colors vibrant." }
    ],
    isDeal: false,
    isBestSeller: false
  },

  // --- PHONE CASES (4 Products) ---
  {
    id: "prod-case-01",
    name: "Sacred Mandala Tough Case",
    brand: "Pleach Shield",
    category: "Phone Cases",
    price: 449,
    originalPrice: 899,
    discount: 50,
    rating: 4.7,
    reviewsCount: 130,
    image: "assets/bc7a184d6833121b171949a4a57d5ab9 (1) 1.png",
    additionalImages: ["assets/bc7a184d6833121b171949a4a57d5ab9 (1) 1.png"],
    availability: true,
    deliveryDays: 3,
    description: "A highly protective, shock-absorbent shell styled with gold-toned sacred vectors. Features dual-layer protection consisting of a hard outer polycarbonate shell and a soft inner TPU impact liner.",
    specifications: {
      "Material": "Polycarbonate Tough Shell + Shockproof TPU Liner",
      "Thickness": "2.0 mm (Ultra Protection)",
      "Drop Protection": "Up to 8 Feet (Military Grade)",
      "Compatibility": "iPhone 13 / 14 / 15 / 16 (Pro, Pro Max)",
      "Wireless Charging": "Fully Compatible (MagSafe support)"
    },
    faqs: [
      { q: "Is the case heavy?", a: "It provides robust dual-layer protection but maintains a lightweight profile (approx 35 grams)." }
    ],
    isDeal: true,
    isBestSeller: true
  },
  {
    id: "prod-case-02",
    name: "Temple Pillars Outline Case",
    brand: "Pleach Shield",
    category: "Phone Cases",
    price: 399,
    originalPrice: 799,
    discount: 50,
    rating: 4.8,
    reviewsCount: 104,
    image: "assets/image 31.png",
    additionalImages: ["assets/image 31.png"],
    availability: true,
    deliveryDays: 2,
    description: "Slim fitting transparent cover printed with structural architectural sketches of traditional temple pillars. Perfect for keeping the native color of your device visible while showcasing heritage line art.",
    specifications: {
      "Material": "Clear TPU Silicone Bumper + Hard Acrylic Back Plate",
      "Thickness": "1.2 mm (Ultra Slim)",
      "Anti-Yellowing": "Yes (Formulated with UV inhibitors)",
      "Raised Lips": "Yes (0.5mm screen lip, 1.2mm camera lip)",
      "Wireless Charging": "Yes, compatible"
    },
    faqs: [
      { q: "Does the clear plastic yellow over time?", a: "Our cases use high-end German TPU elements that resist yellowing for up to 12 months under standard sun exposure." }
    ],
    isDeal: false,
    isBestSeller: false
  },
  {
    id: "prod-case-03",
    name: "Sacred Geometries Matte Case",
    brand: "Pleach Shield",
    category: "Phone Cases",
    price: 499,
    originalPrice: 999,
    discount: 50,
    rating: 4.9,
    reviewsCount: 78,
    image: "assets/image 32.jpg",
    additionalImages: ["assets/image 32.jpg"],
    availability: true,
    deliveryDays: 3,
    description: "Premium shockproof cover featuring matte geometric radial illustrations. Tactile matte texture prevents fingerprints, smudges, and slips while offering comfortable in-hand grip.",
    specifications: {
      "Material": "Impact-Resistant TPU + Polycarbonate Backing",
      "Finish": "Anti-fingerprint Matte coating",
      "Protection": "Air-cushioned corners",
      "Buttons": "Independent contrast metal button covers",
      "Compatibility": "Various iOS & Android flagship models"
    },
    faqs: [
      { q: "Is the back of the case scratch-proof?", a: "Yes, the matte finish has a hard-cured layer that resists keys and coins inside pockets." }
    ],
    isDeal: true,
    isBestSeller: true
  },
  {
    id: "prod-case-04",
    name: "Ancient Archways Contour Case",
    brand: "Pleach Shield",
    category: "Phone Cases",
    price: 399,
    originalPrice: 799,
    discount: 50,
    rating: 4.6,
    reviewsCount: 55,
    image: "assets/image 33.png",
    additionalImages: ["assets/image 33.png"],
    availability: true,
    deliveryDays: 3,
    description: "Detailed contours of temple doorways printed in high-density ink overlays on a clear shock-absorbent shell. Provides scratch protection with high artistic detail.",
    specifications: {
      "Material": "Flexible TPU Silicone Shell",
      "Thickness": "1.5 mm",
      "Finish": "High-density embossed textured print",
      "Accessibility": "Precise cutouts for port and speakers",
      "Origin": "Made in India"
    },
    faqs: [
      { q: "Does the printed texture peel off?", a: "We use UV-cured ink embossing technology. The print is bonded directly to the TPU and will not peel or flake." }
    ],
    isDeal: false,
    isBestSeller: false
  },

  // --- LAPTOP SKINS (5 Products) ---
  {
    id: "prod-skin-01",
    name: "Mughal Jaali Palace Skin",
    brand: "Pleach Tech",
    category: "Laptop Skins",
    price: 549,
    originalPrice: 999,
    discount: 45,
    rating: 4.9,
    reviewsCount: 153,
    image: "assets/laptop-cover-mockup 1.jpg",
    additionalImages: [
      "assets/laptop-cover-mockup 1.jpg",
      "assets/laptop-cover-mockup (1) 1.png"
    ],
    availability: true,
    deliveryDays: 3,
    description: "A textured premium sticker vinyl skin showcasing beautiful royal arch screens and Mughal jaali design details. Protects your laptop lid from scratches, dust, and fingerprint smudges.",
    specifications: {
      "Material": "Premium 3M Cast Vinyl with Matte Overlaminate",
      "Thickness": "0.18 mm",
      "Compatibility": "Universal 15.6 inch (easy trim-to-fit)",
      "Adhesive": "Pressure-activated air-release channels (bubble-free)",
      "Removability": "100% residue-free removal",
      "Origin": "Made in India"
    },
    faqs: [
      { q: "Will it fit my 13-inch Macbook?", a: "Yes, the skin comes as a standard 15.6-inch sheet with grid lines on the back, allowing you to easily trim it down to fit 13-inch and 14-inch laptops." },
      { q: "Does it leave glue residue when removed?", a: "No, we use original 3M cast vinyl adhesive, which can be peeled off cleanly without leaving any sticky residue even after years of use." }
    ],
    isDeal: false,
    isBestSeller: true
  },
  {
    id: "prod-skin-02",
    name: "Radial Sacred Mandala Skin",
    brand: "Pleach Tech",
    category: "Laptop Skins",
    price: 499,
    originalPrice: 899,
    discount: 44,
    rating: 4.8,
    reviewsCount: 92,
    image: "assets/laptop-cover-mockup (1) 1.png",
    additionalImages: [
      "assets/laptop-cover-mockup (1) 1.png",
      "assets/laptop-cover-mockup 1.jpg"
    ],
    availability: true,
    deliveryDays: 3,
    description: "High resolution golden mandalas with clean symmetry for laptop back covers. Protects your device shell while maintaining a calm and meditative workspace aesthetic.",
    specifications: {
      "Material": "3M Bubble-free vinyl sticker",
      "Thickness": "0.15 mm",
      "Finish": "Scratch-resistant matte finish",
      "Compatibility": "Universal (trim-to-fit)",
      "Origin": "Made in India"
    },
    faqs: [
      { q: "Is it waterproof?", a: "Yes, the vinyl is waterproof and can be wiped clean with a damp cloth without affecting the print quality." }
    ],
    isDeal: true,
    isBestSeller: false
  },
  {
    id: "prod-skin-03",
    name: "Archway Columns Laptop Skin",
    brand: "Pleach Tech",
    category: "Laptop Skins",
    price: 529,
    originalPrice: 999,
    discount: 47,
    rating: 4.7,
    reviewsCount: 80,
    image: "assets/image 34.png",
    additionalImages: ["assets/image 34.png"],
    availability: true,
    deliveryDays: 3,
    description: "Line art blueprints of traditional temple pillars and arches. Designed in dark colors to blend perfectly with sleek modern notebooks.",
    specifications: {
      "Material": "Premium Cast Vinyl",
      "Adhesive": "Residue-free air-egress technology",
      "Finish": "Anti-glare Matte",
      "Dimensions": "15 x 10 Inches (Standard size)"
    },
    faqs: [
      { q: "Does it block heat dissipation?", a: "No, the skin is applied only on the top lid of the laptop. It does not block any ventilation vents on the bottom or side of your notebook." }
    ],
    isDeal: false,
    isBestSeller: false
  },
  {
    id: "prod-skin-04",
    name: "Stone Figurine Radial Skin",
    brand: "Pleach Tech",
    category: "Laptop Skins",
    price: 499,
    originalPrice: 899,
    discount: 44,
    rating: 4.8,
    reviewsCount: 47,
    image: "assets/image 35.png",
    additionalImages: ["assets/image 35.png"],
    availability: true,
    deliveryDays: 3,
    description: "Unique design presenting historical stone carvings and radial mandala patterns in high definition. A highly artistic cover for creative professionals.",
    specifications: {
      "Material": "Textured Matte Cast Vinyl",
      "Thickness": "0.20 mm (Extra scratch protection)",
      "Removability": "Easy peel, zero glue residue",
      "Origin": "Made in India"
    },
    faqs: [
      { q: "Is it easy to apply?", a: "Yes, the air-release channels prevent bubbles from forming. Just align on the lid, apply light pressure, and trim excess boundaries." }
    ],
    isDeal: true,
    isBestSeller: true
  },
  {
    id: "prod-skin-05",
    name: "Monolith Blueprint Desk Mat",
    brand: "Pleach Tech",
    category: "Laptop Skins",
    price: 799,
    originalPrice: 1499,
    discount: 47,
    rating: 4.8,
    reviewsCount: 62,
    image: "assets/image 37.png",
    additionalImages: ["assets/image 37.png"],
    availability: true,
    deliveryDays: 3,
    description: "A smooth desk mat illustrating archeological temple blueprints. Features thick rubber base cushioning and anti-fray stitched borders to keep your desk surface protected and clean.",
    specifications: {
      "Material": "Ultra-smooth Micro-weave fabric + Anti-slip rubber base",
      "Dimensions": "700 x 300 x 3 mm (Medium size)",
      "Stitched Edges": "Yes (Anti-fray high density stitching)",
      "Water Resistance": "Spill-proof coating",
      "Origin": "Made in India"
    },
    faqs: [
      { q: "Can this desk mat be washed?", a: "Yes, it is hand-washable with cold water. We recommend mild detergent and natural air drying." }
    ],
    isDeal: false,
    isBestSeller: false
  },
  {
    id: "prod-toy-01",
    name: "Heritage Sacred Mandala Jigsaw Puzzle (500 Pieces)",
    brand: "Pleach Toys",
    category: "Toys & Puzzles",
    price: 899,
    originalPrice: 1699,
    discount: 47,
    rating: 4.8,
    reviewsCount: 145,
    image: "assets/puzzle img.png",
    additionalImages: ["assets/puzzle img.png"],
    availability: true,
    deliveryDays: 3,
    description: "Unravel the rich geometry of traditional sacred mandalas with this premium 500-piece wooden jigsaw puzzle. Precision laser-cut from high-quality birch wood, each piece features organic shapes and unique whimsies. A relaxing and meditative experience for individuals and families alike.",
    specifications: {
      "Material": "Premium Eco-Friendly Birch Wood",
      "Dimensions": "15 x 15 Inches (Assembled)",
      "Piece Count": "500 Pieces",
      "Complexity": "Medium to Advanced",
      "Recommended Age": "8 Years and above",
      "Origin": "Made in India"
    },
    faqs: [
      { q: "Are there any unique piece shapes?", a: "Yes! It features laser-cut whimsies in shapes of ancient temple motifs and traditional symbols." },
      { q: "What do I do if a piece is missing?", a: "Contact our BKC customer support and we will ship the missing piece to you free of charge." }
    ],
    isDeal: true,
    isBestSeller: true
  }
];

// Helper functions for data access
function getProductById(id) {
  return PRODUCTS_DATA.find(p => p.id === id);
}

function getProductsByCategory(category) {
  return PRODUCTS_DATA.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

function searchProducts(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return PRODUCTS_DATA.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.category.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q)
  );
}
