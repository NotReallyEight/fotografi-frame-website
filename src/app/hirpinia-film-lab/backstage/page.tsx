import { Suspense } from "react";
import Backstage from "./Backstage";

export default function BackstagePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Backstage />
    </Suspense>
  );
}
