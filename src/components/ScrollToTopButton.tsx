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
      {(props.isHome ?? false) ? (
        <Link
          href="/#frame"
          className={`glassmorph fixed right-10 bottom-10 z-20 p-4`}
        >
          <FaArrowUp size="1.5rem" />
        </Link>
      ) : (
        <button
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          className={`glassmorph ${scrollY === 0 ? "hidden" : "fixed"} right-10 bottom-10 z-20 cursor-pointer p-4`}
          title="Scroll to top"
          type="button"
        >
          <FaArrowUp size="1.5rem" />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
