import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useCallback, useEffect, useState } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';

const AvailableMeals = () => {
  const [meal, setMeal] = useState([]);
  const [error, setError] = useState('');
  const fetchMeals = useCallback(async () => {
    try {
      const req = await fetch(
        'https://react-second-f430c-default-rtdb.firebaseio.com/food.json'
      );
      if (!req.ok) {
        throw new Error('Sorry unable to load data');
      }
      const data = await req.json();
      setMeal(Object.values(data));
    } catch (err) {
      setError(err.message);
    }
  }, []);
  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);
  const mealsList = meal.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {error.length !== 0 && <p>Something went wrong</p>}
        {error.length === 0 && <ul>{mealsList}</ul>}
        {meal.length === 0 && error.length === 0 && <p>Loading...</p>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
