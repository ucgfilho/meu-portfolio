import { useCallback, useMemo, memo } from "react";
import "./LogoLoop.css";

const toCssLength = (value: number | string | undefined) =>
  typeof value === "number" ? `${value}px` : (value ?? undefined);

export type NodeLogoItem = {
  node: React.ReactNode;
  title?: string;
  href?: string;
  ariaLabel?: string;
};

export type ImageLogoItem = {
  src: string;
  alt?: string;
  title?: string;
  href?: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
};

export type LogoItem = NodeLogoItem | ImageLogoItem;

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: string) => React.ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const LogoLoop = memo(
  ({
    logos,
    speed = 120,
    direction = "left",
    width = "100%",
    logoHeight = 28,
    gap = 32,
    pauseOnHover,
    hoverSpeed,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    renderItem,
    ariaLabel = "Partner logos",
    className,
    style,
  }: LogoLoopProps) => {
    const isVertical = direction === "up" || direction === "down";
    const shouldPauseOnHover = hoverSpeed === 0 || pauseOnHover === true || pauseOnHover === undefined;

    const estimatedTrackSize = Math.max(1, logos.length * (logoHeight + gap));
    const durationSeconds = Math.max(8, Math.round(estimatedTrackSize / Math.max(1, Math.abs(speed))));

    const cssVariables = useMemo(
      () => ({
        "--logoloop-gap": `${gap}px`,
        "--logoloop-logoHeight": `${logoHeight}px`,
        "--logoloop-duration": `${durationSeconds}s`,
        ...(fadeOutColor && { "--logoloop-fadeColor": fadeOutColor }),
      }),
      [gap, logoHeight, durationSeconds, fadeOutColor],
    );

    const rootClassName = useMemo(
      () =>
        [
          "logoloop",
          isVertical ? "logoloop--vertical" : "logoloop--horizontal",
          direction === "right" || direction === "down" ? "logoloop--reverse" : "",
          shouldPauseOnHover && "logoloop--pause-hover",
          fadeOut && "logoloop--fade",
          scaleOnHover && "logoloop--scale-hover",
          className,
        ]
          .filter(Boolean)
          .join(" "),
      [isVertical, direction, shouldPauseOnHover, fadeOut, scaleOnHover, className],
    );

    const renderLogoItem = useCallback(
      (item: LogoItem, key: string, isDuplicateCopy: boolean) => {
        if (renderItem) {
          return (
            <li className="logoloop__item" key={key}>
              {renderItem(item, key)}
            </li>
          );
        }
        const isNodeItem = "node" in item;
        const itemLabel = isNodeItem
          ? (item.ariaLabel ?? item.title)
          : ((item as ImageLogoItem).alt ?? item.title);

        const content = isNodeItem ? (
          <span
            className="logoloop__node"
            aria-hidden={isDuplicateCopy ? "true" : undefined}
            title={item.title}
          >
            {item.node}
          </span>
        ) : (
          <img
            src={item.src}
            srcSet={item.srcSet}
            sizes={item.sizes}
            width={item.width}
            height={item.height}
            alt={isDuplicateCopy ? "" : (item.alt ?? item.title ?? "")}
            title={item.title}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        );

        const itemContent = item.href ? (
          <a
            className="logoloop__link"
            href={item.href}
            aria-label={itemLabel || "logo link"}
            tabIndex={isDuplicateCopy ? -1 : undefined}
            target="_blank"
            rel="noreferrer noopener"
          >
            {content}
          </a>
        ) : (
          content
        );
        return (
          <li className="logoloop__item" key={key}>
            {itemContent}
          </li>
        );
      },
      [renderItem],
    );

    const logoLists = useMemo(
      () =>
        [0, 1].map((copyIndex) => {
          const isDuplicate = copyIndex > 0;
          return (
            <ul
              className="logoloop__list"
              key={`copy-${copyIndex}`}
              aria-hidden={isDuplicate ? "true" : undefined}
            >
              {logos.map((item, itemIndex) =>
                renderLogoItem(item, `${copyIndex}-${itemIndex}`, isDuplicate),
              )}
            </ul>
          );
        }),
      [logos, renderLogoItem],
    );

    const containerStyle = useMemo(
      () => ({
        width: isVertical
          ? toCssLength(width) === "100%"
            ? undefined
            : toCssLength(width)
          : (toCssLength(width) ?? "100%"),
        ...(cssVariables as React.CSSProperties),
        ...style,
      }),
      [width, cssVariables, style, isVertical],
    );

    return (
      <div
        className={rootClassName}
        style={containerStyle}
        role="region"
        aria-label={ariaLabel}
      >
        <div className="logoloop__track">{logoLists}</div>
      </div>
    );
  },
);

LogoLoop.displayName = "LogoLoop";

export default LogoLoop;
