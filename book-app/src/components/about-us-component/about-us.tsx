"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setIsStore, setIsWishlist } from "@/redux/slice";
import Head from "next/head";
import "./style.scss";

export default function AboutUs() {
  const blockOne = useRef(null);
  const blockTwo = useRef(null);
  const [visibleBlockOne, setVisibleBlockOne] = useState(false);
  const [visibleBlockTwo, setVisibleBlockTwo] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsStore(false));
    dispatch(setIsWishlist(false));
  }, [dispatch]);

  // Why this code is bad: I wrote 2 intersectionObservers while could write one with dynamic target.

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting) {
  //         setVisibleBlockOne(true);
  //       }
  //     },
  //     {
  //       threshold: 0.1,
  //     }
  //   );
  //   if (block1.current) {
  //     observer.observe(block1.current);
  //   }

  //   return () => {
  //     if (block1.current) {
  //       observer.unobserve(block1.current);
  //     }
  //   };
  // });

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting) {
  //         setVisibleBlockTwo(true);
  //       }
  //     },
  //     {
  //       threshold: 0.1,
  //     }
  //   );
  //   if (block2.current) {
  //     observer.observe(block2.current);
  //   }

  //   return () => {
  //     if (block2.current) {
  //       observer.unobserve(block2.current);
  //     }
  //   };
  // });

  useEffect(() => {
    const observerCallBack = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.target === blockOne.current && entry.isIntersecting) {
          setVisibleBlockOne(true);
        }
        if (entry.target === blockTwo.current && entry.isIntersecting) {
          setVisibleBlockTwo(true);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallBack, {
      threshold: 0.1,
    });

    if (blockOne.current) observer.observe(blockOne.current);
    if (blockTwo.current) observer.observe(blockTwo.current);

    return () => {
      if (blockOne.current) observer.unobserve(blockOne.current);
      if (blockTwo.current) observer.unobserve(blockTwo.current);
    };
  }, []);

  return (
    <>
      <Head>
        <title>About Us | MyBook</title>
        <meta
          name="description"
          content="Discover more about MyBook, the ultimate online book store!"
        />
      </Head>
      <div className="flex items-center flex-col p-[90px] aboutMainBlock">
        <h1 className="text-[3rem] mb-[40px] title">Welcome to MyBook</h1>
        <div className="flex justify-center items-center aboutBlock">
          <p className="w-[50%] text-[1.3rem] pr-[100px] text1">
            Our application allows you to comfortably buy an online book of any
            kind! From intriguing drama to calculus or engineering
          </p>
          <div className="w-[50%] flex justify-end imageBlock">
            <Image
              width={512}
              height={512}
              src={"/images/pile-of-books.webp"}
              alt="pile of books"
              loading="lazy"
              className="books"
            ></Image>
          </div>
        </div>
        <motion.div
          className="flex justify-center items-center aboutBlockR"
          transition={{ type: "spring", damping: 18, mass: 0.75 }}
          initial={{ opacity: 0, y: 100 }}
          animate={
            visibleBlockOne ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }
          }
          ref={blockOne}
        >
          <div className="w-[50%] flex justify-start imageBlock">
            <Image
              width={564}
              height={564}
              src={"/images/reading-changed.webp"}
              alt="reading our books"
              loading="lazy"
              className="reading"
            ></Image>
          </div>
          <p className="w-[50%] text-[1.3rem] pl-[68px] text2">
            We've collected more than 30.000 books around the world so you would
            never face a problem of not finding a book of your liking!
          </p>
        </motion.div>
        <motion.div
          className="flex justify-center items-center aboutBlock"
          transition={{ type: "spring", damping: 18, mass: 0.75 }}
          initial={{ opacity: 0, y: 100 }}
          animate={
            visibleBlockTwo ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }
          }
          ref={blockTwo}
        >
          <p className="w-[50%] text-[1.3rem] pr-[68px] text3">
            You can edit your book! If you need to highlight something important
            or to leave a note for yourself - MyBook will provide you with
            everything needed.
          </p>
          <div className="w-[50%] flex justify-end imageBlock">
            <Image
              width={564}
              height={564}
              src={"/images/ok.webp"}
              alt="ok sign"
              loading="lazy"
              className="ok"
            ></Image>
          </div>
        </motion.div>
      </div>
    </>
  );
}
