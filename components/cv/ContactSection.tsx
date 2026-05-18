import { CONTACT_INFOS } from "@/constants";
import { ContactInfo } from "@/types";

export const ContactSection = () => {
  return (
    <div>
      <h3 className="text-lg font-bold text-stone-800 mb-6">
        Me contacter
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CONTACT_INFOS.map((c, i) => (
          <ContactItem key={i} contact={c} />
        ))}
      </div>
    </div>
  );
};

const ContactItem = ({ contact }: { contact: ContactInfo }) => (
  <div className="bg-stone-50 rounded-xl p-4 flex items-center gap-3 border border-stone-100">
    <div className="w-9 h-9 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-sm font-bold text-purple-600 flex-shrink-0">
      {contact.ico}
    </div>
    <div>
      <div className="text-xs text-stone-400 uppercase font-bold tracking-wide">
        {contact.label}
      </div>
      {contact.href ? (
        <a
          href={contact.href}
          target="_blank"
          className="text-sm font-semibold text-stone-700 hover:text-purple-600"
        >
          {contact.val}
        </a>
      ) : (
        <div className="text-sm font-semibold text-stone-700">
          {contact.val}
        </div>
      )}
    </div>
  </div>
);
