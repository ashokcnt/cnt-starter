/* eslint-disable @typescript-eslint/no-explicit-any */
import { sdk } from "@/data/client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
// import { useSearchParams } from "next/navigation";

function getPageNumbers(totalPages: number) {
  return Array.from({ length: totalPages }, (_, index) => index + 1);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Home({ searchParams }: any) {
  // const searchParams: any = useSearchParams();

  const limit = 8;

  const page = Number.parseInt(searchParams.page);

  // const data: any = await sdk.GetProductsById({ id: "77zqKACEPvjqzBZZmNIlU7" });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const products: any = await sdk.GetProducts({
    limit: limit,
    skip: (page - 1) * limit,
  });

  const totalPages = Math.ceil(products?.productsCollection?.total / limit);

  const pageNumbers = getPageNumbers(totalPages);

  return (
    <main className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
      <Table>
        <TableCaption>
          A list of products with their descriptions and outputs. Total{" "}
          {products?.productsCollection?.total}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Image</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.productsCollection?.items?.map((product: any) => (
            <TableRow key={product?.sys?.id}>
              <TableCell className="font-medium">{product.title}</TableCell>
              <TableCell>{product?.description}</TableCell>
              <TableCell>
                <Image
                  src={product?.image?.url}
                  alt={product?.title}
                  width={100}
                  height={100}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={`?page=${page === 1 ? 1 : page - 1}`} />
          </PaginationItem>
          <PaginationItem>
            {pageNumbers?.map((pageNumber) => (
              <PaginationLink href={`?page=${pageNumber}`} key={pageNumber}>
                {pageNumber}
              </PaginationLink>
            ))}
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href={`?page=${totalPages === page ? totalPages : page + 1}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}
