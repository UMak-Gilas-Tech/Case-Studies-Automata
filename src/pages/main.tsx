import { Hexagon } from "@/components/Hexagon";
import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import gsap from "gsap";
import { generatePascal } from "@/utils/pascal";
export function Main() {
  const hexagonRef = React.useRef(null);
  const titleRef = React.useRef<HTMLHeadingElement>(null);
  const [pascalTriangleData, setPascalTriangleData] = React.useState<
    number[][]
  >([]);

  const chevronLeftRef = React.useRef(null);
  const chevronRightRef = React.useRef(null);
  let hexagonFloat = React.useRef<any>(null);

  const [pascalHeight, setPascalHeight] = React.useState(1);

  useEffect(() => {
    if (pascalTriangleData.length <= 0) return;
    gsap.to(hexagonRef.current, {
      y: 0,
      duration: 1,
      ease: "expo.in",
    });

    gsap.to(titleRef.current, {
      opacity: 0,
      duration: 1,
      y: -100,
      ease: "expo.in",
      onComplete: () => {
        titleRef.current!.style.display = "none";
      },
    });

    gsap.to(chevronLeftRef.current, {
      opacity: 0,
      duration: 1,
      x: 50,
      ease: "expo.in",
      onComplete: () => {
        chevronLeftRef.current!.style.display = "none";
      },
    });

    gsap.to(chevronRightRef.current, {
      opacity: 0,
      duration: 1,
      x: -50,
      ease: "expo.in",
      onComplete: () => {
        chevronRightRef.current!.style.display = "none";
      },
    });

    hexagonFloat.current.kill();
  }, [pascalTriangleData]);

  useEffect(() => {
    if (!hexagonRef.current) return;

    hexagonFloat.current = gsap.timeline();

    hexagonFloat.current
      .to(hexagonRef.current, {
        y: -30,
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      })
      .to(hexagonRef.current, {
        y: 30,
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });

    hexagonFloat.current.play();

    return () => {
      hexagonFloat.current.kill();
    };
  }, [hexagonRef]);

  const incrementPascalHeight = async () => {
    if (pascalHeight >= 10) return;

    setPascalHeight((prev) => prev + 1);

    gsap.to(hexagonRef.current, {
      scale: 1.2,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(hexagonRef.current, {
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      },
    });
  };

  const decrementPascalHeight = () => {
    if (pascalHeight <= 1) return;

    setPascalHeight((prev) => prev - 1);

    gsap.to(hexagonRef.current, {
      scale: 1.2,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(hexagonRef.current, {
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      },
    });
  };

  const startPascalGeneration = () => {
    if (hexagonRef.current) {
      gsap.to(hexagonRef.current, {
        scale: 1.3,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          setPascalTriangleData(
            generatePascal(pascalHeight).filter((item) => item.length > 1)
          );
          setPascalHeight(1);
        },
      });
    }
  };

  const restartAll = () => {
    // Reset title
    if (titleRef.current) {
      titleRef.current.style.display = "block";
      titleRef.current.style.opacity = "1";
      titleRef.current.style.transform = "translateY(0)";
    }
    // Reset chevrons
    if (chevronLeftRef.current) {
      chevronLeftRef.current.style.display = "block";
      chevronLeftRef.current.style.opacity = "1";
      chevronLeftRef.current.style.transform = "translateX(0)";
    }
    if (chevronRightRef.current) {
      chevronRightRef.current.style.display = "block";
      chevronRightRef.current.style.opacity = "1";
      chevronRightRef.current.style.transform = "translateX(0)";
    }
    // Reset hexagon's animation and style
    if (hexagonRef.current) {
      gsap.killTweensOf(hexagonRef.current);
      gsap.set(hexagonRef.current, { scale: 1, opacity: 1, y: 0 });
    }
    // Reset state
    setPascalTriangleData([]);
    setPascalHeight(1);
    // Restart floating timeline if exists
    if (hexagonFloat.current) {
      hexagonFloat.current.restart();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 ref={titleRef} className="text-2xl pb-5">
        Click hexagon to start
      </h2>
      <div className="h-20 relative w-full flex flex-row gap-0 p-0 m-0 items-center justify-center">
        <ChevronLeft
          ref={chevronLeftRef}
          onClick={decrementPascalHeight}
          className="mr-10"
        />
        <Hexagon
          ref={hexagonRef}
          onClick={() => {
            startPascalGeneration();
          }}
          className="h-full w-20 hover:scale-110 ease-in-out duration-300 cursor-pointer"
        >
          <span className="text-white text-2xl select-none">
            {pascalHeight}
          </span>
        </Hexagon>
        <ChevronRight
          ref={chevronRightRef}
          onClick={incrementPascalHeight}
          className="ml-10"
        />
      </div>

      {pascalTriangleData.map((row, rowIndex) => (
        <div className="h-20 relative w-full flex flex-row gap-0 p-0 m-0 items-center justify-center">
          {row.map((value, index) => (
            <Hexagon
              animateOnEnter={true}
              animationDelay={(index + rowIndex) * 0.3}
              key={index}
              className="h-full w-20"
            >
              <span className="text-white text-xl select-none">{value}</span>
            </Hexagon>
          ))}
        </div>
      ))}
      {pascalTriangleData.length > 0 && (
        <button
          onClick={restartAll}
          className="mt-i p-2  text-white rounded "
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
