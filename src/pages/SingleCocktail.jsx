import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleCocktail } from "../redux/features/cocktailSlice";
import { Link } from "react-router-dom";

const SingleCocktail = () => {
  const { cocktail, loading } = useSelector((state) => ({ ...state.app }));
  const [modifiedCocktail, setModifiedCocktail] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingleCocktail({ id }));
  }, [id]);

  useEffect(() => {
    if (cocktail.length > 0) {
      const {
        strDrink: name,
        strDrinkThumb: image,
        strAlcoholic: info,
        strCategory: category,
        strGlass: glass,
        strInstructions: instructions,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
      } = cocktail[0];
      const ingredients = [
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
      ];
      const newCocktail = {
        name,
        image,
        info,
        category,
        glass,
        instructions,
        ingredients,
      };
      setModifiedCocktail(newCocktail);
    } else {
      setModifiedCocktail(null);
    }
  }, [id, cocktail]);

  if (!modifiedCocktail) {
    return <h1 className="section-title">No cocktail to display</h1>;
  } else {
    const { name, image, category, info, glass, instructions, ingredients } =
      modifiedCocktail;
    return (
      <>
        {loading ? (
          <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <section className="section cocktail-section">
            <Link to="/">
              <button className="btn btn-danger" style={{ marginTop: "2rem" }}>
                Go back
              </button>
            </Link>
            <h2 className="section-title">{name}</h2>
            <div className="drink">
                <img src={image} alt={name} />
                <div className="drink-info">
                    <p>
                        <span className="drink-data">Name: {name}</span>
                    </p>
                    <p>
                        <span className="drink-data">Category: {category}</span>
                    </p>
                    <p>
                        <span className="drink-data">Info: {info}</span>
                    </p>
                    <p>
                        <span className="drink-data">Glass: {glass}</span>
                    </p>
                    <p>
                        <span className="drink-data">Ingredients:</span>
                        {ingredients && ingredients.map((item,index)=>{
                            return item? <span key={index}> {item}</span> : null;
                        })}
                    </p>
                </div>
            </div>
          </section>
        )}
      </>
    );
  }
};

export default SingleCocktail;
