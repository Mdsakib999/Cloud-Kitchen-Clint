import {
  DollarSign,
  CheckCircle,
  Star,
  MapPin,
  StickyNote,
} from "lucide-react";
import InfoRow from "./InfoRow";

const BillingInfo = ({ order }) => (
  <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 max-h-[400px] overflow-y-auto">
    <h3 className="text-xl font-bold text-gray-800 mb-4">Billing Info</h3>
    <div className="space-y-4 text-sm text-gray-700">
      <InfoRow
        icon={<DollarSign className="w-5 h-5" />}
        iconBg="bg-orange-100 text-orange-600"
        label="Payment Method"
        value={order.paymentMethod}
        valueClassName="capitalize font-semibold text-gray-800"
      />
      <InfoRow
        icon={<CheckCircle className="w-5 h-5" />}
        iconBg="bg-green-100 text-green-600"
        label="Paid"
        value={order.isPaid ? "Yes" : "No"}
        valueClassName={
          order.isPaid
            ? "text-green-800 font-semibold"
            : "text-red-600 font-semibold"
        }
      />
      <InfoRow
        icon={<Star className="w-5 h-5" />}
        iconBg="bg-blue-100 text-blue-600"
        label="Coupon Applied"
        value={order.isCouponApplied ? order.couponCode : "No"}
        valueClassName="font-semibold"
      />
      <InfoRow
        icon={<MapPin className="w-5 h-5" />}
        iconBg="bg-purple-100 text-purple-600"
        label="Delivery Address"
        value={order.address}
        valueClassName="font-semibold text-gray-800"
      />
      {order.additionalInfo && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
          <div className="flex gap-2 items-start">
            <StickyNote className="w-5 h-5 text-yellow-600 mt-1" />
            <div>
              <p className="text-sm font-semibold text-yellow-700">
                Special Instructions
              </p>
              <p className="text-sm text-yellow-800">{order.additionalInfo}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default BillingInfo;
