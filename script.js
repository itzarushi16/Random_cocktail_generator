async function getRandomCocktail() {
    try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const data = await response.json();
        const cocktail = data.drinks[0];

        const ingredients = [];
        for (let i = 1; i <= 15; i++) {
            const ingredient = cocktail[`strIngredient${i}`];
            const measure = cocktail[`strMeasure${i}`];
            if (ingredient) {
                ingredients.push(`${measure || ''} ${ingredient}`);
            }
        }

        document.getElementById('cocktail-container').innerHTML = `
            <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
            <h2>${cocktail.strDrink}</h2>
            <p><strong>Category:</strong> ${cocktail.strCategory}</p>
            <p><strong>Alcoholic:</strong> ${cocktail.strAlcoholic}</p>
            <p><strong>Glass:</strong> ${cocktail.strGlass}</p>
            <div class="ingredients">
                <h3>Ingredients:</h3>
                <ul>${ingredients.map(item => `<li>${item}</li>`).join('')}</ul>
            </div>
            <p><strong>Instructions:</strong> ${cocktail.strInstructions}</p>
        `;
    } catch (error) {
        console.error('Error fetching cocktail:', error);
        document.getElementById('cocktail-container').innerHTML = `<p>Error fetching cocktail. Please try again!</p>`;
    }
}
