import { cookies } from "next/headers";
import { getAdminCookieName, isAdminAuthenticated } from "../lib/adminAuth";
import { getEligibilityLeads, getSupportRequests, getCareersApplications, getPartnerInquiries } from "../lib/db";
import { AdminLoginForm } from "./AdminLoginForm";
import { AdminDashboard } from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getAdminCookieName())?.value;

  if (!isAdminAuthenticated(token)) {
    return <AdminLoginForm />;
  }

  const [eligibilityLeads, supportRequests, careersApplications, partnerInquiries] = await Promise.all([
    getEligibilityLeads(),
    getSupportRequests(),
    getCareersApplications(),
    getPartnerInquiries(),
  ]);

  return (
    <AdminDashboard
      eligibilityLeads={eligibilityLeads}
      supportRequests={supportRequests}
      careersApplications={careersApplications}
      partnerInquiries={partnerInquiries}
    />
  );
}
