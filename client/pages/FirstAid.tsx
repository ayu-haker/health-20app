import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FirstAid() {
  return (
    <main className="">
      <section className="container py-8">
        <h1 className="text-2xl font-extrabold tracking-tight">
          First Aid Guide
        </h1>
        <p className="mt-2 max-w-prose text-sm text-muted-foreground">
          Quick, reliable guidance for immediate response. This does not replace
          professional medical advice.
        </p>
      </section>
      <section className="border-t bg-card/40">
        <div className="container py-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="cpr">
              <AccordionTrigger>CPR (Adults)</AccordionTrigger>
              <AccordionContent>
                - Check responsiveness and breathing. Call emergency number. -
                Start chest compressions: 100–120/min, depth 5–6 cm. Allow full
                recoil. - 30 compressions, then 2 rescue breaths if trained.
                Continue until help arrives.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="bleeding">
              <AccordionTrigger>Severe bleeding</AccordionTrigger>
              <AccordionContent>
                - Apply firm, direct pressure with clean cloth. Do not remove
                soaked dressings. - Elevate if possible. Use tourniquet if
                trained and bleeding is life‑threatening.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="choking">
              <AccordionTrigger>Choking (Adults/Children)</AccordionTrigger>
              <AccordionContent>
                - Ask if they can cough or speak. If not, call emergency
                services. - 5 back blows between shoulder blades, then 5
                abdominal thrusts. Repeat. - For infants: 5 back slaps + 5 chest
                thrusts.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="burns">
              <AccordionTrigger>Burns</AccordionTrigger>
              <AccordionContent>
                - Cool the burn with cool running water for 20 minutes. Do not
                use ice. - Remove tight items (rings/watches). Cover loosely
                with sterile, non‑adhesive dressing.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </main>
  );
}
