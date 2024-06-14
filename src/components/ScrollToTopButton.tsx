"use client";

import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

type Props = {
  isHome?: boolean;
};

const ScrollToTopButton: React.FC<Props> = (props) => {
  const [scrollY, setScrollY] = useState<number>(0);

  const onScroll = useCallback(() => {
    console.log(window.scrollY);
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
  }, [onScroll]);

  return (
    <>
      {props.isHome ?? false ? (
        <Link
          href="/#frame"
          className={`glassmorph fixed bottom-10 right-10 z-20 p-4`}
        >
          <FaArrowUp size="1.5rem" />
        </Link>
      ) : (
        <div
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          className={`glassmorph ${scrollY === 0 ? "hidden" : "fixed"} bottom-10 right-10 z-20 cursor-pointer p-4`}
        >
          <FaArrowUp size="1.5rem" />
        </div>
      )}
    </>
  );
};

export default ScrollToTopButton;
