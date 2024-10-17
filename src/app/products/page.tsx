export default function ProductList({params}: {params: {id: string}}) {
  return <div>{params.id}</div>;
}