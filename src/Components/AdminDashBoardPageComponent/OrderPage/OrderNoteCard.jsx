import { MapPin } from "lucide-react";

export const OrderNoteCard = ({ note, address }) => {
  return (
    <div className="w-full bg-bg-primary text-white rounded-2xl shadow-lg p-4 relative h-64">
      <h4 className="text-lg font-medium mb-8 font-inknut">Note Order</h4>
      <p className="text-sm leading-relaxed font-playfair-display">
        {note || "No note added."}
      </p>
      <div className="bg-bg-tertiary text-white w-full rounded-xl p-8 flex items-center gap-2  absolute -bottom-5 right-0">
        <MapPin className="w-5 h-5 flex-shrink-0" />
        <span className="text-sm font-playfair-display">{address}</span>
      </div>
    </div>
  );
};
