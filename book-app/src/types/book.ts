export interface Book {
  title: string;
  author: string;
  price: number;
  description: string;
  image: string;
}

export interface BookProperties {
  title: string;
}

export interface BookSearchInterface {
  searchValues: {
    title: string;
    author: string;
    price: number;
    description: string;
    image: string;
  };
}

export interface SearchInterface {
  searchValues: BookSearchInterface;
}
