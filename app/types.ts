import { Card, List } from "@prisma/client";

export type ListWithCards = List & { cards: Card[] };
export type CardWithCards = Card & { list: List };
