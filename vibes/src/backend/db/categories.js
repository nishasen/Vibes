import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Relax",
    categoryImage: "https://ik.imagekit.io/ecomdiagonalley/Categories/RelaxMode_Dv7lUPMPt.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1650378346709",
    description:
      "Slow down and everything you are chasing will come around and catch you.",
  },
  {
    _id: uuid(),
    categoryName: "Fresh",
    categoryImage: "https://ik.imagekit.io/ecomdiagonalley/Categories/FreshMode_ToRrUfS62.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1650464078315",
    description:
      "Write it on your heart that every day is the best day in the year.",
  },
  {
    _id: uuid(),
    categoryName: "Fun",
    categoryImage: "https://ik.imagekit.io/ecomdiagonalley/Categories/FunMode_-bJKYsCop.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1650458978918",
    description:
      "If it's not fun, you are not doing it right.",
  },
  {
    _id: uuid(),
    categoryName: "Work",
    categoryImage: "https://ik.imagekit.io/ecomdiagonalley/Categories/WorkMode_iQAQaRTk0.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1650463329243",
    description:
      "Let the beauty of what you love be what you do.",
  },
  {
    _id: uuid(),
    categoryName: "Happy",
    categoryImage: "https://ik.imagekit.io/ecomdiagonalley/Categories/HappyMode_0ajz7r7iG.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1650378794099",
    description:
      "You glow differently, when you are happy.",
  },
  {
    _id: uuid(),
    categoryName: "Sad",
    categoryImage: "https://ik.imagekit.io/ecomdiagonalley/Categories/SadMode_07m64c0us.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1650378835133",
    description:
      "Life is tough, but so are you.",
  },
];
