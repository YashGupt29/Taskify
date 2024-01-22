import React from "react";
import { OrganizationList } from "@clerk/nextjs";

export default function CreateOrganizationPage() {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl="/organization/:id"
    />
  );
  return (
    <OrganizationList
      hidePersonal
      afterCreateOrganizationUrl="/organization/:id"
    />
  );
}
