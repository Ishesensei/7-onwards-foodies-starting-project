import MealsGrid from "@/components/meals/meals-grid";
import Link from "next/link";
import classes from "./page.module.css";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";
import Loading from "./loading-out";
async function GetMeal() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}

export const metadata = {
  title: 'All Meals',
  description: 'Delicious meals',
};

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes["highlight"]}>By you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes["cta"]}>
          <Link href="/meals/share">Share your meal!</Link>
        </p>
      </header>
      <main>
        <Suspense fallback={<h1 className={classes["loading"]}>Loading...</h1>}>
          <GetMeal />
        </Suspense>
      </main>
    </>
  );
}
