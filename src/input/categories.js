import VisitingCards from "/src/assets/categories/Visiting-Cards.webp";
import CustomTShirts from "/src/assets/categories/Custom-T-shirts.webp";
import CustomStampsInk from "/src/assets/categories/Custom-Stamps-And-Ink.webp";
import PhotoGifts from "/src/assets/categories/Photo-Gifts.webp";
import LabelsStickersPackaging from "/src/assets/categories/Labels-Stickers-Packaging.webp";
import CustomStationery from "/src/assets/categories/Custom-Stationery.webp";
import SignsPostersMarketing from "/src/assets/categories/Signs-Posters-Marketing-Materials.webp";
import CustomCaps from "/src/assets/categories/Custom-Caps.webp";
import CustomDrinkware from "/src/assets/categories/Custom-Drinkware.webp";
import CustomBags from "/src/assets/categories/Custom-Bags.webp";
import electronics from "/src/assets/categories/ElectronicsAndAccessories.webp";
import promotional from "/src/assets/categories/Promotional-Gifts.webp";
import EcoGifts from "/src/assets/categories/Ecogifts.webp";
import NOTEPADS from "/src/assets/categories/Notepad.webp";
import Giftsets from "/src/assets/categories/giftset.webp";

export const categories = [
  { 
    id: 1, 
    name: "Visiting Cards", 
    img: VisitingCards,
    subcategories: [
      { id: 101, name: "Standard Cards" },
      { id: 102, name: "Premium Cards" },
      { id: 103, name: "Eco-Friendly Cards" },
      { id: 104, name: "Spot UV Cards" },
    ]
  },
  { 
    id: 2, 
    name: "Personalized Clothing", 
    img: CustomTShirts,
    subcategories: [
      { id: 201, name: "T-Shirts" },
      { id: 202, name: "Hoodies" },
      { id: 203, name: "Jackets" },
      { id: 204, name: "Sportswear" },
    ]
  },
  { id: 3, name: "Custom Stamps & Ink", img: CustomStampsInk },
  { id: 4, name: "Photo Gifts", img: PhotoGifts },
  { id: 5, name: "Labels, Stickers & Packaging", img: LabelsStickersPackaging },
  { id: 6, name: "Custom Stationery", img: CustomStationery },
  { id: 7, name: "Signs, Posters & Marketing Materials", img: SignsPostersMarketing },
  { id: 8, name: "Custom Caps", img: CustomCaps },
  { id: 9, name: "Custom Drinkware", img: CustomDrinkware },
  { id: 10, name: "Custom Bags", img: CustomBags },
  { id: 11, name: "Electronics & Accessories", img: electronics },
  { id: 12, name: "Promotional Gifts", img: promotional },
  { id: 13, name: "EcoGifts", img: EcoGifts },
  { id: 14, name: "NOTEPADS & DIARIES", img: NOTEPADS },
  { id: 15, name: "Giftsets", img: Giftsets },
];
