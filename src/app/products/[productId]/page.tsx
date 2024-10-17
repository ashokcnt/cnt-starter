export default function Product({params}: {params: {id: string}}) {
    return <div>{params.id}</div>;
  }