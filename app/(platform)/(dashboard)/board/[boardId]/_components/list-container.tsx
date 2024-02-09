"use client";
import { ListWithCards } from "@/app/types";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import ListForm from "./list-form";
import { useEffect, useState } from "react";
import ListItem from "./list-items";
interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}
function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}
export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);
  useEffect(() => {
    setOrderedData(data);
  }, [data]);
  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;
    if (!destination) {
      return;
    }
    //if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    //if usermoves a list
    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );
      setOrderedData(items);
      //Todo :Trigger server actions
    }
    //if user moves a card
    if (type === "card") {
      let newOrderedData = [...orderedData];
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );
      if (!sourceList || !destList) {
        return;
      }
      //Check if cards exist on the sourceList
      if (!sourceList.cards) {
        sourceList.cards = [];
      }
      if (!destList.cards) {
        destList.cards = [];
      }
      //Moving the cards in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );
        reorderedCards.forEach((card, index) => {
          card.order = index;
        });
        sourceList.cards = reorderedCards;
        setOrderedData(newOrderedData);
        //Trigger server actions
        //User moves the cards to another list
      } else {
        const [movedCard] = sourceList.cards.splice(source.index, 1);
        //assign the new listId to the moved cards
        movedCard.listId = destination.droppableId;
        //Add card to the destination list
        destList.cards.splice(destination.index, 0, movedCard);
        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });
        //Update the order for each card in the destination
        destList.cards.forEach((card, index) => {
          card.order = index;
        });
        setOrderedData(newOrderedData);
        //trigger the server actions
      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => {
              return <ListItem key={list.id} index={index} data={list} />;
            })}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
