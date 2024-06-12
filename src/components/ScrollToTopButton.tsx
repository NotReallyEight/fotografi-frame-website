"use client";

import Link from "next/link";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => (
  <Link
    href="/#frame"
    className="glassmorph absolute bottom-10 right-10 z-20 p-4"
  >
    <FaArrowUp size="1.5rem" />
  </Link>
);

export default ScrollToTopButton;
