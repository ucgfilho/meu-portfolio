import { useTypewriter } from "@/hooks/useTypewriter";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  startDelay?: number;
  enabled?: boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const TypewriterText = ({
  text,
  speed = 20,
  startDelay = 0,
  enabled = true,
  className = "",
  as: Tag = "span",
}: TypewriterTextProps) => {
  const { displayedText } = useTypewriter({
    text,
    speed,
    startDelay,
    enabled,
  });

  return (
    <Tag className={className}>
      {displayedText}
    </Tag>
  );
};


