import { forwardRef, useEffect, useRef, useImperativeHandle } from "react";
import gsap from "gsap";
export type HexagonProps = {
  color?: string;
  className?: React.SVGProps<SVGSVGElement>["className"];
  children?: React.ReactNode;
  animateOnEnter?: boolean;
  animationDelay?: number;
} & React.HTMLProps<HTMLDivElement>;

export const Hexagon = forwardRef<HTMLDivElement, HexagonProps>(
  (props, ref) => {
    const localRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => localRef.current || ({} as HTMLDivElement));

    useEffect(() => {
      if (
        localRef.current &&
        props.animateOnEnter != undefined &&
        props.animateOnEnter
      ) {
        (async () => {
          await gsap.set(localRef.current, {
            scale: 0,
            opacity: 0,
            rotateZ: 30,
          });

          gsap.to(localRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            rotateZ: 0,
            ease: "power2.out",
            delay: props.animationDelay || 0,
          });
        })();
      }
    }, []);

    return (
      <div {...props} className={`relative ${props.className}`} ref={localRef}>
        <svg
          className={`absolute h-full w-full`}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 0L15 4V12L8 16L1 12V4L8 0Z"
            style={{
              fill: props.color || "currentColor",
            }}
          ></path>
        </svg>

        <div className="absolute w-full h-full flex items-center justify-center">
          {props.children}
        </div>
      </div>
    );
  }
);
