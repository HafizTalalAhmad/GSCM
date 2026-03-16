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
      <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
