"use client";
import { useState, useRef, useEffect } from "react";
import { ReactReader } from "../../lib/index";
import type { Contents, Rendition } from "epubjs";
import { Example } from "./example";

export function Basic({ blob }: { blob: Blob }) {
  const [largeText, setLargeText] = useState(false);
  const rendition = useRef<Rendition | undefined>(undefined);
  const [location, setLocation] = useState<string | number>(0);
  // const bebra = URL.createObjectURL(blob);
  // console.log(bebra);
  useEffect(() => {
    rendition.current?.themes.fontSize(largeText ? "140%" : "100%");
  }, [largeText]);
  return (
    <Example
      title=""
      actions={
        <>
          <button onClick={() => setLargeText(!largeText)} className="btn">
            Change font size
          </button>
        </>
      }
    >
      <ReactReader
        url={blob}
        location={location}
        locationChanged={(loc: string) => setLocation(loc)}
        getRendition={(_rendition: Rendition) => {
          rendition.current = _rendition;
          rendition.current.themes.fontSize(largeText ? "140%" : "100%");
        }}
      />
    </Example>
  );
}
