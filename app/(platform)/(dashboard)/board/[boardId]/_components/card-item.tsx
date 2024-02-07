"use client";
import React from "react";
import { Card } from "@prisma/client";
interface CardItemProps {
  index: Number;
  data: Card;
}
const CardItem = ({ index, data }: CardItemProps) => {
  return (
    <div
      role="button"
      className="truncate border-2 border-transparent hover:border-black py-2 px-3 bg-white text-sm rounded-md shadow-sm"
    >
      {data.title}
    </div>
  );
};

export default CardItem;