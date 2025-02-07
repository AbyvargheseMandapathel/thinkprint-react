export const banners = [
    {
      imageUrl: "https://picsum.photos/1200/600?random=1",
      title: "My Name, My Pride",
      description: "100 Visiting Cards at Rs 200",
      buttons: [{ text: "Shop Now", color: "blue" }],
    },
    {
      imageUrl: "https://picsum.photos/1200/600?random=2",
      title: "Wear Your Brand",
      description: "Starting at Rs. 550",
      buttons: [
        { text: "Custom Polo T-shirts", color: "blue" },
        { text: "Custom T-shirts", color: "white" },
      ],
    },
  ];
  
  export const categories = [
    { id: 1, name: "Visiting Cards", img: "https://picsum.photos/200/200?random=1" },
    { id: 2, name: "Custom Polo T-shirts", img: "https://picsum.photos/200/200?random=2" },
    { id: 3, name: "Office Shirts", img: "https://picsum.photos/200/200?random=3" },
    { id: 4, name: "Custom T-shirts", img: "https://picsum.photos/200/200?random=4" },
    { id: 5, name: "Custom Stamps & Ink", img: "https://picsum.photos/200/200?random=5" },
    { id: 6, name: "Photo Gifts", img: "https://picsum.photos/200/200?random=6" },
    { id: 7, name: "Labels, Stickers & Packaging", img: "https://picsum.photos/200/200?random=7" },
    { id: 8, name: "Custom Stationery", img: "https://picsum.photos/200/200?random=8" },
    { id: 9, name: "Signs, Posters & Marketing Materials", img: "https://picsum.photos/200/200?random=9" },
  ];

  export const products = [
    { id: 1, title: "HDMI Cable", description: "High-speed HDMI cable", offer: "Min. 50% Off", img: "https://picsum.photos/300/300?random=1", price: 360, ratingCount: 125, bestDeal: true, category: "Visiting Cards", recommended: true },
    { id: 2, title: "Bluetooth Speaker", description: "Portable Bluetooth speaker", offer: "40% Off", img: "https://picsum.photos/300/300?random=2", price: 1200, ratingCount: 90, bestDeal: false, category: "Custom Polo T-shirts", recommended: true },
    { id: 3, title: "Smartwatch", description: "Fitness tracking smartwatch", offer: "25% Off", img: "https://picsum.photos/300/300?random=3", price: 2999, ratingCount: 150, bestDeal: true, category: "Wearables", recommended: false },
    { id: 4, title: "Wireless Earbuds", description: "Noise-cancelling earbuds", offer: "30% Off", img: "https://picsum.photos/300/300?random=4", price: 2499, ratingCount: 200, bestDeal: true, category: "Audio", recommended: true },
    { id: 5, title: "Gaming Mouse", description: "RGB Gaming mouse", offer: "35% Off", img: "https://picsum.photos/300/300?random=5", price: 899, ratingCount: 80, bestDeal: false, category: "Accessories", recommended: false },
    { id: 6, title: "Mechanical Keyboard", description: "RGB Mechanical Keyboard", offer: "20% Off", img: "https://picsum.photos/300/300?random=6", price: 3499, ratingCount: 120, bestDeal: true, category: "Accessories", recommended: true },
    { id: 7, title: "Smart TV", description: "4K Ultra HD Smart TV", offer: "15% Off", img: "https://picsum.photos/300/300?random=7", price: 3999, ratingCount: 250, bestDeal: false, category: "Electronics", recommended: true },
    { id: 8, title: "Laptop Cooling Pad", description: "Laptop cooling stand", offer: "50% Off", img: "https://picsum.photos/300/300?random=8", price: 1199, ratingCount: 75, bestDeal: false, category: "Accessories", recommended: false },
    { id: 9, title: "External Hard Drive", description: "1TB External HDD", offer: "45% Off", img: "https://picsum.photos/300/300?random=9", price: 4999, ratingCount: 180, bestDeal: true, category: "Storage", recommended: true },
    { id: 10, title: "Ring Light", description: "Dimmable LED Ring Light", offer: "30% Off", img: "https://picsum.photos/300/300?random=10", price: 1599, ratingCount: 110, bestDeal: false, category: "Accessories", recommended: true },
];


  
  // export const recommendedProducts = [
  //   {
  //     id: 1,
  //     title: "Basics High-Speed HDMI Cable",
  //     description: "High-speed HDMI cable",
  //     offer: "Min. 50% Off",
  //     img: "https://picsum.photos/300/300?random=1",
  //     price: 360,
  //     ratingCount: 125,
  //     bestDeal: true,
  //     category: "Electronics",
  //   },
  //   {
  //     id: 2,
  //     title: "Custom Polo T-shirt",
  //     description: "Customizable polo t-shirt",
  //     offer: "Min. 50% Off",
  //     img: "https://picsum.photos/300/300?random=2",
  //     price: 250,
  //     ratingCount: 100,
  //     bestDeal: false,
  //     category: "Men",
  //   },
  //   {
  //     id: 3,
  //     title: "Photo Frame",
  //     description: "High-quality photo frame",
  //     offer: "Min. 50% Off",
  //     img: "https://picsum.photos/300/300?random=3",
  //     price: 150,
  //     ratingCount: 80,
  //     bestDeal: true,
  //     category: "Women",
  //   },
  //   {
  //     id: 4,
  //     title: "Wall Art",
  //     description: "Beautiful wall art",
  //     offer: "Min. 50% Off",
  //     img: "https://picsum.photos/300/300?random=4",
  //     price: 200,
  //     ratingCount: 90,
  //     bestDeal: false,
  //     category: "Electronics",
  //   },
  //   {
  //     id: 5,
  //     title: "Decorative Pillow",
  //     description: "Soft and stylish pillow",
  //     offer: "Min. 50% Off",
  //     img: "https://picsum.photos/300/300?random=5",
  //     price: 100,
  //     ratingCount: 70,
  //     bestDeal: true,
  //     category: "Women",
  //   },
  //   {
  //     id: 6,
  //     title: "Canvas Print",
  //     description: "Artistic canvas print",
  //     offer: "Min. 50% Off",
  //     img: "https://picsum.photos/300/300?random=6",
  //     price: 180,
  //     ratingCount: 110,
  //     bestDeal: false,
  //     category: "Men",
  //   },
  // ];
  // Breadcrumb Data
  export const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Search", href: "/search" },
    { label: "Shop", href: "/products" }
  ];
  