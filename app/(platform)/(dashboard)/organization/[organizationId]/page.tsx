import { db } from "@/lib/db";
import { Board } from "./board";
import { Form } from "./form";

const OrganizationIdPage = async () => {
  const boards = await db.boarding.findMany();
  return (
    <div className="flex flex-col space-y-4">
      <Form />
      <div className="space-y-2">
        {boards.map((boarding) => (
          <Board key={boarding.id} title={boarding.title} id={boarding.id} />
        ))}
      </div>
    </div>
  );
};

export default OrganizationIdPage;
