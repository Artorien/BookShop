import BookPageComponent from "@/components/book-page-component/book-page";

interface BookPageProps {
  params: {
    bookTitle: string;
  };
}

export default function BookPage({ params }: BookPageProps) {
  const { bookTitle } = params;

  return <BookPageComponent title={bookTitle}></BookPageComponent>;
}
