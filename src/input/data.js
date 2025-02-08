import banner1 from '../assets/banner/banner1.png';
import banner2 from '../assets/banner/banner2.png';

export const banners = [
    {
      imageUrl: banner1,
      title: "Designed for Success",
      description: "Elegant & Personalized Office Essentials.",
      buttons: [
        { text: "Shop Now", color: "blue", link: "/category/Custom%20Stationery" }, // Add link
      ],
    },
    {
      imageUrl: banner2,
      title: "Wear Your Brand",
      description: "Dress the Part, Impress the World.",
      buttons: [
        { text: "Custom T-shirts", color: "blue", link: "/category/Custom%20T-shirts" },
        { text: "Custom Caps", color: "white", link: "/category/Custom%20caps" },
      ],
    },
  ];

//   export const products = [
//     {
//         id: 1,
//         title: "Visiting Cards",
//         shortDescription: "Premium quality visiting cards for all your business needs",
//         longDescription: "Our premium quality visiting cards are designed to leave a lasting impression. Made from high-quality materials, these cards offer excellent durability and a professional look. Whether you're meeting clients or networking at events, these cards will help you stand out with style and sophistication.",
//         offer: "Min. 50% Off",
//         img: "https://picsum.photos/300/300?random=2",
//         price: 250,
//         ratingCount: 150,
//         bestDeal: true,
//         category: "Visiting Cards",
//         recommended: true,
//         thumbnailImages: [
//             "https://picsum.photos/150/150?random=2-1",
//             "https://picsum.photos/150/150?random=2-2",
//             "https://picsum.photos/150/150?random=2-3",
//             "https://picsum.photos/150/150?random=2-4",
//             "https://picsum.photos/150/150?random=2-5",
//         ],
//         variants: [
//             {
//                 name: "Standard Visiting Cards",
//                 shortDescription: "Classic and professional standard visiting cards",
//                 longDescription: "Our standard visiting cards are perfect for anyone looking for a professional yet simple design. Crafted from premium paper, these cards provide a clean and polished look that is sure to make a great impression at any meeting or event.",
//                 img: "https://picsum.photos/300/300?random=3",
//             },
//             {
//                 name: "Classic Visiting Cards",
//                 shortDescription: "Elegant and timeless classic visiting cards",
//                 longDescription: "The classic visiting card design offers a timeless and elegant look. Made from high-quality paper, these cards are perfect for creating a professional identity. A must-have for any professional looking to stand out with a traditional yet sophisticated style.",
//                 img: "https://picsum.photos/300/300?random=4",
//             },
//             {
//                 name: "Rounded Corner Visiting Cards",
//                 shortDescription: "Rounded corner design for a modern and sleek look",
//                 longDescription: "With rounded corners, these visiting cards exude a modern and stylish aesthetic. The soft edges give your card a unique touch, perfect for those looking to break away from the traditional sharp-corner designs. Ideal for tech and creative professionals.",
//                 img: "https://picsum.photos/300/300?random=5",
//             },
//             {
//                 name: "Square Visiting Cards",
//                 shortDescription: "Unique square shape for a distinctive appearance",
//                 longDescription: "The square visiting card offers a bold and creative take on traditional business cards. Its unique shape ensures your card will be remembered and noticed, making it perfect for those in creative industries or anyone who wants to stand out from the crowd.",
//                 img: "https://picsum.photos/300/300?random=6",
//             },
//             {
//                 name: "Leaf Visiting Cards",
//                 shortDescription: "Leaf-shaped cards to stand out with a natural touch",
//                 longDescription: "These leaf-shaped visiting cards provide a distinctive natural look, ideal for eco-friendly businesses or anyone looking to add an organic touch to their professional identity. Crafted from recycled materials, these cards are as sustainable as they are stylish.",
//                 img: "https://picsum.photos/300/300?random=7",
//             },
//             {
//                 name: "Oval Visiting Cards",
//                 shortDescription: "Elegant oval shape for a distinct and graceful design",
//                 longDescription: "With an elegant oval shape, these visiting cards exude grace and sophistication. Perfect for professionals in fields such as fashion, consulting, or hospitality, the oval shape adds a unique touch to your business identity.",
//                 img: "https://picsum.photos/300/300?random=8",
//             },
//             {
//                 name: "Circle Visiting Cards",
//                 shortDescription: "Circular design that adds uniqueness to your branding",
//                 longDescription: "These circular visiting cards are perfect for those who want to make a bold statement. The round shape not only adds a fun twist to the traditional business card, but also symbolizes completeness and unity—ideal for creative professionals and innovators.",
//                 img: "https://picsum.photos/300/300?random=9",
//             },
//             {
//                 name: "Digital Visiting Cards",
//                 shortDescription: "Eco-friendly and tech-savvy digital visiting cards",
//                 longDescription: "Go paperless with digital visiting cards that can be easily shared and stored on smartphones. Ideal for tech-savvy professionals, these cards feature QR codes or links to your online profile, offering a convenient and eco-friendly solution for modern networking.",
//                 img: "https://picsum.photos/300/300?random=10",
//             },
//             {
//                 name: "QR Code Visiting Cards",
//                 shortDescription: "With integrated QR code for instant digital connectivity",
//                 longDescription: "QR Code visiting cards make it easier than ever to share your contact information with a simple scan. These cards are perfect for professionals who want to combine traditional networking with the convenience of digital technology.",
//                 img: "https://picsum.photos/300/300?random=11",
//             },
//             {
//                 name: "NFC Visiting Cards",
//                 shortDescription: "Smart NFC cards to share your details with a tap",
//                 longDescription: "With NFC-enabled visiting cards, you can share your contact information by simply tapping your card on a smartphone. These innovative cards combine cutting-edge technology with sleek design, perfect for tech enthusiasts and professionals in the digital age.",
//                 img: "https://picsum.photos/300/300?random=12",
//             },
//             {
//                 name: "Spot UV Visiting Cards",
//                 shortDescription: "Spot UV finishes for an elegant glossy effect",
//                 longDescription: "Add an extra touch of sophistication with Spot UV finishes. These cards are printed with a glossy coating on specific areas, making them stand out with a sleek and shiny appearance. Perfect for those looking to make a bold statement.",
//                 img: "https://picsum.photos/300/300?random=13",
//             },
//             {
//                 name: "Raised Foil Visiting Cards",
//                 shortDescription: "Premium raised foil finishes for a luxurious feel",
//                 longDescription: "Raised foil visiting cards add a luxurious touch to your business identity. The raised foil creates a textured, high-end feel, perfect for those looking to impress clients or partners with a touch of elegance and class.",
//                 img: "https://picsum.photos/300/300?random=14",
//             },
//             {
//                 name: "Glossy Visiting Cards",
//                 shortDescription: "High-gloss laminated finish for a vibrant look",
//                 longDescription: "Glossy visiting cards are designed to impress with their vibrant, high-gloss laminated finish. These cards are perfect for those in creative industries who want to showcase their business with a bright, eye-catching design.",
//                 img: "https://picsum.photos/300/300?random=15",
//             },
//             {
//                 name: "Matte Visiting Cards",
//                 shortDescription: "Elegant matte finish for a sophisticated touch",
//                 longDescription: "Matte visiting cards provide a smooth, non-reflective finish for a more understated and sophisticated look. These cards are ideal for professionals who want to convey a sense of elegance and seriousness.",
//                 img: "https://picsum.photos/300/300?random=16",
//             },
//             {
//                 name: "Magnetic Visiting Cards",
//                 shortDescription: "Magnetic cards that can stick to metal surfaces",
//                 longDescription: "Magnetic visiting cards offer a creative and practical way to stay visible. Perfect for clients who want their business card to be displayed on refrigerators, filing cabinets, or other metal surfaces, these cards are as functional as they are unique.",
//                 img: "https://picsum.photos/300/300?random=17",
//             },
//             {
//                 name: "Transparent Visiting Cards",
//                 shortDescription: "Clear transparent cards for a modern and minimalist design",
//                 longDescription: "Transparent visiting cards are the ultimate way to showcase your modern and minimalist design. These sleek, see-through cards add a touch of sophistication and professionalism, making them ideal for industries like design, architecture, and tech.",
//                 img: "https://picsum.photos/300/300?random=18",
//             },
//             {
//                 name: "Premium Plus Visiting Cards",
//                 shortDescription: "Top-tier premium quality with extra durability",
//                 longDescription: "Premium Plus visiting cards are made with the highest quality materials to ensure long-lasting durability. These cards have a robust feel and sophisticated design, making them perfect for high-level professionals who demand the best.",
//                 img: "https://picsum.photos/300/300?random=19",
//             },
//             {
//                 name: "Non-Tearable Visiting Cards",
//                 shortDescription: "Super durable, non-tearable cards for maximum resilience",
//                 longDescription: "Non-tearable visiting cards are crafted from extremely durable materials that resist damage and wear. These cards are perfect for people on the go, ensuring that your contact information remains intact and professional even under rough handling.",
//                 img: "https://picsum.photos/300/300?random=20",
//             },
//             {
//                 name: "Velvet Touch Visiting Cards",
//                 shortDescription: "Soft and luxurious velvet touch finish",
//                 longDescription: "Experience the luxurious feel of velvet touch visiting cards. The soft texture creates a tactile experience, making these cards perfect for industries that prioritize elegance and a high-end, sophisticated brand image.",
//                 img: "https://picsum.photos/300/300?random=21",
//             },
//             {
//                 name: "Pearl Visiting Cards",
//                 shortDescription: "Pearlized cards with a shimmering touch",
//                 longDescription: "Pearl visiting cards feature a pearlescent finish, adding a soft shimmer to your business identity. These cards are perfect for individuals or companies in the beauty, fashion, or luxury industries, offering a refined and elegant touch.",
//                 img: "https://picsum.photos/300/300?random=22",
//             },
//             {
//                 name: "Kraft Visiting Cards",
//                 shortDescription: "Eco-friendly kraft paper cards for a natural, earthy look",
//                 longDescription: "Kraft visiting cards are made from recycled paper, offering an eco-friendly solution with a natural, rustic charm. These cards are ideal for businesses with a sustainable focus or those in the organic and eco-conscious industries.",
//                 img: "https://picsum.photos/300/300?random=23",
//             },
//             {
//                 name: "Premium Metal Card Holders",
//                 shortDescription: "Sleek and durable premium metal holders for your business cards",
//                 longDescription: "Premium metal card holders are the perfect way to protect and display your visiting cards. Crafted from high-quality metal, these holders provide durability and an elegant touch to complement your premium business cards.",
//                 img: "https://picsum.photos/300/300?random=24",
//             }
//         ]
//     },
//     {
//       id: 2,
//       title: "Bluetooth Speaker",
//       description: "The garments labelled as Committed are products that have been produced using sustainable fibres or processes, reducing their environmental impact.",
//       offer: "40% Off",
//       img: "https://picsum.photos/900/900?random=2",
//       price: 1200,
//       ratingCount: 90,
//       bestDeal: false,
//       category: "Custom Polo T-shirts",
//       recommended: true,
//       thumbnailImages: [
//           "https://picsum.photos/900/900?random=2-1",
//           "https://picsum.photos/150/150?random=2-2",
//           "https://picsum.photos/150/150?random=2-3",
//           "https://picsum.photos/150/150?random=2-4",
//           "https://picsum.photos/150/150?random=2-5",
//       ],
//   },
//     {
//         id: 3,
//         title: "Smartwatch",
//         description: "The garments labelled as Committed are products that have been produced using sustainable fibres or processes, reducing their environmental impact.",
//         offer: "25% Off",
//         img: "https://picsum.photos/300/300?random=3",
//         price: 2999,
//         ratingCount: 150,
//         bestDeal: true,
//         category: "Custom Polo T-shirts",
//         recommended: false,
//         thumbnailImages: [
//             "https://picsum.photos/150/150?random=3-1",
//             "https://picsum.photos/150/150?random=3-2",
//             "https://picsum.photos/150/150?random=3-3",
//             "https://picsum.photos/150/150?random=3-4",
//             "https://picsum.photos/150/150?random=3-5",
//         ],
//     },
//     {
//         id: 4,
//         title: "Wireless Earbuds",
//         description: "Noise-cancelling earbuds",
//         offer: "30% Off",
//         img: "https://picsum.photos/300/300?random=4",
//         price: 2499,
//         ratingCount: 200,
//         bestDeal: true,
//         category: "Audio",
//         recommended: true,
//         thumbnailImages: [
//             "https://picsum.photos/150/150?random=4-1",
//             "https://picsum.photos/150/150?random=4-2",
//             "https://picsum.photos/150/150?random=4-3",
//             "https://picsum.photos/150/150?random=4-4",
//             "https://picsum.photos/150/150?random=4-5",
//         ],
//     },
//     {
//         id: 5,
//         title: "Gaming Mouse",
//         description: "RGB Gaming mouse",
//         offer: "35% Off",
//         img: "https://picsum.photos/300/300?random=5",
//         price: 899,
//         ratingCount: 80,
//         bestDeal: false,
//         category: "Custom Polo T-shirts",
//         recommended: false,
//         thumbnailImages: [
//             "https://picsum.photos/150/150?random=5-1",
//             "https://picsum.photos/150/150?random=5-2",
//             "https://picsum.photos/150/150?random=5-3",
//             "https://picsum.photos/150/150?random=5-4",
//             "https://picsum.photos/150/150?random=5-5",
//         ],
//     },
//     {
//         id: 6,
//         title: "Mechanical Keyboard",
//         description: "RGB Mechanical Keyboard",
//         offer: "20% Off",
//         img: "https://picsum.photos/300/300?random=6",
//         price: 3499,
//         ratingCount: 120,
//         bestDeal: true,
//         category: "Accessories",
//         recommended: true,
//         thumbnailImages: [
//             "https://picsum.photos/150/150?random=6-1",
//             "https://picsum.photos/150/150?random=6-2",
//             "https://picsum.photos/150/150?random=6-3",
//             "https://picsum.photos/150/150?random=6-4",
//             "https://picsum.photos/150/150?random=6-5",
//         ],
//     },
//     {
//         id: 7,
//         title: "Smart TV",
//         description: "4K Ultra HD Smart TV",
//         offer: "15% Off",
//         img: "https://picsum.photos/300/300?random=7",
//         price: 3999,
//         ratingCount: 250,
//         bestDeal: false,
//         category: "Electronics",
//         recommended: true,
//         thumbnailImages: [
//             "https://picsum.photos/150/150?random=7-1",
//             "https://picsum.photos/150/150?random=7-2",
//             "https://picsum.photos/150/150?random=7-3",
//             "https://picsum.photos/150/150?random=7-4",
//             "https://picsum.photos/150/150?random=7-5",
//         ],
//     },
//     {
//         id: 8,
//         title: "Laptop Cooling Pad",
//         description: "Laptop cooling stand",
//         offer: "50% Off",
//         img: "https://picsum.photos/300/300?random=8",
//         price: 1199,
//         ratingCount: 75,
//         bestDeal: false,
//         category: "Accessories",
//         recommended: false,
//         thumbnailImages: [
//             "https://picsum.photos/150/150?random=8-1",
//             "https://picsum.photos/150/150?random=8-2",
//             "https://picsum.photos/150/150?random=8-3",
//             "https://picsum.photos/150/150?random=8-4",
//             "https://picsum.photos/150/150?random=8-5",
//         ],
//     },
//     {
//         id: 9,
//         title: "External Hard Drive",
//         description: "1TB External HDD",
//         offer: "45% Off",
//         img: "https://picsum.photos/300/300?random=9",
//         price: 4999,
//         ratingCount: 180,
//         bestDeal: true,
//         category: "Storage",
//         recommended: true,
//         thumbnailImages: [
//             "https://picsum.photos/150/150?random=9-1",
//             "https://picsum.photos/150/150?random=9-2",
//             "https://picsum.photos/150/150?random=9-3",
//             "https://picsum.photos/150/150?random=9-4",
//             "https://picsum.photos/150/150?random=9-5",
//         ],
//     },
//     {
//         id: 10,
//         title: "Ring Light",
//         description: "Dimmable LED Ring Light",
//         offer: "30% Off",
//         img: "https://picsum.photos/300/300?random=10",
//         price: 1599,
//         ratingCount: 110,
//         bestDeal: false,
//         category: "Accessories",
//         recommended: true,
//         thumbnailImages: [
//             "https://picsum.photos/150/150?random=10-1",
//             "https://picsum.photos/150/150?random=10-2",
//             "https://picsum.photos/150/150?random=10-3",
//             "https://picsum.photos/150/150?random=10-4",
//             "https://picsum.photos/150/150?random=10-5",
//         ],
//     },
// ];

  // Breadcrumb Data
  export const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Search", href: "/search" },
    { label: "Shop", href: "/products" },
    { label: "About Us", href: "/about" }
  ];

  export const announcementMessage = "🎉 Free Shipping on Orders Over $50.00";

  export const contactInfo = {
    phone: "+1 666 234 8888",
    email: "sales@thinkprint.shop",
    address: "2163 Phillips Gap Rd, West Jefferson, North Carolina, United States",
    openTime: [
        { day: "Mon - Sat", time: "7:30am - 8:00pm PST" },
        { day: "Sunday", time: "9:00am - 5:00pm PST" },
    ],
};


export const aboutData = {
  title: "About Us",
  intro: "Welcome to MyShop, your premier online destination for high-quality products. Founded in 2020, we strive to provide our customers with the best shopping experience possible.",
  sections: [
    {
      heading: "Our Mission",
      content: "We offer a wide range of products at competitive prices, ensuring customer satisfaction and loyalty. Our goal is to deliver excellence in every purchase."
    },
    {
      heading: "Why Choose Us?",
      content: "With a focus on quality and customer service, MyShop ensures a seamless shopping experience. Whether you need fashion, gadgets, or home essentials, we've got you covered."
    }
  ]
};


  