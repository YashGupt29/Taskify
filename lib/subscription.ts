import { auth } from "@clerk/nextjs";
import { db } from "./db";

const DAY_IN_MS = 84_400_000;
export const checkSubscriptions = async () => {
  const { orgId } = auth();
  if (!orgId) {
    return false;
  }
  const orgSubscriptions = await db.orgSubscription.findUnique({
    where: {
      orgId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });
  if (!orgSubscriptions) {
    return false;
  }
  const isValid =
    orgSubscriptions.stripePriceId &&
    orgSubscriptions.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();
  return !!isValid;
};
