import { User, Phone, MapPin, Star } from "lucide-react";
import InfoRow from "./InfoRow";

const RiderInfo = ({ order }) => {
  if (
    !["on delivery", "delivering"].includes(order.order_status?.toLowerCase())
  )
    return null;

  return (
    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-5 rounded-2xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">Delivery Rider</h3>
      <div className="space-y-4">
        <InfoRow
          icon={<User className="w-5 h-5" />}
          iconBg="bg-white/20 rounded-full"
          label="Mohammad Rahman"
          value={
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 fill-current" />
              <span>4.8 rating</span>
            </div>
          }
        />
        <InfoRow
          icon={<Phone className="w-5 h-5" />}
          iconBg="bg-white/20 rounded-full"
          label="Contact Rider"
          value="+8801712345678"
          valueClassName="font-semibold text-base"
        />
        <InfoRow
          icon={<MapPin className="w-5 h-5" />}
          iconBg="bg-white/20 rounded-full"
          label="Location"
          value="5 minutes away"
          valueClassName="font-semibold text-base"
        />
      </div>
    </div>
  );
};

export default RiderInfo;
