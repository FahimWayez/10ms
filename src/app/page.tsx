import { fetchProduct } from "@/lib/tenms";

export default async function Page() {
  const { data } = await fetchProduct("ielts-course");
  return (
    <section className="py-8">
      <h1 className="text-2xl font-semibold">{data.title}</h1>
    </section>
  );
}
