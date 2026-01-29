import CenterCard from "./CenterCard";

export default function CenterList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      <CenterCard />
      <CenterCard />
      <CenterCard />
      <CenterCard />
    </div>
  );
}
