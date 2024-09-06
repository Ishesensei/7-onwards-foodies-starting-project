import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
import { error } from "node:console";
const db = sql("meals.db");
export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  //throw new Error("Loadin ng Failed");

  return db.prepare("SELECT * FROM meals").all();
}
export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}
export function putMeal(slug) {}

export async function saveMeal(meal) {
  //1 prepare meal
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  const ext = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${ext}`;
  //2 create image buffer
  const BufferImage = await meal.image.arrayBuffer();
  //3 create a path
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  //4  save buffer
  stream.write(Buffer.from(BufferImage), (error) => {
    if (error) {
      throw new Error("Error while saving the buffer!");
    }
  });
  //5 set image loaction in the meal
  meal.image = `/images/${fileName}`;
  //6 save meal object to database
  db.prepare(
    "INSERT INTO meals (slug, title, image, summary, instructions, creator, creator_email) VALUES (@slug, @title, @image, @summary, @instructions, @creator, @creator_email)"
  ).run(meal);
}
