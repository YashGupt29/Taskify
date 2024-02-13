import React, { Suspense } from "react";
import { Info } from "../_components/info";
import { Separator } from "@/components/ui/separator";
import { ActivityList } from "./_components/activity-list";
import { checkSubscriptions } from "@/lib/subscription";

const ActivityPage = async () => {
  const isPro = await checkSubscriptions();
  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator className="my-2" />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
};

export default ActivityPage;
