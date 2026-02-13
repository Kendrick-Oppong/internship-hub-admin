import { ProfileSection } from "./profile-section";
import { SecuritySection } from "./security-section";

export const Settings = () => {
 

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Settings</h3>
      </div>

      <div className="flex flex-col gap-4 pb-16">
        <section
          id="profile"
          className="scroll-mt-6 p-4 bg-white rounded-lg border border-gray-300 shadow-card"
        >
          <ProfileSection/>
        </section>

        <section
          id="security"
          className="scroll-mt-6 p-4 bg-white rounded-lg border border-gray-300 shadow-card"
        >
          <SecuritySection />
        </section>
      </div>
    </div>
  );
};
