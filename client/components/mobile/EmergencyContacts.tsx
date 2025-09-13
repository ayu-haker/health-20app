import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Plus, Trash2 } from "lucide-react";

export type Contact = { id: string; name: string; phone: string };

const STORAGE_KEY = "aether_emergency_contacts";

function loadContacts(): Contact[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Contact[]) : [];
  } catch {
    return [];
  }
}

function saveContacts(list: Contact[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {}
}

export default function EmergencyContacts({
  recommended,
}: {
  recommended: { label: string; phone: string }[];
}) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setContacts(loadContacts());
  }, []);

  const addContact = () => {
    if (!name.trim() || !phone.trim()) return;
    const next = [
      ...contacts,
      { id: `${Date.now()}-${Math.random().toString(36).slice(2) }`, name: name.trim(), phone: phone.trim() },
    ];
    setContacts(next);
    saveContacts(next);
    setName("");
    setPhone("");
  };

  const remove = (id: string) => {
    const next = contacts.filter((c) => c.id !== id);
    setContacts(next);
    saveContacts(next);
  };

  const addAllRecommended = () => {
    const existing = new Set(contacts.map((c) => c.phone));
    const recs = recommended
      .filter((r) => r.phone && !existing.has(r.phone))
      .map((r) => ({ id: `${Date.now()}-${r.phone}`, name: r.label, phone: r.phone }));
    if (recs.length === 0) return;
    const next = [...contacts, ...recs];
    setContacts(next);
    saveContacts(next);
  };

  const uniqueRecommended = useMemo(() => {
    const seen = new Set<string>();
    return recommended.filter((r) => {
      if (!r.phone || seen.has(r.phone)) return false;
      seen.add(r.phone);
      return true;
    });
  }, [recommended]);

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Your emergency contacts</p>
        {uniqueRecommended.length > 0 && (
          <Button size="sm" variant="outline" onClick={addAllRecommended}>
            <Plus className="mr-2 h-4 w-4" /> Add all local
          </Button>
        )}
      </div>
      <div className="grid gap-2">
        {contacts.length === 0 && (
          <p className="text-xs text-muted-foreground">No contacts yet. Add trusted people or services.</p>
        )}
        {contacts.map((c) => (
          <div key={c.id} className="flex items-center justify-between rounded-md border p-2">
            <div>
              <div className="text-sm font-medium">{c.name}</div>
              <div className="text-xs text-muted-foreground">{c.phone}</div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" asChild>
                <a href={`tel:${c.phone}`}><Phone className="mr-2 h-4 w-4" /> Call</a>
              </Button>
              <Button size="sm" variant="ghost" onClick={() => remove(c.id)} aria-label={`Remove ${c.name}`}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <Button onClick={addContact}><Plus className="mr-2 h-4 w-4" /> Add</Button>
      </div>
    </div>
  );
}
