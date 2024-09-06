'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from './meals';
import { revalidatePath } from 'next/cache';

export async function shareMeal(prevState,formData) {
  function ValidateInputHandler(text) {
    return !text || text.toString().trim() === '';
  }
  const meal = {
    slug: formData.get('title'),
    title: formData.get('title'),
    image: formData.get('image'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };
  if (
    ValidateInputHandler(meal.title) ||
    ValidateInputHandler(meal.summary) ||
    ValidateInputHandler(meal.instructions) ||
    ValidateInputHandler(meal.creator) ||
    ValidateInputHandler(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {message: 'invalid input!' }
  }
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
  await saveMeal(meal);
  revalidatePath('/meals', 'page')
  redirect('/meals');
}
