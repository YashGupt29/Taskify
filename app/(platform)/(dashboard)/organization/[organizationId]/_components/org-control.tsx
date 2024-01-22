"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useOrganizationList } from "@clerk/nextjs";

export const OrgControl = () => {
  //fixes copy paste issue of organisation id
  const params = useParams();
  const { setActive } = useOrganizationList();
  useEffect(() => {
    if (!setActive) return;
    setActive({
      organization: params.organizationId as string,
    });
  }, [setActive, params.organizationId]);
  return null;
};
