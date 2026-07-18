"use client";

interface SkipArrivalControlProps {
  readonly className?: string;
  readonly onSkip: () => void;
}

export function SkipArrivalControl({
  className,
  onSkip,
}: SkipArrivalControlProps) {
  return (
    <button className={className} type="button" onClick={onSkip}>
      Skip Atlas arrival
    </button>
  );
}
