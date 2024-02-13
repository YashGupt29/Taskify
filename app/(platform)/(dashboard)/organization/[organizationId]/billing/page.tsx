import { checkSubscriptions } from "@/lib/subscription";
import React from "react";
import { Info } from "../_components/info";
import { Separator } from "@/components/ui/separator";
import { SubscriptionButton } from "./_components/subscription-button";

const BillingPage = async () => {
  const isPro = await checkSubscriptions();
  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator className="my-2" />
      <SubscriptionButton isPro={isPro} />
    </div>
  );
};

export default BillingPage;
