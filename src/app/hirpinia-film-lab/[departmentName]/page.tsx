import images from "@/utils/images";
import DepartmentPageClient from "./DepartmentPageClient";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    departmentName: string;
  }>;
};

// eslint-disable-next-line react-refresh/only-export-components
export async function generateStaticParams() {
  return Object.keys(images.hirpiniaFilmLab.trainingAreas).map((key) => ({
    departmentName: key,
  }));
}

export default async function DepartmentPage({ params }: Props) {
  const { departmentName } = await params;

  if (
    !Object.keys(images.hirpiniaFilmLab.trainingAreas).find(
      (key) => key === departmentName
    )
  )
    notFound();

  return <DepartmentPageClient departmentName={departmentName} />;
}
