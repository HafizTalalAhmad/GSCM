import { Badge } from "@/components/ui/badge";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl space-y-5">
      <Badge>{eyebrow}</Badge>
      <h2 className="marketing-title max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="marketing-copy max-w-2xl text-base leading-8 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
